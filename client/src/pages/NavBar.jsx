import React from "react";
import {
  Navbar,
  Input,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaYoutube } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { RiVideoUploadFill } from "react-icons/ri";
import { IoIosContact } from "react-icons/io";
import { SideBarModule } from "../module/sideBar.module";
import { useSelector } from "react-redux";
import { UploadVideoModel } from "../utils/modal/UploadVideoModal";
import { Link } from "react-router-dom";
import Logout from "../component/Logout";

export function NavBar() {
  const { loginData } = useSelector((store) => store.login);
  // console.log(loginData);
  const [openNav, setOpenNav] = React.useState(false);

  // Check if loginData and its nested properties exist
  const avatarUrl = loginData?.message?.user?.avatar;
  const email = loginData?.message?.user?.email;

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-3 py-10 font-medium text-2xl"
      >
        
        {avatarUrl ? (
           <UploadVideoModel/>
         
        ) : (
         
          <Link to="/login">
          <UploadVideoModel/>
          </Link>

        )}
        <IoIosNotifications />
        <div className="flex gap-2 text-sm content-center items-center ">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
         
        ) : (
          <IoIosContact className="text-2xl" />

        )}
       {
        loginData?(<Logout/> ):( <Link to={'/login'} className="cursor-pointer bg-green-700  px-3 py-2 rounded-lg text-white text-sm font-semibold">Login</Link>)
       }
       
        </div>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-full px-4 py-2 lg:px-8 lg:py-2 shadow-none  bg-white lg:h-28 md:h-20 h-32">
      <div className="container mx-auto flex flex-wrap items-center justify-between text-blue-gray-900 ">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1 font-medium flex gap-1 items-center content-center"
        >
          <SideBarModule />
          <FaYoutube className="text-red-500 text-3xl" />
          <p className="font-bold text-xl">YouTude</p>
        </Typography>
        <div className="flex w-full md:w-max items-center gap-x-2">
          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              placeholder="Search"
              containerProps={{
                className: "min-w-[200px] lg:min-w-[400px]",
              }}
              className=""
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <div className="!absolute left-3 top-[13px]">
              <svg
                width="13"
                height="14"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Your SVG path here */}
              </svg>
            </div>
          </div>
          <Button size="md" className="rounded-lg min-w-min-10">
            Search
          </Button>
        </div>
        <div className="lg:block hidden">{navList}</div>
      </div>
    </Navbar>
  );
}
