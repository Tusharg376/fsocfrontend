import React, { useEffect, useState } from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppState } from '../Store/app.state';

function App() {
  const Navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const setToken = useAppState((state)=> state.setToken)
  const token = localStorage.getItem("token")
  const apiUrl = process.env.REACT_APP_API_URL

  useEffect(()=>{
    const fetchData =  ()=>{
        if(token){
            Navigate('/rooms')
        }    
    }
    fetchData()
})
  const userLogin = async () => {

    await axios.post(`${apiUrl}/login`,{
      email,
      password
    })
    .then((res)=>{
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
    <MDBContainer fluid className="p-4 my-5 h-custom">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://img.freepik.com/free-vector/chat-conversation-mobile-phone-screen-tiny-people-group-persons-chatting-messenger-flat-vector-illustration-social-media-community-concept-banner-website-design-landing-web-page_74855-21724.jpg?w=740&t=st=1683193447~exp=1683194047~hmac=ea99594a6540b6332821c4c218fcdc78f224accdacbec23cc343e71bcb645b6e" class="img-fluid" alt="homepage" />
        </MDBCol>

        <MDBCol col='4' md='5'>

          <div className="d-flex flex-row align-items-center justify-content-center">

            <p className="lead fw-normal mb-0 me-3">Welcome Back Talkie!! Sign In Here</p>

          </div>
          <br/>

          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(e)=>setPassword(e.target.value)} />

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5" size='lg' onClick={userLogin}>Login</MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">New to Talkies Spot? <Link to="/signup" className="link-danger">Register Now!!</Link></p>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;