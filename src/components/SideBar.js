import React, { useEffect, useState } from 'react';
import "./Sidebar.css";
import { IconButton, TextField, Avatar, Button, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Input } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SideBar() {
  const [anchorEl1, setAnchorEl1] = useState(null); // state variable for search result menu
  const [anchorEl2, setAnchorEl2] = useState(null); // state variable for main menu
  const [addUpdateProfileOpen, setAddUpdateProfileOpen] = useState(false);
  const [name, setName] = useState("");
  const [profile, setProfile] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchData, setSearchData] = useState("");
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleMenuClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleMenuClose1 = () => {
    setAnchorEl1(null);
  };

  const handleMenuClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleMenuClose2 = () => {
    setAnchorEl2(null);
  };

  const handleUpdateProfile = () => {
    setAddUpdateProfileOpen(true);
    handleMenuClose2();
  };

  const handleUpdateProfileClose = () => {
    setAddUpdateProfileOpen(false);
  };

  function createRoom() {
    navigate("/createroom");
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('https://talkiesspot.onrender.com/userdata', {
          headers: { "x-api-key": token }
        });
        setProfile(res.data.data.profile);
      } catch (err) {
        window.alert(err.response.data.message);
      }
    };
    fetchUserData();
  }, [token]);

  const handleUpdateProfileSubmit = async () => {
    const formData = new FormData();
    if (name) {
      formData.append('name', name);
    }
    if (profile) {
      formData.append('profile', profile);
    }

    try {
      await axios.put('https://talkiesspot.onrender.com/updateuser', formData, {
        headers: { "Content-Type": "multipart/form-data", "x-api-key": token },
      });
      window.alert("update successfull");
      navigate('/rooms');
    } catch (err) {
      window.alert(err.response.data.message);
    }
    handleUpdateProfileClose();
  };

  const OpenChat = async (roomId) => {
    try {
      navigate(`/rooms/${roomId}`)
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.post('https://talkiesspot.onrender.com/searchRoom', {searchData:searchData} , {
        headers: { "x-api-key": token }
      });
      console.log(searchResults)
      setSearchResults(res.data.data);
    } catch (err) {
      console.log(err)
      window.alert(err.response.data.message);
    }
  };
  return (
    <div className='sidebar'>
      <div className="sidebar_header">
        <Avatar src={profile} />
        <div className="sidebar_headerRight">
          <TextField
            id="outlined-basic"
            label="Search Rooms"
            variant="outlined"
            size='small'
            value={searchData}
            onClick={handleMenuClick1}
            onChange={(e) => setSearchData(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
          {searchResults.length > 0 &&
            <Menu
              anchorEl={anchorEl1}
              open={Boolean(anchorEl1)}
              onClose={handleMenuClose1}
            >
              {searchResults.map((result, index) => (
                <MenuItem key={index} onClick={() => OpenChat(result._id)}>{result.roomName}</MenuItem>
              ))}
            </Menu>
          }
          <IconButton onClick={handleMenuClick2}>
            <ListIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl2}
            open={Boolean(anchorEl2)}
            onClose={handleMenuClose2}
          >
            <MenuItem onClick={handleUpdateProfile}>Update Profile</MenuItem>
          </Menu>
        </div>
      </div>
      <div className = "create_button">
        <Button variant="outlined" onClick={createRoom}>Create New Room</Button>
      </div>
      <div className="sidebar_chats">
        <SidebarChat />
      </div>
      <Dialog open={addUpdateProfileOpen} onClose={handleUpdateProfileClose}>
         <DialogTitle>Update Your Profile</DialogTitle>
         <DialogContent>
           <TextField label="Name" fullWidth value={name} onChange={(e)=>setName(e.target.value)} />
           <Input type="file" label="Profile" onChange={(e) => setProfile(e.target.files[0])} />
         </DialogContent>
         <DialogActions>
           <Button onClick={handleUpdateProfileClose}>Cancel</Button>
           <Button onClick={handleUpdateProfileSubmit}>Update</Button>
         </DialogActions>
       </Dialog>
    </div>
  )
}