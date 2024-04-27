import React from 'react'
import { NavBar } from './NavBar'
import  SideBar  from './SideBar'
import Video from '../component/video'

const Dasbord = () => {
  return (
    <div>
      <NavBar/>
      <div className='flex items-center content-center gap-4'>
      <div className='mx-2 mt-0 hidden lg:block md:block'>
        <SideBar/>
      </div>
      <div>
        <Video/>
      </div>
      </div>
    </div>
  )
}

export default Dasbord
