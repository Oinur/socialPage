import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import News from './pages/News';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login'
import Layout from './Components/Layout';
import { useEffect, useState } from 'react';
import { getCurrentUser } from './Data/UsersDB';
import { User } from './Data/Types';
import Settings from './pages/Settings';


function App() {
    const [user, setUser] = useState<User | null>(() => getCurrentUser())

    useEffect(() => {
      const savedTheme = localStorage.getItem('theme') || 'light'
      document.documentElement.setAttribute('data-theme', savedTheme)
    },[])


  return (
          
      <div className='app'>
        
        
        
       
          <Routes>
            <Route element={<Layout />}>  
              <Route path='/' element={<News/>} />
              <Route path='/profile' element={<Profile/>} />
              <Route path='/settings' element={<Settings/>} />
            </Route>
        
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
          </Routes>
        
        
      </div>


    
  );

  
}

export default App;
