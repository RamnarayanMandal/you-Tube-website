import React from "react";
import { NavBar } from "../NavBar";
import SideBar from "../SideBar";
import Video from "../../component/video";

const Dasbord = () => {
  return (
    <div>
      <NavBar />
      <div className="lg:flex md:flex gap-4 w-full h-full">
        <div className="hidden lg:block md:block w-64">
          <SideBar />
        </div>
        <div className="p-5">
          <Video />
        </div>
        </div>
      </div>
  );
};

export default Dasbord;
