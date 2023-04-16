import React,{ useEffect, useState } from 'react';
import "./Signin.css";
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useAppState } from '../Store/app.state';

export default function SignIn() {
  
  const Navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const setToken = useAppState((state)=> state.setToken)
  
  const token = localStorage.getItem("token")
  
  useEffect(()=>{
    const fetchData =  ()=>{
        if(token){
            Navigate('/rooms')
        }    
    }
    fetchData()
})
  
  const userLogin = async () => {

    await axios.post("https://talkiesspot.onrender.com/login",{
      email,
      password
    })
    .then((res)=>{
      // console.log(res.data)
      const state = { propData: res.data }
      setToken(res.data.token)
      localStorage.setItem("userId",res.data.userId)
      localStorage.setItem("token",res.data.token)
      Navigate("/rooms",{state})
    })
    .catch((err)=>{
      window.alert(err.response.data.message)
    })
  }

  return (
    <div className='signIn'>
        <div>
            <div className='logInForm'>
            <div>
            <input type = "email" name= "email" id="email" value={email} placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div>
            <input type = "password" name= "password" id="password" value={password} placeholder='Password' onChange={(e)=> {setPassword(e.target.value)}}/>
            </div>
            <button type="button" className="btn btn-primary" onClick={userLogin}>Sign In</button>
            </div>
            <div className='loginForm2'>
                Want to Join Us ?
                <Link to = "/signUP"><span  style={{color :"blue",cur:"pointer"}}> SignUp</span> </Link>
             </div>
        </div>
      
    </div>
  )
}