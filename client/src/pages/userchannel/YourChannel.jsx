import React from 'react'
import { NavBar } from '../NavBar'
import SideBar from '../SideBar'
import UserProfile from '../../component/UserProfile'
import { Link, useParams } from 'react-router-dom'


const YourChannel = () => {
  const {username,userId} = useParams();

  return (
    <div>
      <div className='fixed w-full bg-white shadow-sm z-50 top-0'>
        <NavBar/>
        </div>
      <div className="flex  gap-4 w-full h-full">
      <div className="hidden lg:block md:block w-64">
        <SideBar/>
      </div>
      <div className='w-full mt-32 '>
        <UserProfile username={username} userId={userId}/>
      </div>
      </div>
    </div>
    
  )
}

export default YourChannel
