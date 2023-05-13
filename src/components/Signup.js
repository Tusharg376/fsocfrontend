// import React, { useEffect, useState } from 'react';
// import './Signup.css';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// export default function SignUp() {
//   const Navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [profile, setProfile] = useState(null);
  
//   const token = localStorage.getItem("token")
  
//   useEffect(()=>{
//     const fetchData =  ()=>{
//         if(token){
//             Navigate('/rooms')
//         }    
//     }
//     fetchData()
// })

//   const NewUser = async function () {
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('email', email);
//     formData.append('password', password);
//     formData.append('phone', phone);
//     formData.append('profile', profile);

//     await axios
//       .post('http://localhost:3001/createUser', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       })
//       .then(() => {
//         Navigate('/signIn');
//       })
//       .catch((err) => {
//         window.alert(err.response.data.message);
//       });
//   };

//   return (
//     <div className='signUp'>
//       <div className='form-container'>
//         <div className='form'>
//           <div>
//             <input
//               type='text'
//               name='name'
//               id='name'
//               placeholder='Full name'
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div>
//             <input
//               type='email'
//               name='email'
//               id='email'
//               placeholder='Email'
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div>
//             <input
//               type={'password'}
//               name='password'
//               id='password'
//               placeholder='Password'
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div>
//             <input
//               type='phone'
//               name='phone'
//               id='phone'
//               placeholder='phone'
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </div>
//           <div>
//             <input
//               type='file'
//               name='profile'
//               id='profile'
//               placeholder='Profile'
//               onChange={(e) => setProfile(e.target.files[0])}
//             />
//           </div>
//           <button type='button' className='btn btn-primary' onClick={NewUser}>
//             Sign Up
//           </button>
//         </div>
//         <div className='form2'>
//           Already A Member ?{' '}
//           <Link to='/signIn'>
//             <span style={{ color: 'blue', cursor: 'pointer' }}> Sign In</span>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

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

    await axios.post('http://localhost:3001/createUser', formData, {
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