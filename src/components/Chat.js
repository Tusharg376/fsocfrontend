import React, { useEffect, useState } from 'react';
import "./Chat.css";
import { Avatar, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuList } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Chat() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);
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
    const [users,setUsers] = useState([])
    const apiUrl = process.env.REACT_APP_API_URL


    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem('token');
    
    const Navigate = useNavigate()
    
  const handleMenuClick1 = (event) => {
    showUsers()
    setAnchorEl1(event.currentTarget)
  };

  const handleMenuClose1 = () => {
    setAnchorEl1(null);
  };
  
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
        await axios.get(`${apiUrl}/rooms/${roomId}`,{
            headers: { "x-api-key": localStorage.getItem("token") }
          })
          .then((res)=>{
            setMessageArr(res.data.data)
          }).catch((err)=>{
            console.log(err.response)
          })
      }
      fetchData()
  },[roomId])
  
  useEffect(() => {
        const fetchData = async ()=>{
          await axios.get(`${apiUrl}/getroom/${roomId}`,{
            headers: { "x-api-key": localStorage.getItem("token") }
          }).then((res)=>{ 
              setRoomName(res.data.data.roomName)
              setRoomProfile(res.data.data.profile)
          }).catch((err)=>{
              console.log(err.response.data.message)
          })
        }
      fetchData()   
  },[roomId]);


  const handleAddMemberSubmit = async () => {
    await axios.post(`${apiUrl}/addmember/${roomId}`,{
      email:email
    },{headers:{"x-api-key":token}}).then((res)=>{
      window.alert("Member Added Successfully")
      Navigate(`/rooms/${roomId}`)
    }).catch((err)=>{
      console.log(err)
      window.alert(err.response.data.message)
    })
    handleAddMemberClose();
  }
  

  const handleRenameRoomSubmit = async () => {
    await axios.put(`${apiUrl}/renameRoom/${roomId}`,{
      roomName:newRoomName
    },{headers:{"x-api-key":token}}).then(()=>{
      Navigate(`/rooms/${roomId}`)
    }).catch((err)=>{
      window.alert(err.response.data.message)
    })
    handleRenameRoomClose();
  }

  const handleRemoveMemberSubmit = async () =>{
    await axios.put(`${apiUrl}/removemember/${roomId}`,{
      email:email
    },{headers:{"x-api-key":token}}).then(()=>{
      window.alert("Member Removed Successfully");
      Navigate(`/rooms/${roomId}`)
    }).catch((err)=>{
      window.alert(err.response.data.message)
    })
    handleRemoveMemberClose()
  } 

  const handleSendMessage = async () =>{
    await axios.post(`${apiUrl}/sendmessage/${roomId}`,{
      content: newMessage
    },{headers:{"x-api-key":token}})
    .then(()=>{
      setNewMessage("")
    }).catch((err)=>{
      window.alert(err.response.data.message)
      console.log(err.response)
    })
  }

  const showUsers = async () => {
    await axios.get(`${apiUrl}/getroom/${roomId}`,{
      headers:{"x-api-key":token}
    }).then((res)=>{
      let arr = res.data.data.users
      arr.push(res.data.data.roomAdmin)
      setUsers(arr)
    }).catch((err)=>{
      window.alert(err.response.data.message)
    })
  }


  return (
    <div className='chat'>
       <div className='chat_header'>
          <Avatar src={ roomProfile}/>
          <div className='chat_headerInfo'>
            <IconButton onClick={handleMenuClick1}>
              <h4>{`${ roomName }`}</h4>
            </IconButton>
              {users.length > 0 &&  
              <Menu 
              anchorEl={anchorEl1}
              open={Boolean(anchorEl1)}
              onClose={handleMenuClose1}
              >
                <MenuList>  Room Participants :- </MenuList>
                {users.map((result,index)=>(
                  <MenuItem key={index} padding={true}>{index === users.length - 1 ? `${result.name} (${result.email}) (Admin)` : `${result.name} (${result.email})`}</MenuItem>
                ))
                }

              </Menu> }
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
