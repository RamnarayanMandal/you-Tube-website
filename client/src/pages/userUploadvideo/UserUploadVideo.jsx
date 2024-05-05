import React from 'react';
import { ThreeDotModal } from '../../utils/modal/ThreeDotModal';


function calculateDuration(updatedAtDate) {
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const differenceInMillis = currentDate - updatedAtDate;

  // Convert milliseconds to seconds
  const differenceInSeconds = Math.floor(differenceInMillis / 1000);

  // Convert seconds to minutes, hours, and days
  const minutes = Math.floor(differenceInSeconds / 60);
  const hours = Math.floor(differenceInSeconds / 3600);
  const days = Math.floor(differenceInSeconds / (3600 * 24));

  // Determine the appropriate time unit to display
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

const UserUploadVideo = ({ video }) => {
  // console.log('Uploading video', video);
  if (video.length === 0) {
    return (
      <div className='flex justify-center items-center content-center pt-20'>
        <h1 className='lg:text-4xl md:text-3xl font-bold text-red-400 overflow-hidden'>No videos</h1>
      </div>
    );
  }

  return (
    <div className='px-10'>
      <h1 className='lg:text-2xl md:text-2xl text-xl font-serif font-semibold my-4'>Uploads</h1>
      {video.map((videoItem) => (
        <div key={videoItem._id} className="mb-8 flex gap-4 lg:gap-10 md:gap-8 flex-wrap lg:flex-nowrap md:flex-nowrap">
          <div className='w-1/2 '>
            <video src={videoItem.videoFile} controls alt="video" className='w-full rounded'></video>
            {/* <p className='absolute bottom-5 right-2 text-white'>{(videoItem.duration/60).toFixed(2)}</p> */}
          </div>
          <div className='w-1/2 pt-2'>
            <h1 className='text-xl lg:text-3xl md:text-3xl font-semibold mb-1'>{videoItem.title}</h1>
            <p className='text-gray-400 text-lg lg:text-2xl md:text-2xl mb-1'>{videoItem.description}</p>
            <div className='flex lg:gap-5 md:gap-4 gap-2 content-center items-center mb-1'>
              <p className='text-gray-800 text-xs lg:text-xl md:text-sm'>{videoItem.views} views </p>
              <p className='text-gray-800 text-xs lg:text-xl md:text-sm'>{calculateDuration(new Date(videoItem.updatedAt))}</p>
              <p className='text-gray-800 text-xs lg:text-xl md:text-sm'>{(videoItem.duration/60).toFixed(2)} min</p> 
            </div> 
          </div>
          <div className='pt-5 cursor-pointer'>
         <ThreeDotModal/>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserUploadVideo;
