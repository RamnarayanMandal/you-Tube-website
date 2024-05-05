import React from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { List, ListItem, Card } from "@material-tailwind/react";
import { RiPlayList2Fill } from "react-icons/ri";
import { LuHistory } from "react-icons/lu";
import { MdPlaylistAdd } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";

import { MdDelete } from "react-icons/md";
import { MdEditNote } from "react-icons/md";

const ThreeDotModelPlaylist = () => {
    const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  
    return (
        <>
          <Button
            onClick={handleOpen}
            className="bg-white bg-opacity-15 shadow-none hover:shadow-none rounded-full px-2 py-1 "
          >
            <BsThreeDotsVertical className="text-white text-lg " />
          </Button>
          <Dialog open={open} handler={handleOpen} className="w-full">
            <Card className=" shadow-none hover:shadow-none ">
              <List>
                <ListItem className=" gap-5">
                  {" "}
                  <LuHistory className="text-2xl" />
                  Save to Watch later
                </ListItem>
                <ListItem className=" gap-5">
                  {" "}
                  <MdPlaylistAdd className="text-2xl" />
                  Save to playlist
                </ListItem>
                <ListItem className=" gap-5">
                  {" "}
                  <MdOutlineFileDownload className="text-2xl" />
                  Download
                </ListItem>
                <ListItem className=" gap-5">
                  {" "}
                  <MdDelete  className="text-2xl" />
                  Delete Playlist
                </ListItem>
              </List>
            </Card>
          </Dialog>
        </>
  )
}

export default ThreeDotModelPlaylist
