import React, { useState, useEffect } from "react";
import { NavBar } from "../NavBar";
import SideBar from "../SideBar";
import coverImage from "../../assets/coverImg.png";
import { useSelector } from "react-redux";
import { FaFacebookSquare, FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { ChangePasswordModal } from "../../module/ChangePasswordModel";
import { UpdateAccount } from "../../module/UpdateAccount";
import { UpdateAvatar } from "../../module/UpdateAvatar";
import { UpdateCoverImage } from "../../module/UpdateCoverImage";


const SettingHomePage = () => {
  const { loginData } = useSelector((store) => store.login);
  const [userInfo, setUserInfo] = useState(null);


  useEffect(() => {
    if (loginData && loginData.message && loginData.message.user) {
      setUserInfo(loginData.message.user);
    }
  }, [loginData]);

  return (
    <>
      <div className="fixed w-full bg-white shadow-sm z-50 top-0">
        <NavBar />
      </div>
      <div className="flex gap-4 w-full h-full mt-40">
        <div className="hidden lg:block md:block w-64">
          <SideBar />
        </div>
        <div className="w-full">
          <div className="relative">
            <img
              src={userInfo?.coverImage || coverImage}
              alt="User Cover"
              className="h-60 w-full object-cover rounded-lg"
            />
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-10">
              <img
                src={userInfo?.avatar || "https://docs.material-tailwind.com/img/team-3.jpg"}
                alt="User Avatar"
                className="h-40 w-40 rounded-full border-4 border-white"
              />
            </div>
          </div>
          <div className="lg:flex block px-10 py-6 justify-start items-center content-center text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full mt-">
            <div className="relative mx-4 my-4 overflow-hidden text-gray-700 lg:w-1/2 w-full">
              <h1 className="lg:text-4xl text-3xl font-bold text-blue-gray-900">
                {userInfo ? userInfo.fullName : "Natalie Paisley"}
              </h1>
              <p className="text-xl font-semibold text-blue-gray-700">
                {userInfo ? userInfo.email : "natalie@example.com"}
              </p>
              <p className="text-xl font-semibold text-blue-gray-700">
                {userInfo ? userInfo.username : "nataliep"}
              </p>
              <div className="flex justify-start p-6 pt-2 gap-7 lg:w-1/2 w-full text-4xl">
                <a
                  href="#facebook"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaFacebookSquare />
                </a>
                <a
                  href="#instagram"
                  className="text-purple-600 hover:text-purple-800"
                >
                  <RiInstagramFill />
                </a>
                <a href="#twitter" className="text-blue-400 hover:text-blue-600">
                  <FaTwitter />
                </a>
              </div>
            </div>
          </div>
          {/* Buttons to open modals */}
          <div className="flex justify-center space-x-4 mt-4 flex-wrap gap-2 ">
            <ChangePasswordModal />
            <UpdateAccount />
            <UpdateAvatar/>
            <UpdateCoverImage/>
            
           
            
          </div>
          
         
        </div>
      </div>
    </>
  );
};

export default SettingHomePage;
