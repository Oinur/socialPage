export type User = {
    id: number,
    name: string,
    surname: string,
    age: number,
    login: string,
    password: string,
    profileImg?: string,
    profileBackgroundImg?: string,
}

export type UsersState = {
    users : User[],
    currentUser?: User | null,
}

export type PostsState = {
    posts : Post[],
}

export type Post = {
    id : string,
    date : string,
    img? : string,
    likes? : number,
    whoLiked? : number[],
    isLiked?: boolean,
    comments : {
        quantity? : number
    },
    reposts : {
        quantity? : number,
    }
}

export type Comment = {
    comment_id : string,
    postId : string,
    author : string,
    authorAvatar? : string,
    date : string,
    text : string
}

