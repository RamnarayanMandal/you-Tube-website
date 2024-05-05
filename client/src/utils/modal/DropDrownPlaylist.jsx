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
import { Link } from "react-router-dom";
import { IoMdCreate } from "react-icons/io";
import { CreatePlaylistModal } from "./CreatePlaylistModal";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { UserPlaylistActions } from "../../store/userPlaylistSlice";

export function DropDrownPlaylist({playlistId,playlistName}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const token = localStorage.getItem("accessToken");
  const { loginData } = useSelector((store) => store.login);
  const dispatch = useDispatch();
  //  console.log('DropDrownPlaylist',playlistId)
  const handleDelete = async()=>{
    try {
      const res = await axios.delete(`/v1/playlist/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.message);
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

  const handleSharePlaylist = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this playlist!",
          text: `Enjoy this playlist "${playlistName}" by ${loginData.message.user.fullName}`,
          url: window.location.href, // You can replace this with the actual URL of your playlist
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback for browsers that do not support Web Share API
      alert("Sorry, sharing is not supported on this browser.");
    }
  };

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
            <ListItem className=" gap-5" style={{ textTransform: "uppercase" }}>
              <RiPlayList2Fill className="text-2xl" />
              <Link to={`/viewfullplaylist/${playlistId}`}>VIEW FULL PLAYLIST</Link>
            </ListItem>
            
            <ListItem className=" gap-5" style={{ textTransform: "uppercase" }}>
              {" "}
             <CreatePlaylistModal action="Create playlist" />
              
            </ListItem>
            <ListItem className=" gap-5" style={{ textTransform: "uppercase" }}>
              {" "}
              <CreatePlaylistModal action="Update playlist" />
            </ListItem>
            <ListItem className=" gap-5" style={{ textTransform: "uppercase" }} onClick={handleDelete}>
              {" "}
              <MdDelete  className="text-2xl"  />
              DELETE PLAYLIST
            </ListItem>
            <ListItem className=" gap-5" style={{ textTransform: "uppercase" }} onClick={handleSharePlaylist}>
              {" "}
              <IoMdShareAlt className="text-2xl" />
              SHARE 
            </ListItem>
          </List>
        </Card>
      </Dialog>
    </>
  );
}
