import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import axios from 'axios';
import './joinRoom.css';
import { Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function RoomTable() {
  const [rooms, setRooms] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [roomData, setRoomData] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL
  
  let navigate = useNavigate()
  
  useEffect(()=>{
    const fetchData =  ()=>{
        if(!localStorage.getItem("token")){
            navigate('/signin')
        }    
    }
    fetchData()
})


  function roomSearch(){
    axios.post(`${apiUrl}/searchOpenRooms`,
    {searchData},
    {headers:{'x-api-key': localStorage.getItem("token")}}
    )
    .then((response)=>{
      setRoomData(response.data.data)
    })
    .catch((error)=>{
      window.alert(error.response.data.message)
    })
  }

  function addMember(roomId) {
    axios.post(`${apiUrl}/joinRoom`,
        { roomId },
        { headers: { 'x-api-key': localStorage.getItem('token')}}
      )
      .then((response) => {
        window.alert(response.data.message);
        navigate('/rooms')
      })
      .catch((err) => {
        window.alert(err.response.data.message);
      });
  }
  
  useEffect(() => {
    axios.get(`${apiUrl}/findRoom`, {
        headers: { "x-api-key": localStorage.getItem("token") }
      })
      .then(response => {
        console.log(response)
        setRooms(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  function backButton(){
    navigate("/rooms")
  }

  return (
    <div className= "root">
      <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={()=>backButton()}>
        Back to Homepage
      </Button>
      <TextField className='searchField' label="Search Rooms" variant="outlined" margin="normal" 
      sx={{ m: 1, width: '80ch' }} value={searchData} onChange={(e)=>setSearchData(e.target.value)}/>

      <IconButton type="button" sx={{ p: '25px' }} aria-label="search" onClick={()=>roomSearch()} >
        <SearchIcon />
      </IconButton>

      <TableContainer className='tableContainer'>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className='tableHeaderCell'>Profile</TableCell>
              <TableCell className='tableHeaderCell'>Room Name</TableCell>
              <TableCell className='tableHeaderCell'>Room Admin</TableCell>
              <TableCell className='tableHeaderCell'></TableCell>
              <TableCell className='tableHeaderCell'></TableCell>
              <TableCell className='tableHeaderCell'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {roomData.length>0 ?
          roomData.map((room)=>(
            <TableRow key={room.id}>
              <TableCell>
                <Avatar src={room.profile}/>
              </TableCell>
              <TableCell>{room.roomName}</TableCell>
              <TableCell>{room.roomAdmin.name}</TableCell>
              <TableCell>
              <Button className='joinButton' variant="contained" onClick={()=>{
                addMember(room._id)}}>Join Room</Button>
              </TableCell>
            </TableRow>
          ))
          :rooms.length > 0 ? 
              rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>
                    <Avatar src={room.profile} />
                  </TableCell>
                  <TableCell>{room.roomName}</TableCell>
                  <TableCell>{room.roomAdmin.name}</TableCell>
                  <TableCell>
                    <Button className='joinButton' variant="contained" onClick={()=>{
                      addMember(room._id)}}>Join Room</Button>
                  </TableCell>
                </TableRow>
              )) :
              <TableRow>
                <TableCell colSpan={6} align="center">No rooms found</TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
