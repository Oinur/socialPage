import { Post, User } from "../../Data/Types";

export const addPost = (posts : Post[]) => ({
    type : 'ADD_POSTS',
    payload : posts,
})

export const likeToggle = (postId: string, userId : number) => ({
    type : 'LIKE_TOGGLE',
    payload : {postId , userId},
})