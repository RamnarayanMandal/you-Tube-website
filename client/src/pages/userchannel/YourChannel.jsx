import React from 'react'
import { NavBar } from '../NavBar'
import SideBar from '../SideBar'
import UserProfile from '../../component/UserProfile'
import { Link } from 'react-router-dom'


const YourChannel = () => {
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
        <UserProfile/>
      </div>
      </div>
    </div>
    
  )
}

export default YourChannel
