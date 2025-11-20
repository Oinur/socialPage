    import { useEffect, useRef, useState } from 'react'
import './News.css'
import { Post, Comment, User } from '../Data/Types'
import { getPosts, loadMorePosts, POST_KEY, setDate, setRepost } from '../Data/PostsDB'
import { setComment, COMMENT_KEY } from '../Data/CommentsDB'
import { click } from '@testing-library/user-event/dist/click'
import { useOutletContext } from 'react-router-dom'
import { getCurrentUser } from '../Data/UsersDB'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { addPost, likeToggle } from '../store/posts/postsActions'



export default function News(){
    
    const dispatch = useDispatch()
    const [user, setUser] = useState<User | null>(null);
    const [commentText, setCommentText] = useState<string>('')
    const posts = useSelector((state:RootState) => state.posts)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [post, setPost] = useState<Post | null>()
    const [comments, setComments] = useState<Comment[] | null>(null)
    const [crBtnPermision, setCrBtnPermision] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement>(null)
    
    // function updatePost(id : string){
    //     const savedData : Post[] = JSON.parse(localStorage.getItem(POST_KEY) || '[]') as Post[];
    //     const index = savedData.findIndex(post => post.id === id);
    //         if (index !== -1) {
    //         const post = savedData[index];

    //         if (post.isLiked){
    //             savedData[index].likes = Math.max((savedData[index].likes ?? 0) - 1, 0);
    //             post.isLiked = !post.isLiked
                
    //         } else {
    //             savedData[index].likes = (savedData[index].likes ?? 0) + 1;
    //             post.isLiked = !post.isLiked
                
    //         }
           

    //         }
    //         setPosts(savedData)
    //     localStorage.setItem(POST_KEY, JSON.stringify(savedData))
    // }
    
    function openComments(id : string){
        setComments(null)
        const postsDB : Post[] = JSON.parse(localStorage.getItem(POST_KEY) || '[]') as Post[];
        const index = postsDB.findIndex(item => item.id === id);
        if (index !== -1){
            const post = postsDB[index]
            setPost(post)
            setIsModalOpen(true)
            console.log("post opened")
        const commentsDB : Comment[] = JSON.parse(localStorage.getItem(COMMENT_KEY) || '[]') as Comment[]
        const postsComments = commentsDB.filter(comment => comment.postId === post?.id)
        setComments(postsComments)
        } 
        
    }
    
//    async function lazyLoad(){
//         const updated = await loadMorePosts("https://api.thecatapi.com/v1/images/search?limit=10");
//         setPosts(updated)
        
//     }
    
    // const onScroll = () => {
    //     if(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight){
    //         setTimeout(() => {lazyLoad()},200)
    //     }
    // }

    useEffect(() => {
        setPost(null)
        getPosts("https://api.thecatapi.com/v1/images/search?limit=10")
        .then(post => dispatch(addPost(post)))
        
        // window.addEventListener('scroll', onScroll)
        

        let currentUser = getCurrentUser();
        setUser(currentUser)
        return() => {
        // window.removeEventListener('scroll', onScroll)   
        }
    },[])
    
    function checkCreteComment(e : React.ChangeEvent<HTMLInputElement>){
        let value = e.target.value;
        if (value === ''){
            return
        }
        setCrBtnPermision(true)
        setCommentText(value)
        

    }
    function createComment(postId : string){
        if (crBtnPermision){
            const newComment : Comment = {
                comment_id : String(new Date().getTime()),
                postId : postId,
                author : `${user?.name} ${user?.surname}`,
                date : setDate(),
                text : commentText,
                authorAvatar : `${user?.profileImg}`
            }
            setComment(newComment)
            setComments(prev => (prev ? [...prev, newComment] : [newComment]))
            setCrBtnPermision(false);
            inputRef.current!.value = '';
        }
    }
    return (
        <>
        {isModalOpen && 
        <div className='modalWindowWrapper' onClick={(e) => {
            if (e.target === e.currentTarget) {
                setIsModalOpen(false)
            }
        }}> 
            <div className='modalWindow'>
                <img src={post?.img} className='modalImg'></img>
                <div className='commentPostWrapper'>
                    <div className='commentsSection'>
                        <h1>Комментарии</h1>
                        {comments && comments.length > 0 ? comments.map((comment) => {
                            return (
                                <div key={comment.comment_id} className='commentWrapper'>
                                    <img className='commentUserAvatar' src={comment.authorAvatar}></img>
                                    <div className='commentInfo'>
                                        <div className='commentUserName'><p>{comment.author}</p></div>
                                        <div className='commentText'><p>{comment.text}</p></div>
                                        <div className='commentTime'><p>{comment.date}</p></div>
                                    </div>
                                </div>
                            )
                        }) 
                        : <p style={{color:'grey'}}>Оставьте первый комментарий к этой <br/> фотографии</p>}
                    </div>
                    <div className='createCommentSection'>
                        <input ref={inputRef} className='createCommentInput' type='text' placeholder='Введите комментарий' onChange={(e) => {checkCreteComment(e)}}></input>
                        <button className='createCommentBtn' onClick={() => {createComment(post!.id)}}>отправить</button>
                    </div>
                </div>
            </div>
        </div>
        }

        <div className='newsWrapper'>
        <div className='newsContent'>
            {posts ? 
            posts.posts.map((post : Post) => (
               <div className='postWrapper' key={post.id}>
                    <div className='postTitleWrapper'>
                        <div className='postTitle'>
                            <p>Кошка</p>
                        </div>
                        <div className='postTime'>
                            <p>{post.date}</p>
                        </div>
                    </div>
                    <div onClick={() => {openComments(post.id)}} className='postPicture'>
                        <img className={post.isLiked ? 'likedAnimation like' : 'likedAnimation'} src='/pictures/liked.png' ></img>
                        <img        
                            src={post.img}
                            style={{width:600, height:500, objectFit: "cover"}}                       
                        />
                    </div>
                    <div className='statsSection'>
                            <div className='likesSection' onClick={() => {dispatch(likeToggle(post.id, user!.id))}}>
                                <div className='likesWrapper'>
                                <img style={{width:20, height:20}} src={post.isLiked ? '/pictures/liked.png' : '/pictures/like.png'} />
                                {post.likes}
                                </div>
                            </div>
                            <div className='commentsSection'>
                                <div className="commentsWrapper" onClick={() => openComments(post.id)}>
                                    
                                        <img  style={{height:20, width:20}} src='/pictures/comments.png' />
                                        {post.comments.quantity}
                                    
                                </div>
                            </div>
                            <div className='repostsSection'>
                                <div className='repostsWrapper' onClick={() => {setRepost(post.id)}}>
                                    <img style={{height:20, width:20}} src='pictures/repost.png'/>
                                    {post.reposts.quantity}
                                </div>
                            </div>
                    </div>
                </div>
            ))
                :
            <p>Loading...</p>
        }

        </div>
        
        
        </div>

        </>
    )
}