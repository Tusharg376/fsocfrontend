import React, { useEffect, useState } from 'react';
import "./Chat.css";
import { Avatar, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Chat() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [addMemberOpen, setAddMemberOpen] = useState(false);
    const [renameRoomOpen, setRenameRoomOpen] = useState(false);
    const [removeMemberOpen, setRemoveMemberOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [roomName, setRoomName] = useState("");
    const [roomProfile, setRoomProfile] = useState("");
    const {roomId} = useParams()
    const [newRoomName,setNewRoomName] = useState("")
    const [messageArr , setMessageArr] = useState([])
    const [newMessage, setNewMessage] = useState("")

    // console.log(roomId)

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem('token');
    
    const Navigate = useNavigate()
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddMember = () => {
    setAddMemberOpen(true);
    handleMenuClose();
  }

  const handleAddMemberClose = () => {
    setAddMemberOpen(false);
  }

  const handleRenameRoom = () => {
    setRenameRoomOpen(true);
    handleMenuClose();
  }
  
  const handleRenameRoomClose = () => {
    setRenameRoomOpen(false);
  }

  const handleRemoveMember = () => {
    setRemoveMemberOpen(true);
    handleMenuClose();
  }
  
  const handleRemoveMemberClose = () => {
    setRemoveMemberOpen(false);
  }

  useEffect(() =>{
      const fetchData = async () =>{
        await axios.get(`https://talkiesspot.onrender.com/rooms/${roomId}`,{
            headers: { "x-api-key": localStorage.getItem("token") }
          })
          .then((res)=>{
            console.log(res.data.data);
            setMessageArr(res.data.data)
          }).catch((err)=>{
            console.log(err.response)
          })
      }
      fetchData()
  },[roomId])
  
  useEffect(() => {
        const fetchData = async ()=>{
          await axios.get(`https://talkiesspot.onrender.com/getroom/${roomId}`,{
            headers: { "x-api-key": localStorage.getItem("token") }
          }).then((res)=>{
              // console.log(res)    
              setRoomName(res.data.data.roomName)
              setRoomProfile(res.data.data.profile)
          }).catch((err)=>{
              console.log(err.response.data.message)
          })
        }
      fetchData()   
  },[roomId]);


  const handleAddMemberSubmit = async () => {
    await axios.post(`https://talkiesspot.onrender.com/addmember/${roomId}`,{
      email:email
    },{headers:{"x-api-key":token}}).then((res)=>{
      window.alert("Member Added Successfully")
      Navigate(`/rooms/${roomId}`)
    }).catch((err)=>{
      console.log(err)
      window.alert(err.response)
    })
    handleAddMemberClose();
  }
  

  const handleRenameRoomSubmit = async () => {
    await axios.put(`https://talkiesspot.onrender.com/renameRoom/${roomId}`,{
      roomName:newRoomName
    },{headers:{"x-api-key":token}}).then(()=>{
      Navigate(`/rooms/${roomId}`)
    }).catch((err)=>{
      window.alert(err.response.data.message)
    })
    handleRenameRoomClose();
  }

  const handleRemoveMemberSubmit = async () =>{
    await axios.put(`https://talkiesspot.onrender.com/removemember/${roomId}`,{
      email:email
    },{headers:{"x-api-key":token}}).then(()=>{
      window.alert("Member Removed Successfully");
      Navigate(`/rooms/${roomId}`)
    }).catch((err)=>{
      console.log(err)
      window.alert(err.response)
    })
    handleRemoveMemberClose()
  } 

  const handleSendMessage = async () =>{
    await axios.post(`https://talkiesspot.onrender.com/sendmessage/${roomId}`,{
      content: newMessage
    },{headers:{"x-api-key":token}})
    .then(()=>{
      console.log("sent")
      setNewMessage("")
    }).catch((err)=>{
      window.alert(err.response.data.message)
      console.log(err.response)
    })
  }


  return (
    <div className='chat'>
       <div className='chat_header'>
          <Avatar src={ roomProfile}/>
          <div className='chat_headerInfo'>
              <h4>{`${ roomName }`}</h4>
          </div>
          <div className='chat_headerRight'>
            <IconButton onClick={handleMenuClick}>
                <ListIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleAddMember}>Add A Member</MenuItem>
              <MenuItem onClick={handleRemoveMember}>Remove A Member</MenuItem>
              <MenuItem onClick={handleRenameRoom}>Rename Room</MenuItem>
            </Menu>
          </div>
       </div>
       <div className='chat_body'>
        {messageArr.map((msg)=>(
          <div key={msg._id}  >
            {msg.sender._id === userId ? (
                <p className='chat_reciever chat_message'>
                <span className='chat_name'>{msg.sender.name}</span>
                {msg.content}
                <span className='chat_timeStamps'>
                  {msg.createdAt} 
                </span>
              </p> 
              
            ) : (
              <p className='chat_message'>
              <span className='chat_name'>{msg.sender.name}</span>
               {msg.content}
              <span className='chat_timeStamps'>
              {msg.createdAt} 
              </span>
            </p>
            )}
          </div>
        ))}
       </div>
       <div className='chat_footer'>
        <form>
          <input placeholder='type message here' type="text" value={newMessage} onChange={(e)=>setNewMessage(e.target.value)}  />
        </form>
        <IconButton onClick={handleSendMessage}>
          <SendIcon/>        
        </IconButton>
       </div>

       {/* Add member dialog */}
       <Dialog open={addMemberOpen} onClose={handleAddMemberClose}>
         <DialogTitle>Add A Member</DialogTitle>
         <DialogContent>
           <TextField label="Email Id" fullWidth value={email} onChange={(e)=> setEmail(e.target.value)} />
         </DialogContent>
         <DialogActions>
           <Button onClick={handleAddMemberClose}>Cancel</Button>
           <Button onClick={handleAddMemberSubmit}>Add</Button>
         </DialogActions>
       </Dialog>
       {/* rename room dialog */}
       <Dialog open={renameRoomOpen} onClose={handleRenameRoomClose}>
         <DialogTitle>Give New Name</DialogTitle>
         <DialogContent>
           <TextField label="Room Name(new)" fullWidth vallue={newRoomName} onChange={(e)=>{setNewRoomName(e.target.value)}}/>
         </DialogContent>
         <DialogActions>
           <Button onClick={handleRenameRoomClose}>Cancel</Button>
           <Button onClick={handleRenameRoomSubmit}>Update</Button>
         </DialogActions>
       </Dialog>
       {/* remove member dialog */}
       <Dialog open={removeMemberOpen} onClose={handleRemoveMemberClose}>
         <DialogTitle>Remove A Member</DialogTitle>
         <DialogContent>
           <TextField label="Email Id" fullWidth value={email} onChange={(e)=> setEmail(e.target.value)} />
         </DialogContent>
         <DialogActions>
           <Button onClick={handleRemoveMemberClose}>Cancel</Button>
           <Button onClick={handleRemoveMemberSubmit}>Remove</Button>
         </DialogActions>
       </Dialog>
    </div>
  )
}
