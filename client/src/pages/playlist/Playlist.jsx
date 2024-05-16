
import React from 'react';
import UserPlaylist from '../playlist/UserPlaylist'
import SideBar from '../SideBar';
import { NavBar } from '../NavBar';
import { useParams } from 'react-router-dom';
const Playlist = () => {
  const {userId} = useParams();
  console.log(userId); 
  return (
    <>
    <div className='fixed w-full bg-white shadow-sm z-50 top-0'>
        <NavBar/>
        </div>
      <div className="flex  gap-4 w-full h-full mt-32">
      <div className="hidden lg:block md:block w-64">
        <SideBar/>
      </div>
    <UserPlaylist userId={userId}/>
    </div>
    </>
  );
};

export default Playlist;
