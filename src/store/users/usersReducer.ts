import { UsersState, User } from "../../Data/Types";

const initialState : UsersState = {
    users: JSON.parse(localStorage.getItem('users') || '[]'),
    currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null'),
}

type UsersAction = 
    | {type: 'ADD_USER', payload: User}
    | {type : 'SET_CURRENT_USER', payload : User}
    | {type : 'CLEAR_CURRENT_USER', payload : User}

export const usersReducer = (state = initialState, action: UsersAction) : UsersState => {
    switch (action.type) {
        case ('ADD_USER') : 
            const updatedUsers = [...state.users, action.payload];
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            return {...state, users : updatedUsers}
        case ('SET_CURRENT_USER') : 
        console.log(initialState.currentUser)
            localStorage.setItem('currentUser', JSON.stringify(action.payload))
            return {...state, currentUser : action.payload}
        case ('CLEAR_CURRENT_USER') :
            localStorage.removeItem('currentUser')
            return {...state, currentUser : null}
        default : 
            return state;
    }
}