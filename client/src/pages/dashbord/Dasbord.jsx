import React from "react";
import { NavBar } from "../NavBar";
import SideBar from "../SideBar";
import Video from "../../component/video";

const Dasbord = () => {
  return (
    <div>
     <div className="fixed w-full bg-white shadow-md top-0 "> 
     <NavBar  />
     </div>
      <div className="lg:flex md:flex gap-4 w-full h-full">
        <div className="hidden lg:block md:block w-64 absoute z-50">
          <SideBar />
        </div>
        <div className="p-5 relative -z-10 mt-32  ">
          <Video />
        </div>
        </div>
      </div>
  );
};

export default Dasbord;
