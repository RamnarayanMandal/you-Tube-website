import React, { useEffect, useState } from "react";
import { NavBar } from "../NavBar";
import SideBar from "../SideBar";
import { Link, useParams } from "react-router-dom";
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
  const [showAllComments, setShowAllComments] = useState(false);
  const [like, setLike] = useState([]);
  const [checkSubscriber, setCheckSubscriber] = useState([]);
  const [getSubscriber, setGetSubscriber] = useState();
  const initialCommentCount = 2;
  

  const token = localStorage.getItem("accessToken");
  const user_id = localStorage.getItem("user_id");
  const dispatch = useDispatch();
  const { loginData } = useSelector((store) => store.login);
  const { video } = useSelector((store) => store.video);
  const avatar = loginData?.message?.user?.avatar;

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
  }, [videoId, token]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.patch(`/v1/user/${videoId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Add Watch history"+ res);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [owner, token]);

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
  }, [owner, token]);

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
  }, [videoId, token, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/v1/subscriptions/checkSubscriber/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCheckSubscriber(response.data);
      } catch (error) {
        console.error("Error fetching checkSubscriber:", error);
      }
    };

    fetchData();
  }, [user_id, token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/v1/subscriptions/c/${videos.video.owner}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGetSubscriber(response.data);
      } catch (error) {
        console.error("Error fetching subscriber:", error);
      }
    };

    fetchData();
  }, [user_id, token]);

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

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `/v1/like/toggle/v/${videoId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
      setLike(response.data.message);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const subscribed = async () => {
    try {
      const response = await axios.post(
        `/v1/subscriptions/c/${user_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
      setCheckSubscriber(response.data.message);
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  return (
    <>
      <div className="fixed w-full bg-white shadow-sm z-50 top-0">
        <NavBar />
      </div>
      <div className=" lg:flex md:flex block   w-full h-full mt-32">
        <div className="hidden lg:block md:block w-52">
          <SideBar />
        </div>
        <div className="lg:w-1/2 h-full md:w-1/2 w-full lg:ml-10 md:ml-10 ">
          <div className="px-2 lg:px-0 md:px-0">
            <video
              src={videos?.video?.videoFile}
              controls
              className="w-full h-11/12 rounded-lg mb-2"
            ></video>
            <h1 className="lg:text-3xl md:text-xl text-base font-semibold">
              {videos?.video?.title} || {videos?.video?.description}
            </h1>
            <div className="flex justify-between gap-2 items-center content-center mt-2">
              <div className="flex justify-start gap-2 items-center content-center">
                <Link
                  to={`/channel/${user?.username}/${user?._id}`}
                  className=" flex gap-2 content-center items-center"
                >
                  {user?.avatar ? (
                    <img
                      src={user?.avatar}
                      alt="avatar"
                      className="lg:w-12 lg:h-12 md:w-12 md:h-12 w-10 h-10 rounded-full "
                    />
                  ) : (
                    <RxAvatar className="lg:w-12 lg:h-12 md:w-12 md:h-12 w-10 h-10 rounded-full " />
                  )}
                </Link>
                <div>
                  <h1 className="lg:text-lg md:text-base text-sm ">
                    {user?.username}
                  </h1>
                  <p className="text-xs text-gray-400">
                    {getSubscriber?.data[0]?.subscriberCount} subscribers
                  </p>
                </div>
                <div onClick={subscribed}>
                  {checkSubscriber?.data?.length!=0? (
                    <button className="lg:text-lg md:text-base text-sm bg-gray-900  text-white px-4 py-2 rounded-full">
                      Subscribed
                    </button>
                  ) : (
                    <button className="lg:text-lg md:text-base text-sm  bg-blue-600 text-white px-4 py-2 rounded-full">
                      Subscribe
                    </button>
                  )}
                </div>
              </div>
              <div className="flex justify-start content-center items-center gap-2 lg:text-3xl md:text-xl text-base">
                <div className="flex justify-start content-center items-center gap-4 bg-gray-200 px-4 py-2 rounded-full">
                  <AiOutlineLike onClick={handleLike} />
                  <p className="lg:text-xl text-sm">{videos?.totalLikes}</p>
                  <p className="lg:text-xl text-sm">|</p>
                  <BiDislike />
                </div>
                <div className="lg:flex justify-start content-center items-center gap-4 bg-gray-200 px-4 py-2 rounded-full md:flex hidden">
                  <PiShareFatLight />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-2 items-center content-center mt-2">
            <div className="bg-gray-200 w-full rounded-lg px-5 py-2 ">
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
          {/* comment box */}
          <div className="mt-4">
            <p className="text-xl font-semibold my-4">
              {videos?.totalComments} Comments
            </p>
            <div className="flex justify-start content-center items-center gap-5 w-full">
              <img
                src={avatar}
                alt="avatar"
                className="w-12 h-12 rounded-full"
              />
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
            {/* Display comments */}
            {Comments.slice(
              0,
              showAllComments ? Comments.length : initialCommentCount
            ).map((comment) => (
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
            {/* Show more button */}
            {!showAllComments && Comments.length > initialCommentCount && (
              <button
                className="text-blue-500 my-2 px-5 font-semibold text-xl"
                onClick={() => setShowAllComments(true)}
              >
                Show more
              </button>
            )}
            {showAllComments && Comments.length > initialCommentCount && (
              <button
                className="text-blue-500 my-2 px-5 font-semibold text-xl"
                onClick={() => setShowAllComments(false)}
              >
                Show less
              </button>
            )}
          </div>
        </div>
        <div className="lg:w-1/3 h-full md:w-1/2 w-full px-10">
          {video?.map((videos) => (
            <div key={videos._id} className=" mb-4">
              <video
                src={videos?.videoFile}
                controls
                className="w-full h-11/12 rounded-lg mb-2"
              ></video>
              <div>
                <div className="flex gap-2 my-4 ">
                  <Link to={`/video/${videos._id}/${videos.owner}`}>
                    <img
                      src={videos.ownerAvatar}
                      alt="avatar"
                      className="w-14 h-14 rounded-full"
                    />
                  </Link>

                  <div>
                    <h1 className="lg:text-2xl md:text-2xl text-xl font-serif font-semibold ">
                      {videos.title}
                    </h1>

                    <p className="text-gray-400 text-lg lg:text-xl md:text-2xl ">
                      {videos.description}
                    </p>

                    <div className="flex lg:gap-5 md:gap-4 gap-2 content-center items-center ">
                      <p className="text-gray-400 text-xs lg:text-xl md:text-sm">
                        {videos.views} views{" "}
                      </p>
                      <p className="text-gray-400 text-xs lg:text-xl md:text-sm">
                        {calculateDuration(new Date(videos.updatedAt))}
                      </p>
                    </div>
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

export default GetvideoByID;
