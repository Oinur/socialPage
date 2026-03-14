import { Link, Navigate } from "react-router-dom"
import { getCurrentUser, logOut } from "../Data/UsersDB"
import { useState } from "react"
import { User } from "../Data/Types"
import { useDispatch, useSelector } from "react-redux"
import { clearCurrentUser } from "../store/users/usersActions"
import { RootState } from "../store"
import profile from '../pictures/profile.png'
import feed from '../pictures/feed.png'
import settings from '../pictures/settings.png'
import logout from '../pictures/logOut.png'

export default function Navbar() {
    const dispatch = useDispatch()
    const currentUser = useSelector((state : RootState) => state.users.currentUser)
    return (
            <nav className="nav">
                
                
                {currentUser && 
                <>
                <div className="linkContainer"><img style={{height:'25px',marginLeft:'5px'}} src={profile}></img><Link className="navLink" to={`/profile`}>Профиль</Link></div>
                <div className="linkContainer"><img style={{height:'25px',marginLeft:'5px'}} src={feed}></img><Link className="navLink" to={'/'}>Лента</Link></div>
                <div className="linkContainer"><img style={{height:'25px',marginLeft:'5px'}} src={settings}></img><Link className="navLink" to={'/settings'}>Настройки</Link></div>  
                <div className="linkContainer"><img style={{height:'25px',marginLeft:'5px'}} src={logout}></img><Link className="navLink"  to={"/"} onClick={() => {dispatch(clearCurrentUser(currentUser))}}>Выйти</Link></div>      
                </>
                }


                {!currentUser && 
                    <Link className="navLink" to={'/login'}>Войти</Link>
                }
                
                
            </nav>
        
    )
} 