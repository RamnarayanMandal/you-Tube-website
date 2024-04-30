import React from 'react';

const Video = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 md:gap-2'>
       <div className='w-full md:w-72 lg:w-96 h-60 bg-black rounded-lg my-4'></div>
       <div className='w-full md:w-72 lg:w-96 h-60 bg-black rounded-lg my-4'></div>
       <div className='w-full md:w-72 lg:w-96 h-60 bg-black rounded-lg my-4'></div>
       <div className='w-full md:w-72 lg:w-96 h-60 bg-black rounded-lg my-4'></div>
       <div className='w-full md:w-72 lg:w-96 h-60 bg-black rounded-lg my-4'></div>
       <div className='w-full md:w-72 lg:w-96 h-60 bg-black rounded-lg my-4'></div>
       <div className='w-full md:w-72 lg:w-96 h-60 bg-black rounded-lg my-4'></div>
       <div className='w-full md:w-72 lg:w-96 h-60 bg-red-500 rounded-lg my-4'></div>
    </div>
  );
}

export default Video;
