import React, { useEffect, useState } from 'react';
import { NavBar } from '../NavBar';
import SideBar from '../SideBar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LikedVideo = () => {
  const [videos, setVideos] = useState([]);
  const [getUserName,setUserName] = useState();
  const [user, setUser] = useState(null);
 
  const token = localStorage.getItem("accessToken");
  const user_id = localStorage.getItem("user_id");
  console.log(user);

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const response = await axios.get(`/v1/like/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const allVideoDetails = response.data.message.flatMap(item => item.videoDetails);
        setVideos(allVideoDetails);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLikedVideos();
  }, [token, user_id]);

  useEffect(()=>{
    if (videos.length > 0 && videos[0].owner) {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(`/v1/user/${videos[0].owner}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserName(response.data.message.username
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserName();
  }
  },[videos,token])

  

  useEffect(() => {
   
      const fetchUser = async () => {
        try {
          const res = await axios.get(`/v1/user/c/${getUserName}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(res.data.message);
         
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
   
  }, [ token,getUserName]);

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
      <div className="flex gap-4 w-full h-full mt-32">
        <div className="hidden lg:block md:block w-64">
          <SideBar />
        </div>
        <div className="lg:w-3/4 h-full md:w-2/3 w-full px-10">
          <div className="text-2xl font-semibold ">
            <h1>Liked Videos</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video, index) => (
              <div key={index} className="mb-4">
                <video
                  src={video.videoFile}
                  controls
                  className="w-full h-64 rounded-lg mb-2"
                ></video>
                <div>
                  <div className="flex gap-2 my-4">
                    <Link to={`/video/${video._id}/${getUserName}`}>
                      <img
                        src={user?.avatar || ''}
                        alt="avatar"
                        className="w-14 h-14 rounded-full"
                      />
                    </Link>
                    <div>
                      <h1 className="lg:text-2xl md:text-2xl text-xl font-serif font-semibold">
                        {video.title}
                      </h1>
                      <p className="text-gray-400 text-lg lg:text-xl md:text-2xl">
                        {video.description}
                      </p>
                      <div className="flex lg:gap-5 md:gap-4 gap-2 content-center items-center">
                        <p className="text-gray-400 text-xs lg:text-xl md:text-sm">
                          {video.views} views
                        </p>
                        <p className="text-gray-400 text-xs lg:text-xl md:text-sm">
                          {calculateDuration(new Date(video.updatedAt))}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default LikedVideo;
