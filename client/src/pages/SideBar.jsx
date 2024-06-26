import React from "react";
import { FaHome } from "react-icons/fa";
import { SiYoutubeshorts } from "react-icons/si";

import { IoIosSend } from "react-icons/io";
import { IoIosContact } from "react-icons/io";
import { LuHistory } from "react-icons/lu";
import { RiPlayList2Fill } from "react-icons/ri";
import { AiOutlineLike } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";

import { IoLogIn } from "react-icons/io5";
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginActions } from "../store/Login.slice";
import { UploadVideoModel } from "../utils/modal/UploadVideoModal";
import { IoSettings } from "react-icons/io5";
const SideBar = () => {
  const {loginData} = useSelector((store)=> store.login)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = loginData?.message?.user?.username.toLowerCase();
  const id = loginData?.message?.user?._id;
  // console.log(id);
  const handleLogout = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await axios.post("/v1/user/logout",
      { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      
    );
    dispatch(loginActions.Logout(null));
    toast.success("Logout successful!",  {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
     
      });

    } catch (error) {
      console.error('Error logging out:', error);
      toast.error(error.response.data.message || "logout failed. Please try again.",{
        position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      }
      );
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user_id");

  };

  return (
    <>
    <ToastContainer />
    <div className="w-60 overflow-y-auto fixed top-28"
    style={{
      maxHeight: "calc(100vh - 64px)", 
    }}>
      <div className="text-3xl px-5  bg-white ">
        <Link to="/" className="my-4 flex gap-4 justify-start items-center content-center hover:bg-blue-gray-50  px-4 rounded-lg">
          <FaHome className="my-1 " />
          <p className="text-sm">Home</p>
        </Link>
        <div className="my-4 flex gap-4 justify-start items-center content-center hover:bg-blue-gray-50  px-4 rounded-lg">
          <SiYoutubeshorts className="my-1 " />
          <p className="text-sm">Shorts</p>
        </div>

        <hr />
        <div className="my-4 flex gap-1 justify-start items-center content-center hover:bg-blue-gray-50  px-4 rounded-lg">
          {/* <PiYoutubeLogoFill className="my-1 " /> */}
          <p className="text-lg  font-bold">You</p>
          <IoIosArrowForward className="text-lg" />
        </div>
        <div className="flex justify-center content-center items-center">
          <div className="text-3xl ">
          {!loginData?(<Link  
            to="/login" className="my-4 flex gap-4 justify-start items-center content-center hover:bg-blue-gray-50  px-4 rounded-lg">
              <IoIosContact className="my-1 " />
              <p className="text-sm">Your Channel </p>
            </Link>):(
              <Link 
              to={`/channel/${username}/${id}`} className="my-4 flex gap-4 justify-start items-center content-center hover:bg-blue-gray-50  px-4 rounded-lg">
                <IoIosContact className="my-1 " />
                <p className="text-sm">Your Channel </p>
              </Link>
            )
}
            <div className="my-4 flex gap-4 justify-start items-center content-center hover:bg-blue-gray-50  px-4 rounded-lg">
              {
                !loginData?(<Link to="/login" className="flex justify-start items-center content-center gap-4">
                <LuHistory className="my-1 " />
                <p className="text-sm">History </p>
                </Link>):(<Link to="/history" className="flex justify-start items-center content-center gap-4">
                <LuHistory className="my-1 " />
                <p className="text-sm">History </p>
                </Link>)
              }
            </div>
            <div className="my-4 flex gap-4 justify-start items-center content-center hover:bg-blue-gray-50  px-4 rounded-lg">
              <Link to={`/playlist/${id}`} className="flex gap-4 justify-start items-center content-center"><RiPlayList2Fill className="my-1 " />
              <p className="text-sm">Playlist</p></Link>
            </div>
            <div className="my-4 flex gap-4 justify-start items-center content-center hover:bg-blue-gray-50  px-4 rounded-lg">
              {
                !loginData?(<Link to='/login' className="flex justify-start items-center content-center gap-4">
                <AiOutlineLike className="my-1 " />
                <p className="text-sm">Liked </p>
                </Link>):(<Link to='/likedVideo' className="flex justify-start items-center content-center gap-4">
                <AiOutlineLike className="my-1 " />
                <p className="text-sm">Liked </p>
                </Link>)
              }
            </div>
            {
              !loginData?(
                <Link to="/login" className="my-4 flex gap-4 justify-start items-center content-center hover:bg-blue-gray-50  px-4 py-2 rounded-lg">
              <UploadVideoModel className="my-1 "/>
              <p className="text-sm">Upload </p>
            </Link>
                
              ):(
                <div className="my-4 flex gap-4 justify-start items-center content-center hover:bg-blue-gray-50  px-4 py-2 rounded-lg">
              <UploadVideoModel className="my-1 "/>
              <p className="text-sm">Upload </p>
            </div>
              )
            }
    
          </div>
        </div>
        <hr />
        <div className="my-4 flex gap-4 justify-start items-center content-center hover:bg-blue-gray-50  px-4 rounded-lg">
          <IoIosSend className="my-1 " />
          <p className="text-sm">Tweet</p>
        </div>
        <div  className="my-4 flex gap-4 justify-start items-center content-center hover:bg-blue-gray-50  px-4 rounded-lg">
          
          <IoSettings  className="my-1 " />
          {
            loginData? (
              <Link to="/setting" className="text-sm cursor-pointer">Setting</Link>
            ) : (
              <Link to="/login" className="text-sm">Setting</Link>
            )
          }
        </div>
        <div  className="my-4 flex gap-4 justify-start items-center content-center hover:bg-blue-gray-50  px-4 rounded-lg">
          
          <IoLogIn className="my-1 " />
          {
            loginData? (
              <p className="text-sm cursor-pointer" onClick={handleLogout}>Logout</p>
            ) : (
              <Link to="/login" className="text-sm">Login </Link>
            )
          }
        </div>
        
       
      </div>
    </div>
    </>
  );
};

export default SideBar;
