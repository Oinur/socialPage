import { useState, useEffect } from 'react';
import { url } from 'inspector'
import './Register.css' 
import {getCurrentUser, getUsers } from '../Data/UsersDB';
import {User} from '../Data/Types'
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { addUser, setCurrentUser} from '../store/users/usersActions';
function Register() {
    const dispatch = useDispatch()
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState(0);
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    let [error, setError] = useState({
        nameError : '',
        surnameError : '',
        ageError : '',
        loginError : '',
        passwordError : '',
        confirmPasswordError : '', 
    })
    const [success, setSuccess] = useState({
        nameSuccess : false,
        surnameSuccess : false,
        ageSuccess : false,
        loginSuccess : false,
        passwordSuccess : false,
        confirmPasswordSuccess : false,
    })

    const onlyLetters = /^[A-Za-zА-Яа-яЁё]+$/;

    let navigate = useNavigate()

    function checkReg(event : React.ChangeEvent<HTMLInputElement>) {
        let value : any = event.target.value.trim();
        switch (event.target.id) {

            /*   Проверка имени   */
            case 'nameInput' :
                
                if (value === '') {
                    event.target.classList.remove('wrongInput', 'correctInput');
                    setError({ ...error, nameError: '' });
                    setSuccess({...success, nameSuccess : false})
                    return;
                }
                
                if (value.length > 20 || value.length < 2 || !onlyLetters.test(value)) {
                    event.target.classList.remove('correctInput')
                    event.target.classList.add('wrongInput')
                    setError({
                        ...error,
                        nameError : 'Некоректное имя'
                    })
                    setSuccess({...success, nameSuccess : false})
                }
                else {
                    event.target.classList.remove('wrongInput')
                    setError({
                        ...error,
                        nameError : ''
                    })
                    setName(value)
                    setSuccess({...success, nameSuccess : true})
                    event.target.classList.add('correctInput')
                }
                    break
            /*    Проверка фамилии    */
            case 'surnameInput' : 
                
                if (value === '') {
                    event.target.classList.remove('wrongInput', 'correctInput');
                    setError({ ...error, surnameError: '' });
                    setSuccess({...success, surnameSuccess : false})
                    return;
                }
                
                if (value.length > 20 || value.length < 2) {
                    event.target.classList.remove('correctInput')
                    event.target.classList.add('wrongInput')
                    setError({
                        ...error,
                        surnameError : 'Некоректная фамилия'
                    })
                    setSuccess({...success, surnameSuccess : false})
                }
                else {
                    event.target.classList.remove('wrongInput')
                    setError({
                        ...error,
                        surnameError : ''
                    })
                    setSurname(value)
                    setSuccess({...success, surnameSuccess : true})
                    event.target.classList.add('correctInput')
                }
                    break
                
            /*    Проверка возраста   */
            case 'ageInput' :
                if (value === '') {
                    event.target.classList.remove('wrongInput', 'correctInput');
                    setError({ ...error, ageError: '' });
                    setSuccess({...success, ageSuccess : false})
                    
                }
                else {
                    event.target.classList.remove('wrongInput')
                    setAge(value)
                    setSuccess({...success, ageSuccess : true})
                    event.target.classList.add('correctInput')
                }
                break

            /*   Проверка логина   */
            case 'loginInput' :
            const registeredUsers : User[] = getUsers()
            
            if (value === '') {
                    event.target.classList.remove('wrongInput', 'correctInput');
                    setError({ ...error, loginError: '' });
                    setSuccess({...success, loginSuccess : false})
                    setLogin('')
                    return
                }
            for (let user of registeredUsers){
              if (user.login !== event.target.value) {
                
                setLogin(value)
                event.target.classList.remove('wrongInput')
                event.target.classList.add('correctInput')
                setSuccess({...success, loginSuccess: true})
                setError({...error, loginError : ''})
                
              }
              else{
                event.target.classList.remove('correctInput')
                event.target.classList.add('wrongInput')
                setSuccess({...success, loginSuccess: false})
                setError({...error, loginError : 'Логин занят'})
                return
              }
               
            }
            break

        /*    Проверка пароля     */
            case 'passwordInput' : 
            if (value.length === 0) {
                event.target.classList.remove('wrongInput')
                event.target.classList.remove('correctInput')
                setError({...error, passwordError : ''})
                setSuccess({...success, passwordSuccess : false})
                return
            }
            if (value.length >= 8 && value.length <= 20) {
                /*    позже добавить проверку посложнее     */

                event.target.classList.remove('wrongInput')
                event.target.classList.add('correctInput')
                setPassword(value)
                setError({...error, passwordError : ''})
                setSuccess({...success, passwordSuccess : true})
            }
            else {
                event.target.classList.remove('correctInput')
                event.target.classList.add('wrongInput')
                setSuccess({...success, passwordSuccess : false})
                setError({...error, passwordError : 'Недопустимая длина пароля'})
            }
            break

            /*     Проверка подтверждения пароля     */
        case 'confirmPasswordInput' :
            
            if (value.length === 0) {
                event.target.classList.remove('wrongInput')
                event.target.classList.remove('correctInput')
                setError({...error, confirmPasswordError : ''})
                setSuccess({...success, confirmPasswordSuccess : false})
                return
            }
            if (password !== value) {
                event.target.classList.remove('correctInput')
                event.target.classList.add('wrongInput')
                setSuccess({...success, confirmPasswordSuccess : false})
                setError({...error, confirmPasswordError : 'Пароли не совпадают'})
                return
            }
            else{
                event.target.classList.remove('wrongInput')
                event.target.classList.add('correctInput')
                setConfirmPassword(value)  
                setSuccess({...success, confirmPasswordSuccess : true})
                setError({...error, confirmPasswordError : ''})
                return
            }
                
                
                break;

                default:
                return
        }
            value = ''   
    }
       
    

    const handleSubmit = function(){
        const allValid = Object.values(success).every(Boolean);
        

        if (allValid) {
            const id = new Date().getTime()

            const newUser : User = {
            id: id,
            name : name,
            surname : surname,
            age: age,
            login : login,
            password : password
        }
        
        dispatch(addUser(newUser))
        dispatch(setCurrentUser(newUser))
        console.log(newUser)
       navigate(`/profile`)
        }
    }


    useEffect(() => {
        const btn = document.querySelector('.submitBtn')
        


        return() => {
            btn?.removeEventListener('click', handleSubmit)
            
        }
           
        

    },[])

    


    return (
        <div className='registerWrapper'>
            


            <div className='registerBlock'>

                <div className='registerTitle'>
                    <p style={{color:'black'}}>Регистрация</p>
                </div>

                <div className='inputsContainer'>
                    <div className='registerInputContainer'>    <input className='registerInput' onChange={e => {checkReg(e)}} placeholder='Введите имя' type='text' id='nameInput'></input>{name.length > 0 && 
                    (error.nameError ? <div className='wrongWrapper'><div className='wrong'>{error.nameError}</div></div> : null)  
                    }              
                </div>
                    <div className='registerInputContainer'>    <input className='registerInput' onChange={e => checkReg(e)} placeholder='Введите фамилию' type='text' id='surnameInput'></input>{surname.length > 0 && 
                    (error.surnameError ? <div className='wrongWrapper'><div className='wrong'>{error.surnameError}</div></div> : null)  
                    }
                    
                    </div>
                    <div className='registerInputContainer'>    <input className='registerInput' maxLength={2} onChange={e => checkReg(e)} placeholder='Введите возраст' type='text' id='ageInput'></input>{String(age).length > 0 && 
                    (error.ageError ? <div className='wrongWrapper'><div className='wrong'>{error.ageError}</div></div> : null)  
                    }
                    </div>
                    <div className='registerInputContainer'>    <input className='registerInput' onChange={e => checkReg(e)} placeholder='Введите логин' type='text' id='loginInput'></input>{login.length > 0 && 
                    (error.loginError ? <div className='wrongWrapper'><div className='wrong'>{error.loginError}</div></div> : null)  
                    }
                    </div>
                    <div className='registerInputContainer'>   <input className='registerInput' onChange={e => checkReg(e)} placeholder='Введите пароль' type='password' id='passwordInput'></input>{password.length > 0 && 
                    (error.passwordError ? <div className='wrongWrapper'><div className='wrong'>{error.passwordError}</div></div> : null)  
                    }
                    </div>
                    <div className='registerInputContainer'>    <input className='registerInput' onChange={e => checkReg(e)} placeholder='Повторите пароль' type='password' id='confirmPasswordInput'></input>{ 
                    (error.confirmPasswordError ? <div className='wrongWrapper'><div className='wrong'>{error.confirmPasswordError}</div></div> : null)  
                    }
                    </div>
                </div>
                
                <div className='btnContainer'>
                    <button onClick={handleSubmit} className='submitBtn'>Зарегистрироваться</button>
                </div>
            </div>

        </div>



    )

}



export default Register