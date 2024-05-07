import React from "react";
import {
  Button,
  Dialog,
} from "@material-tailwind/react";

import { RiVideoUploadFill } from "react-icons/ri";
import { UploadVideoForm } from "../../component/UploadVideoForm";



export function UploadVideoModel() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        onClick={handleOpen}
        className=" bg-white text-black shadow-none p-0 hover:shadow-none "
      >
        <RiVideoUploadFill className="text-3xl"/> 
      </Button>
      <Dialog open={open} handler={handleOpen} className="w-full flex justify-center items-center content-center p-10">
        <UploadVideoForm/>
      </Dialog>
    </>
  );
}
