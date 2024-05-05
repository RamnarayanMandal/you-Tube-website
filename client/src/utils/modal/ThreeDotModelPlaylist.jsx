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
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { UserPlaylistActions } from '../../store/userPlaylistSlice';
import { RiVideoAddFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

const ThreeDotModelPlaylist = ({playlistId}) => {
  const [open, setOpen] = React.useState(false);
  // console.log(playlistId)
  const handleOpen = () => setOpen(!open);
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");
  const handleDelete = async()=>{
    try {
      const res = await axios.delete(`/v1/playlist/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data.message);
     if( res.statusCode ==200){
      dispatch(UserPlaylistActions.deleteuserPlaylist(res.data.message))
       toast.success("Playlist deleted successfully!",  {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
     }
    } catch (error) {
      console.log(error);
      toast.error(`Error deleting playlist plz try agin`, {
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
                 <Link to={`/addVideoInPlaylist/${playlistId}`} className='flex gap-5 items-center content-center'>
                 <RiVideoAddFill className="text-2xl" />
                  Add video 
                 </Link>
                </ListItem>
                <ListItem className=" gap-5" onClick={handleDelete}>
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
