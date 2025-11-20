import { PostsState, Post, User } from "../../Data/Types";

const initialState : PostsState = {
    posts : JSON.parse(localStorage.getItem('posts') || '[]'),
}
type PostsAction = 
    | {type : 'ADD_POSTS', payload : Post[]}
    | {type : 'LIKE_TOGGLE', payload : {postId : string, userId : number}}


export const postsReducer = (state = initialState, action : PostsAction ) : PostsState => {
    switch (action.type) {
        case 'ADD_POSTS' : 
            const updatedPosts = [...action.payload]
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
            return {...state, posts : updatedPosts}
        
        case 'LIKE_TOGGLE' : 
            const { postId, userId} = action.payload;
            const updated = state.posts.map(post => {
                if (post.id !== postId) {
                    return {...post}
                }
                else{
                    console.log('Нашел')
                }
                
                const hasLike = post.whoLiked?.includes(userId)
            return {
                ...post,
                isLiked: hasLike
                ? false
                : true,
                whoLiked: hasLike
                ? post.whoLiked?.filter(id => id !== userId)
                : [...(post.whoLiked || []), userId]
            }
                
            })
            return {...state, posts : updated}
        default :
            return state
    }    
}