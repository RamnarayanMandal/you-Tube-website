import React from 'react'
import { NavBar } from '../NavBar'
import SideBar from '../SideBar'
import { useParams } from 'react-router-dom'

const GetvideoByID = () => {
  const {videoId} = useParams();
  console.log(videoId)
  return (
    <>
    <div className='fixed w-full bg-white shadow-sm z-50 top-0'>
        <NavBar/>
        </div>
      <div className="flex  gap-4 w-full h-full mt-32">
      <div className="hidden lg:block md:block w-64">
        <SideBar/>
      </div>
    
    </div>
    </>
  )
}

export default GetvideoByID
