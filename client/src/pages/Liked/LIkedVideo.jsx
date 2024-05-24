import React, { useEffect, useState } from 'react';
import { NavBar } from '../NavBar';
import SideBar from '../SideBar';
import axios from 'axios';

const LikedVideo = () => {
  const [videos, setVideos] = useState([]);
  console.log(videos);

  const token = localStorage.getItem("accessToken");
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const response = await axios.get(`/v1/like/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setVideoIds(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLikedVideos();
  }, [token]);

  

  return (
    <>
      <div className="fixed w-full bg-white shadow-sm z-50 top-0">
        <NavBar />
      </div>
      <div className="lg:flex md:flex block w-full h-full mt-32">
        <div className="hidden lg:block md:block w-52">
          <SideBar />
        </div>
        <div className="lg:w-1/2 h-full md:w-1/2 w-full lg:ml-10 md:ml-10">
          <div className="text-2xl font-semibold my-4">
            <h1>Liked videos</h1>
          </div>
          <div>
            {videos.map((video, index) => (
              <div key={index}>
                <h2>{video.title}</h2>
                <p>{video.description}</p>
                {/* Add other video details you want to display */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default LikedVideo;
