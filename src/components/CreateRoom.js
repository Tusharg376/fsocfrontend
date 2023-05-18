import React, { useEffect, useState } from 'react';
import './CreateRoom.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';

export default function CreateRoom() {
  const Navigate = useNavigate();

  const [roomName, setRoomName] = useState('');
  const [users, setUsers] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [profile, setProfile] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL


  const token = localStorage.getItem('token');
  useEffect(()=>{
    const fetchData =  ()=>{
        if(!token){
            Navigate('/signin')
        }    
    }
    fetchData()
})

  const createRoom = async function () {
    const formData = new FormData();
    formData.append('roomName', roomName);
    formData.append('users', users);
    formData.append('isPrivate', isPrivate);
    formData.append('profile', profile);

    await axios.post(`${apiUrl}/createRoom`, formData, {
        headers: { 'Content-Type': 'multipart/form-data', 'x-api-key': token },
      })
      .then(() => {
        Navigate('/rooms');
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  };

  return (
    <div className='createRoom'>
      <div className='form-container'>
        <h3>Create New Room</h3>
        <div className='form'>
          <div>
          <TextField id="outlined-basic" label="Room Name" variant="outlined" sx={{ m: 1, width: '30ch' }}
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}/>
          </div>
          <div>
          <TextField id="outlined-basic" label="Email Of Members" variant="outlined" sx={{ m: 1, width: '30ch' }}
              value={users}
              onChange={(e) => setUsers(e.target.value)}/>
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
          <div>
            <label>
              Private Room:
              <input
                type='checkbox'
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
            </label>
          </div>
          <button type='button' className='btn btn-primary' onClick={createRoom}>
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
}
