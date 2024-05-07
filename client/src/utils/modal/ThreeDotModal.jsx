import React from "react";
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
import { IoMdShareAlt } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { UserUploadedVideoActions } from "../../store/getUserUploadedVideo.slice";



export function ThreeDotModal({videoId}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
 
  const token = localStorage.getItem("accessToken");
  const dispatch = useDispatch();

  const handleDelete = () => {
    try {
      const res = axios.delete(`/v1/videos/${videoId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      dispatch(UserUploadedVideoActions.deleteVideo({video:res.data.message}));
      if(!res.statusCode==200) {
        toast.success("Video is deleted successful!",  {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
         
          });
      }
      setOpen(!open)
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error("Error while deleting video, please try again", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
    }

    
  }

  return (
    <>
     <ToastContainer />
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
              <IoMdShareAlt className="text-2xl" />
              Share
            </ListItem>
            <ListItem className=" gap-5" onClick={handleDelete}>
              {" "}
              <MdDelete  className="text-2xl" />
              Delete video
            </ListItem>
          </List>
        </Card>
      </Dialog>
    </>
  );
}
