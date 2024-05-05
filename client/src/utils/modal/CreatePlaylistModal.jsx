import React from "react";
import {
  Button,
  Dialog,
} from "@material-tailwind/react";

import { FaEdit } from "react-icons/fa";
import {CreatePlaylistForm} from '../../pages/playlist/CreatePlaylistForm'
import { UpdatePlaylistForm } from "../../pages/playlist/UpdatePlaylistForm";






export function CreatePlaylistModal({action}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        onClick={handleOpen}
        className=" bg-white bg-opacity-5 text-black shadow-none p-0 hover:shadow-none flex items-center gap-5 "
      >
        <FaEdit className="text-xl"/> 
        <p className=" font-thin text-base">{action}</p>
      </Button>
      <Dialog open={open} handler={handleOpen} className="w-full flex justify-center items-center content-center p-10">
        {
          action === "Create playlist"? (
            <CreatePlaylistForm />
          ) : (
            <UpdatePlaylistForm/>
          )
        }
      </Dialog>
    </>
  );
}
