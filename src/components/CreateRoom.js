import React, { useState } from 'react';
import './CreateRoom.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateRoom() {
  const Navigate = useNavigate();

  const [roomName, setRoomName] = useState('');
  const [users, setUsers] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [profile, setProfile] = useState(null);

  const token = localStorage.getItem('token');

  const createRoom = async function () {
    const formData = new FormData();
    formData.append('roomName', roomName);
    formData.append('users', users);
    formData.append('isPrivate', isPrivate);
    formData.append('profile', profile);

    await axios
      .post('https://talkiesspot.onrender.com/createRoom', formData, {
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
        <div className='form'>
          <div>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Room Name'
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>
          <div>
            <input
              type='text'
              name='users'
              id='users'
              placeholder='Email of Members'
              value={users}
              onChange={(e) => setUsers(e.target.value)}
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
