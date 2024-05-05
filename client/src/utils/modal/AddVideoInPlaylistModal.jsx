import React, { useState } from "react";
import {
  Button,
  DialogBody,
  DialogFooter,
  Dialog,
} from "@material-tailwind/react";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { UserPlaylistActions } from "../../store/userPlaylistSlice";
import { MdDelete } from "react-icons/md";

export function AddVideoInplaylistModal({ playlistId, videoId, action }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.patch(
        `/v1/playlist/${action}/${videoId}/${playlistId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data.message);
      if (response.status === 201||200) {
        dispatch(
          action === "add"
            ? UserPlaylistActions.addVideo(response.data.message)
            : UserPlaylistActions.removeVideo(response.data.message)
        );
        toast.success(`${action.charAt(0).toUpperCase() + action.slice(1)} successful!`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Error ${action.charAt(0).toUpperCase() + action.slice(1)}, please try again.`, {
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
  };

  return (
    <>
      <ToastContainer />
      <Button
        onClick={() => setOpen(true)}
        className={`rounded-full px-2 py-2 text-base ${
          action === "add" ? "bg-green-400" : "bg-red-400"
        }`}
      >
        {action === "add" ? <IoIosAddCircle /> : <MdDelete />}
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogBody>
          {action === "add" ? (
            <p className="text-xl">
              Would you like to add this video to the playlist?
            </p>
          ) : (
            <p className="text-xl">
              Are you sure you want to remove this video from the playlist?
            </p>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpen(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
