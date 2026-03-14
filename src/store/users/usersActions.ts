import { User } from "../../Data/Types";

export const addUser = (user: User) => ({
    type : 'ADD_USER',
    payload : user,
})

export const setCurrentUser = (user : User) => ({
    type : 'SET_CURRENT_USER',
    payload : user,
})

export const clearCurrentUser = (user : User) => ({
    type : 'CLEAR_CURRENT_USER',
    payload : user,
})