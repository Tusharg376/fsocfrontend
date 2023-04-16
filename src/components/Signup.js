import React, { useEffect, useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [profile, setProfile] = useState(null);
  
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

    await axios
      .post('https://talkiesspot.onrender.com/createUser', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => {
        Navigate('/signIn');
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };

  return (
    <div className='signUp'>
      <div className='form-container'>
        <div className='form'>
          <div>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Full name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type={'password'}
              name='password'
              id='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type='phone'
              name='phone'
              id='phone'
              placeholder='phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type='file'
              name='profile'
              id='profile'
              placeholder='Profile'
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <button type='button' className='btn btn-primary' onClick={NewUser}>
            Sign Up
          </button>
        </div>
        <div className='form2'>
          Already A Member ?{' '}
          <Link to='/signIn'>
            <span style={{ color: 'blue', cursor: 'pointer' }}> Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}