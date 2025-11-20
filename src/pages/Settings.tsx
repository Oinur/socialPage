import { useEffect, useRef, useState } from 'react'
import './Settings.css'
import { getCurrentUser, getUsers } from '../Data/UsersDB'
import { User } from '../Data/Types'
import {KEY} from '../Data/UsersDB'

export default function Settings(){
    const [user, setUser] = useState<User | null>(getCurrentUser())
    const [isModeEnabled, setIsModeEnabled] = useState(localStorage.getItem('theme') || 'light')
    
    function modeSwitch(){
        const current = document.documentElement.getAttribute('data-theme')
        const newTheme = current === 'dark' ? 'light' : 'dark'
        document.documentElement.setAttribute('data-theme', newTheme)
        localStorage.setItem('theme', newTheme)
        setIsModeEnabled(prev => prev === 'dark' ? 'light' : 'dark')
    }

    

    return (
        <div className="settingsWrap">
            <div className="settings">
                <div className='siteMode'>
                    <p>Темная тема:</p> 
                    <div className={isModeEnabled === 'dark' ? 'darkModeBtn enabled' : 'darkModeBtn'} onClick={modeSwitch}>
                        <div className='btnCircle'>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
            

        
    )
}