import React, { useEffect, useState } from 'react';
import { NavBar } from '../NavBar';
import SideBar from '../SideBar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const WatchHistory = () => {
  const [watchHistory, setWatchHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get('/v1/user/history', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setWatchHistory(resp.data.message.watchHistory);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function calculateDuration(updatedAtDate) {
    const currentDate = new Date();
    const differenceInMillis = currentDate - new Date(updatedAtDate);
    const differenceInSeconds = Math.floor(differenceInMillis / 1000);
    const minutes = Math.floor(differenceInSeconds / 60);
    const hours = Math.floor(differenceInSeconds / 3600);
    const days = Math.floor(differenceInSeconds / (3600 * 24));

    if (days > 0) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return 'Just now';
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
          <div className="text-2xl font-semibold my-4">
            <h1>Watch History</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {watchHistory.map((video, index) => (
              <div key={index} className="mb-4">
                <video
                  src={video.videoFile}
                  controls
                  className="w-full h-64 rounded-lg mb-2"
                ></video>
                <div>
                  <div className="flex gap-2 my-4">
                    {video.owner.map((owner, idx) => (
                      <Link key={idx} to={`/video/${video._id}/${owner._id}`}>
                        <img
                          src={owner.avatar}
                          alt="avatar"
                          className="w-14 h-14 rounded-full"
                        />
                      </Link>
                    ))}
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
                          {calculateDuration(video.updatedAt)}
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
};

export default WatchHistory;
