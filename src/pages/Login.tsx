import { useState } from 'react'
import './Login.css'
import { getUsers } from '../Data/UsersDB'
import { Navigate, useNavigate } from 'react-router-dom'
import { User } from '../Data/Types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { setCurrentUser } from '../store/users/usersActions'
  export default function Login(){
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<Boolean>(false)
    const usersDB = useSelector((state:RootState) => state.users.users)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const handleLogin = function(){
    
        let foundUser : User | null = null;
        for (let user of usersDB){
            if (user.login === login && user.password === password) {
                foundUser = user
                break;
                }
            }  

            if (foundUser) {
                dispatch(setCurrentUser(foundUser))
                navigate(`/profile`)
            }
            else{
                setError(true)
                }   
        }
        

    



        return (
            <div className='loginWrapper'>
            <div className='loginBlock'>

                <div className='loginTitle'>
                    <p style={{color:'black'}}>Вход</p>
                </div>

                <div className='loginInputsContainer'>
                    <div className='registerInputContainer'><input className='loginInput' type='text' placeholder='логин' onChange={(e) => setLogin(e.target.value)}></input></div>
                    <div className='registerInputContainer'><input className='loginInput' type='password' placeholder='пароль' onChange={(e) => setPassword(e.target.value)}></input></div>
                </div>
                
                <div className='loginBtnContainer'>
                   { error &&
                        <p style={{color:'red', marginTop:'-30px'}}>Неправильный логин или пароль</p>
                   } 
                    <a style={{fontSize:'12px', color:'black'}} href='/register'>Создать аккаунт</a>
                    <button onClick={handleLogin} className='loginSubmitBtn'>Войти</button>
                </div>
            </div>
        </div>
        )
    }