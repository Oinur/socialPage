import { Link, Navigate } from "react-router-dom"
import { getCurrentUser, logOut } from "../Data/UsersDB"
import { useState } from "react"
import { User } from "../Data/Types"



export default function Navbar() {
    const [currentUser, setCurrentUser] = useState<User | null>(() => getCurrentUser())
    return (
            <nav className="nav">
                
                
                {currentUser && 
                <>
                <div className="linkContainer"><img style={{height:'25px',marginLeft:'5px'}} src="/pictures/profile.png"></img><Link className="navLink" to={`/profile`}>Профиль</Link></div>
                <div className="linkContainer"><img style={{height:'25px',marginLeft:'5px'}} src="/pictures/feed.png"></img><Link className="navLink" to={'/'}>Лента</Link></div>
                <div className="linkContainer"><img style={{height:'25px',marginLeft:'5px'}} src="/pictures/settings.png"></img><Link className="navLink" to={'/settings'}>Настройки</Link></div>  
                <div className="linkContainer"><img style={{height:'25px',marginLeft:'5px'}} src="/pictures/logOut.png"></img><a className="navLink"  href="/" onClick={logOut}>Выйти</a></div>      
                </>
                }


                {!currentUser && 
                    <Link className="navLink" to={'/login'}>Войти</Link>
                }
                
                
            </nav>
        
    )
} 