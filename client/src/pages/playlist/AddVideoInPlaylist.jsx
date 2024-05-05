import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import img from "../../assets/AddVideoSection.jpg";
import { NavBar } from "../NavBar";
import SideBar from "../SideBar";
import { AddVideoInplaylistModal } from "../../utils/modal/AddVideoInPlaylistModal";

const AddVideoInPlaylist = () => {
  const [userUploadedvideo, setUserUploadedvideo] = useState([]);
  const { userChannel } = useSelector((store) => store.userChannel);
  const { playlistId } = useParams();

  useEffect(() => {
    if (userChannel?.message?.uploadvideo) {
      setUserUploadedvideo(userChannel.message.uploadvideo);
    }
  }, [userChannel]);

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

  return (
    <>
      <div className="fixed w-full bg-white shadow-sm z-50 top-0">
        <NavBar />
      </div>
      <div className="flex justify-start mt-32 md:mt-0">
        <div className="hidden lg:block md:block ml-0 w-64">
          <SideBar />
        </div>
        <div className="mx-2 lg:ml-20 md:ml-0 lg:mt-32 flex flex-col md:flex-row ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:mt-0 gap-4 md:ml-4">
            {userUploadedvideo?.map((video, index) => (
              <div
                key={index}
                className="w-full lg:w-80 md:w-60 relative rounded-lg"
              >
                <video
                  src={video.videoFile}
                  controls
                  alt="video"
                  className="w-full h-60 md:h-auto rounded-lg mb-2"
                  style={{ position: "sticky", top: "32px" }}
                ></video>
                <div className="flex justify-between gap-1 px-2">
                 <div className="flex flex-col gap-1" >
                  <h1 className="text-lg font-semibold ">{video.title}</h1>
                  <p className="text-gray-400 text-sm ">
                    {video.description}
                  </p>
                  <div className="flex gap-1 text-gray-600 text-xs">
                    <p>{video.views} views</p>
                    <p>{calculateDuration(new Date(video.updatedAt))}</p>
                    <p>{(video.duration / 60).toFixed(2)} min</p>
                  </div>
                  </div>
                  <div>
                    <AddVideoInplaylistModal playlistId={playlistId} videoId={video._id} action="add"/>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
    
  );
};

export default AddVideoInPlaylist;
