import React, { useEffect, useState } from 'react';
import './Navbar.css';
import {Link, useNavigate} from "react-router-dom"
import logo from '../logo.png'
import { useAppState } from '../Store/app.state';

export default function Navbar() {
  const Navigate = useNavigate()
  const token = useAppState(state=>state.token)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]); 
  
  function handleLogout() {
    if (localStorage.getItem('token') !== null) {
      localStorage.removeItem('token');
      localStorage.removeItem("userId")
      Navigate("/signin")
      setIsLoggedIn(false); 
    }
  }
  
  return (
      <div className='navbar'>
        <Link to="/rooms">
        <img src ={logo} alt="TalkSpot logo" className="logo"/> 
        </Link>
        <Link to='/rooms'>
        <li className='name'>TalkiesSpot</li>
        </Link> 
        <ul className ="nav-menu">
          {isLoggedIn ?
          <li>
            <Link className = "logoutBotton" to="/">
            <button type="button" className="btn btn-outline-primary" onClick={handleLogout} >Log Out</button>   
            </Link> 
          </li>
            :
            <li>
              <Link className= "signUpButton" to ="/SignUp">
              <button type="button" className="btn btn-outline-primary">Sign Up</button>
              </Link>
              <span className="nav-menu-divider"></span>
              <Link className= "loginButton" to ="/SignIn">
              <button type="button" className="btn btn-outline-primary">Log In</button>
              </Link>
            </li>
          }
        </ul>
      </div>
    )
}
