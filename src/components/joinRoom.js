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

export default function RoomTable() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/findRoom', {
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

  return (
    <div className= "root">
      <TextField className='searchField' label="Search Rooms" variant="outlined" margin="normal" 
      sx={{ m: 1, width: '80ch' }} />
      <IconButton type="button" sx={{ p: '25px' }} aria-label="search">
        <SearchIcon />
      </IconButton>

      <TableContainer className='tableContainer'>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className='tableHeaderCell'>Profile</TableCell>
              <TableCell className='tableHeaderCell'>Room Name</TableCell>
              {/* <TableCell className='tableHeaderCell'>Participants</TableCell> */}
              <TableCell className='tableHeaderCell'></TableCell>
              <TableCell className='tableHeaderCell'></TableCell>
              <TableCell className='tableHeaderCell'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rooms.length > 0 ? 
              rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>
                    <Avatar src={room.profile} />
                  </TableCell>
                  <TableCell>{room.roomName}</TableCell>
                  {/* {
                    (room.users).map((user) =>(
                        <TableCell>{user.name}</TableCell>
                    ))
                  } */}
                  <TableCell>
                    <Button className='joinButton' variant="contained">Join Room</Button>
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
