import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

export function UpdatePlaylistForm() {
  const playlist = useSelector((store) => store.viewFullPlaylist);
  let playlistId = playlist._id;
  console.log(playlistId);
  const [formData, setFormData] = useState({
    name: playlist.name,
    description: playlist.description,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { name, description } = formData;
  
  const onChangeName = (e) =>
    setFormData({ ...formData, name: e.target.value }); // Separate onChange handler for name

  const onChangeDescription = (e) =>
    setFormData({ ...formData, description: e.target.value }); // Separate onChange handler for description
  
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.patch(
        `/v1/playlist/${playlistId}`, // Use backticks for string interpolation
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Playlist is updated successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error updating playlist:", error);
      toast.error("Error while updating playlist, please try again", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Card color="transparent" shadow={false}>
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          <>
            <Typography variant="h4" color="blue-gray text-center">
              Update Playlist
            </Typography>
            <form
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              onSubmit={onSubmit}
            >
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Playlist Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="Playlist Name"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="name"
                  value={name}
                  onChange={onChangeName} // Use onChangeName for name input
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Description
                </Typography>
                <Input
                  as="textarea"
                  size="lg"
                  placeholder="Description"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  name="description"
                  value={description}
                  onChange={onChangeDescription} // Use onChangeDescription for description input
                />
              </div>
              <Button className="mt-6" fullWidth type="submit">
                Submit
              </Button>
            </form>
          </>
        )}
      </Card>
    </>
  );
}
