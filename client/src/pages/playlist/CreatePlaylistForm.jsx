import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { UserPlaylistActions} from "../../store/userPlaylistSlice";
   
export function CreatePlaylistForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const { name, description } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit =async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.post("/v1/playlist/",formData,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })
        console.log(response.data);
        setFormData(response.data.message);
        dispatch(UserPlaylistActions.adduserPlaylist(response.data.message));
        toast.success("Playlist is created successfully!", {
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
        console.error('Error uploading video:', error);
        toast.error(`Error while creating playlist plz try agin`, {
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
        setIsLoading(false); // Set loading to false after response or error
      }
    };
  

  return (
    <>
     <ToastContainer />
    <Card color="transparent" shadow={false}>
    {isLoading ? (<span class="loader"></span>) : (
        <>
      <Typography variant="h4" color="blue-gray text-center">
        Create Playlist
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={onSubmit}>
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
            onChange={onChange}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Description
          </Typography>
          <Input
            size="lg"
            type="text"
            placeholder="Description"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            name="description"
            value={description}
            onChange={onChange}
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
