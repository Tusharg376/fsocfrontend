import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import { Avatar } from '@mui/material'
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

export default function SidebarChat() {
  const [rooms, setRooms] = useState([])

  const Navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        Navigate('/signIn');
        return;
      }
      await axios.get('https://talkiesspot.onrender.com/rooms', {
        headers: { "x-api-key": localStorage.getItem("token") }
      })
        .then((res) => {
          console.log(res.data.data)
          setRooms(res.data.data.rooms);
        })
        .catch((err) => {
          console.log(err)
          window.alert(err.response.data.message);
        });
    };

    fetchData();
  },[]);
  
  const OpenChat = async (roomId) => {
    try {
      Navigate(`/rooms/${roomId}`)
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };


  return (
    <>
    {rooms.map((room) => (
      <div className='sidebarChat' key={room._id} onClick={() => OpenChat(room._id)}>
        <Avatar src={room.profile}/>
        <div className='sidebarChat_info'>
            <h4>{room.roomName}</h4>
        </div>
      </div>
    ))}
    </>
  )
}

