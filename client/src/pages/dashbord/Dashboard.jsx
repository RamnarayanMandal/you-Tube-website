import React, { useEffect, useState } from "react";
import { NavBar } from "../NavBar";
import SideBar from "../SideBar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { videoActions } from "../../store/getAllvideo.slice";

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("/v1/dashboard/videos");
        setVideos(res.data.message);
        console.log(res.data.message);
        dispatch(videoActions.getvideo({video: res.data.message}))
      } catch (error) {
        console.log(error);
      }
    };

    fetchVideos();
  }, []);
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
      <div className="flex gap-4 w-full h-full mt-32 ">
        <div className="hidden lg:block md:block w-64">
          <SideBar />
        </div>
        <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 grid-flow-col-1 lg:ml-0 md:ml-20 ">
          {videos.map((video, index) => (
            <div className="w-full lg:px-0 md:px-0 px-10 " key={index}>
              <div>
                <video
                  src={video.videoFile}
                  controls
                  className="lg:w-96 md:w-72 w-full rounded-lg"
                ></video>
              </div>

              <div className="flex gap-2 my-4 ">
                <Link to={`/video/${video._id}/${video.owner}`}>
                  <img src={video.ownerAvatar} alt="avatar"  className="w-14 h-14 rounded-full"/>
                </Link>

                <div>
                <h1 className="lg:text-2xl md:text-2xl text-xl font-serif font-semibold ">
                  {video.title}
                </h1>

                <p className="text-gray-400 text-lg lg:text-xl md:text-2xl ">
                  {video.description}
                </p>

                <div className="flex lg:gap-5 md:gap-4 gap-2 content-center items-center ">
                  <p className="text-gray-400 text-xs lg:text-xl md:text-sm">
                    {video.views} views{" "}
                  </p>
                  <p className="text-gray-400 text-xs lg:text-xl md:text-sm">
                    {calculateDuration(new Date(video.updatedAt))}
                  </p>
                  <p className="text-gray-400 text-xs lg:text-xl md:text-sm">
                    {(video.duration / 60).toFixed(2)} min
                  </p>
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
