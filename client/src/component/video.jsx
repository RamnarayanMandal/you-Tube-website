import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { videoActions } from '../store/getAllvideo.slice';
import { VideoModal } from '../utils/modal/VideoModal';

function calculateDuration(updatedAtDate) {
  const currentDate = new Date();
  const differenceInMillis = currentDate - updatedAtDate;
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

const Video = () => {
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/v1/dashboard/videos');
        setVideos(response.data.message);
        console.log(response.data.message[0]._id);
        dispatch(videoActions.getvideo(response.data.message));
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchData();
  }, []);

  if (!videos || videos.length === 0) {
    return (
      <div className='flex justify-center content-center items-center w-full h-full my-32 lg:mx-60 md:mx-32 max-h-5 '>
                 <div class="videoloader"></div>
      </div>
    )
  }

  const handleVideoError = (error, videoIndex) => {
    console.error(`Error playing video ${videoIndex}:`, error);
    // You can handle the error here, e.g., show an error message or take other actions
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 md:gap-2 '>
      {videos.map((video, index) => (
        <div key={index} className='w-full lg:w-96 md:w-60 relative h-60 rounded-lg mb-32 px-5 md:px-0 lg:px-0 '>
          <video src={video.videoFile} controls alt="video" className='w-full h-60 rounded-lg my-4 cursor-pointer'
                 onError={(error) => handleVideoError(error, index)}></video>
          <div className='flex gap-2'>
            <div>
              <img src={video.ownerAvatar} alt="ownerAvatar" className='w-12 rounded-full h-12' />
            </div>
            <div>
              <h2>{video.title}</h2>
              <p className='text-gray-600 text-xs lg:text-md md:text-sm'>{video.description}</p>
              <div className='flex gap-2 content-center items-center mb-1'>
                <p className='text-gray-400 text-xs lg:text-md md:text-sm'>{video.views} views </p> 
                <p className='text-gray-400 text-xs lg:text-md md:text-sm'>.{calculateDuration(new Date(video.updatedAt))}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Video;
