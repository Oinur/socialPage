import './Profile.css'
import {getUsers} from '../Data/UsersDB'
import { useEffect, useRef, useState } from 'react'
import {User, Post} from '../Data/Types'
import { url } from 'inspector'
import { REPOST_KEY } from '../Data/PostsDB'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
export default function Profile(){
    const currentUser = useSelector((state:RootState) => state.users.currentUser)
    const users = useSelector((state:RootState) => state.users.users)
    const [reposts, setReposts] = useState<Post[]>([])
    

        useEffect(() => {
           if (currentUser) {
                console.log('Current user загружен:', currentUser);
           }

           let repostsDB = JSON.parse(localStorage.getItem(REPOST_KEY) || '[]') as Post[]
           setReposts(repostsDB)
           
        },[])
        
    
    return (
        <div className="profileWrapper">
            <div style={{backgroundImage: currentUser?.profileBackgroundImg
                ? `url(${currentUser.profileBackgroundImg})`
                : 'none'
            }} className="userCard">
                <div style={{backgroundImage: currentUser?.profileImg
                    ? `url(${currentUser.profileImg})`
                    : 'none'
                }} className="userAvatar">

                </div>
                <div className='userInfo'>
                    <div className='userName'>
                        {currentUser ? <h2>{currentUser?.name} {currentUser?.surname}</h2> : <h2>Войдите в учетную запись</h2>}
                        
                    </div>
                </div>
            </div>

            <div className='usersContent'>
                <div className='repostContent'>
                {reposts && reposts.length > 0 ? 
                            reposts.map((post : Post) => (
                               <div className='repostWrapper' key={post.id}>
                                    <div className='repostTitleWrapper'>
                                        <div className='repostTitle'>
                                            <p>Кошка</p>
                                        </div>
                                        <div className='repostTime'>
                                            <p>{post.date}</p>
                                        </div>
                                    </div>
                                    <div className='repostPicture'>
                                        <img        
                                            src={post.img}
                                            style={{width:600, height:500, objectFit: "cover"}}
                                            
                                        />
                                    </div>
                                    
                                            <div className='profileStatsSection'>
                                               <div className='profileLikesSection' >
                                                  <div className='profileLikesWrapper'>
                                                     <img style={{width:20, height:20}} src={post.isLiked ? '/pictures/liked.png' : '/pictures/like.png'} />
                                                     {post.likes}
                                                  </div>
                                               </div>
                                            <div className='profileCommentsSection'>
                                                <div className='profileComments'>
                                                    <img style={{height:20, width:20}} src='/pictures/comments.png' />
                                                    {post.comments.quantity}
                                                </div>
                                            </div>
                                            <div className='profileRepostsSection'>
                                            <div className='profileReposts'>
                                            <img style={{height:20, width:20}} src='pictures/repost.png'/>
                                            {post.reposts.quantity}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                        
                           
                            ))
                                :
                            <div className="emptyRepost">
                                Тут пусто
                            </div>
                        }
                </div>
                
                    <div className='profileFriendsBlock'>
                        <div className='profileFriendTitle'>
                            <p style={{fontWeight:700, marginLeft:'15px'}}>Друзья 0</p>
                        </div>
                        <div className='profileFriends'>
                             <p style={{color:'grey', fontSize:'20px'}}>Пусто</p>
                        </div>
                    </div>
                
            </div>
        </div>
    )
}