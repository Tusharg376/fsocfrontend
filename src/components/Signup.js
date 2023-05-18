import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBFile
}
from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [profile, setProfile] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL

  const token = localStorage.getItem("token")
  
    useEffect(()=>{
      const fetchData =  ()=>{
          if(token){
              Navigate('/rooms')
          }    
      }
      fetchData()
  })

    const NewUser = async function () {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('profile', profile);

    await axios.post(`${apiUrl}/createUser`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => {
        window.alert("Signed up successfully")
        Navigate('/signIn');
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };

  return (
    <MDBContainer fluid className='p-4'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            The best spot <br />
            <span className="text-primary">for Talkies like you</span>
          </h1>

          <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
          Join Talkies Spot and connect with like-minded individuals from around the world! Whether you're looking for new friends, seeking advice, or just want to chat about your favorite topics, Talkies Spot has got you covered.
          Say goodbye to boring chats and hello to Talkies Spot - the ultimate destination for engaging, real-time conversations!
          </p>

        </MDBCol>

        <MDBCol md='5'>

          <MDBCard className='my-2.5'>
            <MDBCardBody className='p-5'>

              <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text' value={name} onChange={(e)=>setName(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='Phone' id='form1' type='number' value={phone} onChange={(e)=>setPhone(e.target.value)} />
              <MDBFile label='Profile Picture(optional)' id='customFile' onChange={(e)=>setProfile(e.target.files[0])} />
              <br/>

              <MDBBtn className='w-100 mb-4' size='md' onClick={NewUser}>sign up</MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">Already A Talkie? <Link to="/signin" className="link-danger">Login Here</Link></p>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default App;