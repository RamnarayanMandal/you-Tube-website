import React from 'react'
import { NavBar } from './NavBar'
import SideBar from './SideBar'
import UserProfile from '../component/UserProfile'
import { Link } from 'react-router-dom'


const YourChannel = () => {
  return (
    <div>
      <div><NavBar/></div>
      <div className="flex  gap-4 w-full h-full">
      <div className="hidden lg:block md:block w-64">
        <SideBar/>
      </div>
      <div className='w-full '>
        <UserProfile/>
      </div>
      </div>
    </div>
    
  )
}

export default YourChannel
