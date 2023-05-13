
import './App.css';
import Navbar from './components/Navbar'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Signup from './components/Signup';
import Signin from './components/Signin';
import Rooms from "./components/Rooms";
import CreateRoom from './components/CreateRoom';
import Chat from './components/Chat';
import FindRoom from "./components/joinRoom"

function App() {
  return (
  <BrowserRouter>
  
    <div className="App">
      <Navbar/>   
      <Routes>
        <Route path ="/" element={<Signup/>}></Route>
        <Route path ="/signup" element={<Signup/>}></Route>
        <Route path ="/signin" element={<Signin/>}></Route>
        <Route path ="/rooms" element = {<Rooms/>}></Route>
        <Route path ="/createRoom" element = {<CreateRoom/>}></Route>
        <Route path ="/chat" element = {<Chat/>}></Route>
        <Route path ="/rooms/:roomId" element = {<Rooms/>}></Route>
        <Route path = "/findRoom" element = {<FindRoom/>}> </Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;