import {User} from '../Data/Types'

     const user: User = {
        id : 1,
        name: "Ainur",
        surname: "Agliullin",
        age: 30,
        login : "ainur132435",
        password : "123456789",
        profileImg : 'https://sun9-30.userapi.com/s/v1/if2/XH2Bp6NFuPC2T5k9hsTAqzYVODLlcH1oI0CSr-NlIA0AXwfAY0BMdKhIKsBjZLxMSSMtCcUDksDm2C9pU1tLvrQZ.jpg?quality=95&as=32x26,48x39,72x58,108x87,160x129,240x194,360x290,480x387,540x435,640x516,720x581,1080x871,1116x900&from=bu&u=tcylxXx_-28rz1TOzwGEtQt7LLgS91DB2ruKcGqJyGc&cs=1116x0',
        profileBackgroundImg : "/pictures/userBackground.jpg",
    };

    const user2: User = {
        id : 2,
        name: "Roman",
        surname: "Denisov",
        age: 70,
        login : "Romaroma123",
        password : "999999999",
        profileImg : 'https://cdn.discordapp.com/attachments/531056600144936960/1428432048649015448/image.png?ex=68f5c643&is=68f474c3&hm=f8ee52aa4a1909424ba3f51c7233667fabd11e731321fc21539577061cac44e6&',
        profileBackgroundImg : "https://cdn.discordapp.com/attachments/531056600144936960/1428122323747344454/3.png?ex=68f54e8f&is=68f3fd0f&hm=bb7eacf5f4cd8200b98ff2a869dbd70653a342a8790132687c1cca194717ec6c&",
    };

    const savedUsersDB = [user, user2]

    

export const KEY = 'users'
const CURRENT_USER = 'currentUser'

export function getCurrentUser(): User | null{
    const currentUser = localStorage.getItem(CURRENT_USER)
    return currentUser ? JSON.parse(currentUser) : null
}

export function getUsers(): User[] {
    const saved = localStorage.getItem(KEY)
    
    if (!saved) {
        const savedUser = savedUsersDB
        localStorage.setItem(KEY, JSON.stringify(savedUser))
        
        return savedUser
    }
    
    return JSON.parse(saved)
}

export function addUser(user : User) {
    const users = getUsers()
    users.push(user)
    localStorage.setItem(KEY, JSON.stringify(users))
}

export function logOut(){
    localStorage.removeItem(CURRENT_USER)
}

