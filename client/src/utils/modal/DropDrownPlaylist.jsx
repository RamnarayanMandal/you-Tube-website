import React from "react";
import {
  Button,
  Dialog,
} from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { List, ListItem, Card } from "@material-tailwind/react";
import { RiPlayList2Fill } from "react-icons/ri";
import { LuHistory } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { IoMdShareAlt } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

export function DropDrownPlaylist() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        onClick={handleOpen}
        className="bg-white shadow-none hover:shadow-none "
      >
        <BsThreeDotsVertical className="text-black text-xl " />
      </Button>
      <Dialog open={open} handler={handleOpen} className="w-full">
        <Card className=" shadow-none hover:shadow-none ">
          <List>
            <ListItem className=" gap-5">
              <RiPlayList2Fill className="text-2xl" />
              view full playlist
            </ListItem>
            <ListItem className=" gap-5">
              {" "}
              <FaEdit className="text-2xl" />
               Edit playlist
            </ListItem>
            <ListItem className=" gap-5">
              {" "}
              <MdDelete  className="text-2xl" />
              Delete Playlist
            </ListItem>
            <ListItem className=" gap-5">
              {" "}
              <IoMdShareAlt className="text-2xl" />
              Share
            </ListItem>
          </List>
        </Card>
      </Dialog>
    </>
  );
}
