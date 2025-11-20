import { Comment } from "./Types";

export const COMMENT_KEY = 'comments'

export function setComment(newComment : Comment){
    const commentsDB = JSON.parse(localStorage.getItem(COMMENT_KEY) || '[]') as Comment[]
    const updatedComments = [...commentsDB, newComment ]
    localStorage.setItem(COMMENT_KEY, JSON.stringify(updatedComments))
    
}

