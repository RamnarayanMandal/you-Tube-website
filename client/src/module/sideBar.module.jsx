import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { IoReorderThree } from "react-icons/io5";
import SideBar from "../pages/SideBar";
 
export function SideBarModule() {
  const [open, setOpen] = React.useState(false);
 
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
 
  return (
    <React.Fragment>
      <Button onClick={openDrawer} className="bg-white shadow-none hover:shadow-none  lg:hidden md:hidden block">
      <IoReorderThree className=" text-black text-4xl" />

      </Button>
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-between bg-white">
        </div>
        <Typography color="gray" className="mb-8 pr-4 font-normal bg-white">
         <SideBar/>
        </Typography>
      </Drawer>
    </React.Fragment>
  );
}