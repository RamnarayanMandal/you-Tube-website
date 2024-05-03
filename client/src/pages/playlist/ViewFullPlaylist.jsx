import React, { useEffect, useMemo, useState } from "react";
import { NavBar } from "../NavBar";
import SideBar from "../SideBar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { viewFullPlaylistActions } from "../../store/viewFullPlaylist.slice";
import { IoIosShareAlt } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import { VideoModal } from "../../utils/modal/VideoModal";

const ViewFullPlaylist = () => {
  const [playlist, setPlaylist] = useState([]);
  const userPlaylistData = useSelector((store) => store.userplaylist);
  const { loginData } = useSelector((store) => store.login);
  const dispatch = useDispatch();

  //   console.log(loginData.message.user.fullName);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const playlistId = userPlaylistData.message[0]._id;
        const response = await axios.get(`/v1/playlist/${playlistId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlaylist(response.data.message);
        dispatch(
          viewFullPlaylistActions.viewFullPlaylist({
            viewFullPlaylist: response.data.message,
          })
        );
        console.log(response.data.message.videosDetails[0].videoFile);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };

    if (userPlaylistData.message && userPlaylistData.message.length > 0) {
      fetchData();
    }
  }, [userPlaylistData, dispatch]);

  function calculateDuration(updatedAtDate) {
    const currentDate = new Date();
    const differenceInMillis = currentDate - updatedAtDate;
    const differenceInSeconds = Math.floor(differenceInMillis / 1000);
    const minutes = Math.floor(differenceInSeconds / 60);
    const hours = Math.floor(differenceInSeconds / 3600);
    const days = Math.floor(differenceInSeconds / (3600 * 24));

    if (days > 0) {
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else {
      return "Just now";
    }
  }

  if(!playlist) {
    return (
      <div className="flex justify-center items-center h-screen">
        
        <VideoModal/>
       
      </div>
    );
  }

  return (
    <div>
      <div className="fixed w-full bg-white shadow-sm z-50 top-0">
        <NavBar />
      </div>
      <div className="lg:flex gap-4 w-full h-full">
        <div className="hidden lg:block md:block w-64">
          <SideBar />
        </div>
        <div className="px-5 py-10 mt-32 lg:ml-32 md:pl-72 p-5 lg:p-0  ">
          <div className="lg:w-[60vmin] lg:h-[80vmin] bg-blue-400 rounded-lg px-5 py-8  ">
            <div className="lg:w-[55vmin] h-[30vmin] bg-blue-gray-50 object-fill overflow-hidden rounded shadow-md flex justify-center content-center items-center p-10 mb-2 ">
              <img src="https://cdn3.iconfinder.com/data/icons/analysis-report/512/analysis_8.png" alt="" className="object-cover h-[30vmin]"/>
            </div>
            <h1 className="text-2xl pl-2 text-white mb-2 ">
              {playlist.name}
            </h1>
            <p className="text-md pl-2 text-gray-400 mb-2">
              BY {loginData.message.user.fullName}
            </p>
            <div className="text-sm pl-2 text-gray-400 flex items-center gap-2 mb-2">
              <p>{playlist?.videos?.length} videos </p>
              <p>{calculateDuration(new Date(playlist.updatedAt))}</p>
            </div>
            <div className="flex gap-2 text-xl pl-2 text-white mb-2">
              <IoIosShareAlt className="bg-gray-400 bg-opacity-20 px-2 py-2 text-4xl rounded-full" />
              <MdOutlineFileDownload className="bg-gray-400 bg-opacity-20 px-2 py-2 text-4xl rounded-full" />
              <BsThreeDotsVertical className="bg-gray-400 bg-opacity-20 px-2 py-2 text-4xl rounded-full" />
            </div>
            <div className="text-white flex gap-5 mb-2">
              <button className="bg-gray-400 bg-opacity-50 px-6 py-2 text-md rounded-full  flex items-center gap-2">
                <FaPlay />
                Play all
              </button>
              <button className="bg-gray-400 bg-opacity-50 px-6 py-2 text-md rounded-full flex items-center gap-2">
                <FaShuffle />
                Shuffle
              </button>
            </div>
            <div>
              <h1 className="text-white pl-2 text">
                Description:
                <span className="pl-1 text-sm">{playlist.description}</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="px-5 lg:mt-40 w-full md:pl-72 p-5 lg:p-0 md:mt-0 mt-0">
          {playlist.videosDetails?.map((video) => (
            <div className="w-full lg:flex  content-center my-4 gap-4 p-2" key={video._id} >
              <div className="lg:w-1/2 md:w-full mb-2">
              <video src={video.videoFile} controls className="w-full rounded-xl" ></video>
              </div>
              <div className="lg:w-1/2 md:full mb-2 p-5">
                <h1 className='text-xl lg:text-xl md:text-3xl font-semibold mb-1'>{video.title}</h1>
                <p className='text-gray-400 text-lg lg:text-xl md:text-2xl mb-1'>{video.description}</p>
                <div className=' flex lg:gap-5 md:gap-4 gap-2 content-center items-center mb-1'>
                  <p text-gray-800 text-xs lg:text-xl md:text-sm>{video.views} views </p>
                  <p text-gray-800 text-xs lg:text-xl md:text-sm>{calculateDuration(new Date(video.updatedAt))}</p>
                  <p text-gray-800 text-xs lg:text-xl md:text-sm>{(video.duration / 60).toFixed(2)} min</p>
                </div>
              </div>
            </div>
           
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default ViewFullPlaylist;
