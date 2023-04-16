import React, { useEffect } from 'react'
import './Rooms.css'
import SideBar from './SideBar'
import Chat from "./Chat"
import { useNavigate } from 'react-router-dom'



export default function Rooms() {
    const Navigate = useNavigate()
    
    const token = localStorage.getItem("token")
    useEffect(()=>{
        const fetchData =  ()=>{
            if(!token){
                Navigate('/signin')
            }    
        }
        fetchData()
    })

    
        
  return (
    <>
        <div className='app'> 
            <div className='app_body'> 
                <SideBar/>
                <Chat/>
            </div>
        </div>
    </>
  )
}

