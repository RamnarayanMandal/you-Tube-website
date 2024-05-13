import React, { useEffect, useState } from "react";
import { NavBar } from "../NavBar";
import SideBar from "../SideBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";
import { PiShareFatLight } from "react-icons/pi";
import { Input } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { LuSend } from "react-icons/lu";
import { videoCommentActions } from "../../store/videoCommet.slice";

const GetvideoByID = () => {
  const { videoId, owner } = useParams();
  const [videos, setVideo] = useState();
  const [user, setUser] = useState();
  const [Comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");

  const token = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const { loginData } = useSelector((store) => store.login);
  const { video } = useSelector((store) => store.video);
  const avatar = loginData?.message?.user?.avatar;
  console.log(video);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/v1/videos/${videoId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVideo(res.data.message);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };
    fetchVideos();
  }, [videoId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/v1/user/c/${owner}`, {
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
  }, [owner]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/v1/comment/${videoId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(response.data.message)) {
          setComments(response.data.message);
          dispatch(
            videoCommentActions.getvideoComment({
              videoComment: response.data.message,
            })
          );
        } else {
          console.error("Invalid data format for Comments:", response.data);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchData();
  }, [videoId, token]);

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

  const PostComment = async () => {
    try {
      const response = await axios.post(
        `/v1/comment/${videoId}`,
        { comment: userComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (Array.isArray(response.data.message)) {
        setComments(response.data.message);
        dispatch(
          videoCommentActions.addComment({
            videoComment: response.data.message,
          })
        );
      } else {
        console.error("Invalid data format for Comments:", response.data);
      }
      setUserComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <>
      <div className="fixed w-full bg-white shadow-sm z-50 top-0">
        <NavBar />
      </div>
      <div className="flex gap-4 w-full h-full mt-32">
        <div className="hidden lg:block md:block w-64">
          <SideBar />
        </div>
        <div className="lg:w-1/2 h-full md:w-1/2 w-full px-5">
          <video
            src={videos?.video?.videoFile}
            controls
            className="w-full h-11/12 rounded-lg mb-2"
          ></video>
          <h1 className="lg:text-3xl md:text-xl text-base font-semibold">
            {videos?.video?.title} || {videos?.video?.description}
          </h1>
        </div>
      </div>
      <div className="flex justify-between gap-2 items-center content-center px-5 lg:ml-64 md:ml-64 lg:w-1/2 h-full md:w-1/2 w-full ">
        <div className=" flex gap-2 content-center items-center">
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt="avatar"
              className="lg:w-12 lg:h-12 md:w-12 md:h-12 w-10 h-10 rounded-full ml-2"
            />
          ) : (
            <RxAvatar className="lg:w-12 lg:h-12 md:w-12 md:h-12 w-10 h-10 rounded-full ml-2" />
          )}
          <div>
            <h1 className="lg:text-lg md:text-base text-sm ">
              {user?.username}
            </h1>
            <p className="text-xs text-gray-400">
              {user?.SubcriberCount} subscribers
            </p>
          </div>
          <div>
            <button className=" bg-black text-white lg:px-4 lg:py-2 lg:text-lg md:text-base text-sm rounded-full px-2 py-1 ">
              subscribe
            </button>
          </div>
        </div>
        <div className="flex justify-start content-center items-center gap-2 lg:text-3xl md:text-xl text-base">
          <div className="flex justify-start content-center items-center gap-4 bg-gray-200 px-4 py-2 rounded-full">
            <AiOutlineLike className=" " />
            <p className="lg:text-xl text-sm">102</p>
            <p className="lg:text-xl text-sm">|</p>
            <BiDislike />
          </div>
          <div className="lg:flex justify-start content-center items-center gap-4 bg-gray-200 px-4 py-2 rounded-full md:flex hidden">
            <PiShareFatLight />
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2 items-center content-center px-4 lg:ml-64 md:ml-64 lg:w-1/2 h-full md:w-1/2 w-full   my-2 rounded-lg">
        <div className="bg-gray-200 w-full rounded-lg px-5 py-2  ">
          <div className="flex content-center items-center gap-4">
            <p className=" text-sm font-semibold">
              {videos?.video.views} views
            </p>
            <p className=" text-xs font-semibold ">
              {calculateDuration(new Date(videos?.video.updatedAt))}
            </p>
          </div>
          <div>
            <p className="text-gray-700">
              {videos?.video.title} || {videos?.video.thumbnail}
            </p>
            <p className="text-gray-700">{videos?.video.description}</p>
          </div>
        </div>
      </div>
      <div className="px-6 lg:ml-64 md:ml-64 lg:w-1/2 h-full md:w-1/2 w-full rounded-lg">
        <p className="text-xl font-semibold my-2">
          {videos?.totalComments} Comments
        </p>
        {/* <hr className="my-2" /> */}
        <div className="w-72 flex justify-start content-center items-center gap-5">
          <img src={avatar} alt="avatar" className="w-12 h-12 rounded-full" />
          <Input
            label="Comment"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
          />
          <button className="text-2xl" onClick={PostComment}>
            <LuSend />
          </button>
        </div>
        <hr className="my-2" />
        {Comments?.map((comment) => (
          <div key={comment._id}>
            <div className="flex justify-start content-center items-center gap-5 my-2">
              <img
                src={comment.avatar}
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />{" "}
              <p className="text-gray-700">{comment.username}</p>
            </div>
            <div className="flex pl-20 content-center items-center gap-5 my-2">
              <p className="text-gray-700 text-base">{comment.comment}</p>
              <p className=" text-xs text-gray-800 ">
                {calculateDuration(new Date(comment.updatedAt))}
              </p>
            </div>
          </div>
        ))}
        {/* <div>
          <div>
            <video src={video.videoFile} controls></video>
          </div>
          <div></div>
        </div> */}
      </div>
    </>
  );
};

export default GetvideoByID;
