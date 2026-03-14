import Navbar from "./Navbar";
import { Link, Outlet } from "react-router-dom";
import { User } from "../Data/Types";
import './Layout.css'
import { getCurrentUser,logOut } from "../Data/UsersDB";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCurrentUser } from "../store/users/usersActions";
    function Layout(){
        const dispatch = useDispatch()
        const [user, setUser] = useState<User | null>(null)
        const [isModalSetOpen, setIsModalOpen] = useState<Boolean>(false)


        useEffect(() => {
            
            setUser(getCurrentUser())

        },[])


        return (
            
            <div className="layout">
                <header className="headerWrapper">
                   <div className="header"> 
                        <div className="headerLogoPlace">
                        <div className="headerLogoImg"></div>
                        <h1 className="headerLogoTitle">Cats.com</h1>
                        </div>
                        {user && 
                        <div className="headerUserWrap" onClick={() => {setIsModalOpen(!isModalSetOpen)}}>
                            
                            <div style={{backgroundImage: user
                            ? `url(${user.profileImg})`
                            : 'none',
                            backgroundSize:'cover'  
                            }} className="headerUserCircle">
                            </div>

                            <div className="headerUserArrow">
                               ⏷
                            </div>
                        </div>
                        }
                            
                    </div>
                </header>

                <div className="settingsWindowWrapper" onClick={() => {setIsModalOpen(false)}}> 
                    <div style={{display:`${isModalSetOpen ? '' : 'none'}`}} className="settingsModal">
                        <h3 style={{marginTop:'20px'}}>{user?.name} {user?.surname}</h3>
                        <Link className="setWindowLink"  to="/settings">Настройки</Link>
                        <Link className="setWindowLink"  to="/" onClick={() => {dispatch(clearCurrentUser(user!))}}>Выйти</Link>
                    </div>    
                </div> 

                <div className="layoutContent">
                            
                    <div className="navbar">
                        <Navbar />
                    </div>

                    <div className="outlet">
                        <Outlet/>
                    </div>
                </div>
            </div>

            
        )

    }


    export default Layout