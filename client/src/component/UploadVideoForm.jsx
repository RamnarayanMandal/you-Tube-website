import React, { useState } from 'react';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Checkbox } from "@material-tailwind/react";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function UploadVideoForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    isPublished: true,
    videoFile: null,
    owner: localStorage.getItem('user_id') || "", // Retrieve owner from localStorage
  });

  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      videoFile: file
    }));
  };

  const handleCheckboxChange = () => {
    setFormData(prevState => ({
      ...prevState,
      isPublished: !prevState.isPublished
    }));
  };

  const handleOnsubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true while waiting for response
    const token = localStorage.getItem('accessToken');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('thumbnail', formData.thumbnail);
      formDataToSend.append('isPublished', formData.isPublished);
      formDataToSend.append('owner', formData.owner);
      formDataToSend.append('videoFile', formData.videoFile);

      const response = await axios.post('/v1/videos/', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      toast.success("Video uploaded successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setFormData({
        title: "",
        description: "",
        thumbnail: "",
        isPublished: true,
        videoFile: null,
        owner: localStorage.getItem('user_id') || "",
      });


    } catch (error) {
      console.error('Error uploading video:', error);
      toast.error(`Error uploading video plz try agin`, {
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
            <Typography variant="h4" color="blue-gray" className="text-center">
              Upload Video
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleOnsubmit}>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Title
                </Typography>
                <Input
                  size="lg"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Thumbnail
                </Typography>
                <Input
                  size="lg"
                  type="text"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Description
                </Typography>
                <Input
                  type="text"
                  size="lg"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Video
                </Typography>
                <div className="flex items-center space-x-4">
                  <Input
                    size="lg"
                    type="file"
                    placeholder=""
                    id="videoInput"
                    onChange={handleFileChange}
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 border "
                  />
                </div>
              </div>
              <Checkbox
                id="isPublicCheckbox"
                label="Public"
                ripple={true}
                checked={formData.isPublished}
                onChange={handleCheckboxChange}
              />
              <Checkbox
                id="isPrivateCheckbox"
                label="Private"
                ripple={true}
                checked={!formData.isPublished}
                onChange={handleCheckboxChange}
              />
              <Button type="submit" className="mt-6" fullWidth disabled={isLoading}>
                Upload
              </Button>
            </form>
          </>
        )}
      </Card>

    </>
  );
}
