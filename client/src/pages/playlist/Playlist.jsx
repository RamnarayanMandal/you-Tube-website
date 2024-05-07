
import React from 'react';
import UserPlaylist from '../playlist/UserPlaylist'
import SideBar from '../SideBar';
import { NavBar } from '../NavBar';
const Playlist = () => {
  
  
 
  return (
    <>
    <div className='fixed w-full bg-white shadow-sm z-50 top-0'>
        <NavBar/>
        </div>
      <div className="flex  gap-4 w-full h-full mt-32">
      <div className="hidden lg:block md:block w-64">
        <SideBar/>
      </div>
    <UserPlaylist/>
    </div>
    </>
  );
};

export default Playlist;
