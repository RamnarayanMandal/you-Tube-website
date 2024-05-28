import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
export function UpdateCoverImage() {
    const [open, setOpen] = useState(false);
    const [coverImage, setCoverImage] = useState(null);
  
    const handleOpen = () => setOpen(!open);
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setCoverImage(file);
    };
  
    const handleSubmit =async () => {
      if (!coverImage) {
        toast.error('Please select an image for your avatar.');
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append('coverImage', coverImage);
  
        const response = await axios.patch("/v1/user/cover-image", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
  
        toast.success('coverImage updated successfully');
  
        setOpen(false);
      } catch (error) {
        console.log(error);
        toast.error('Failed to update coverImage. Please try again.');
      }
    };
  
 
  return (
    <>  <ToastContainer />
      <Button onClick={handleOpen} className="bg-green-400">
       Updater Cover Image
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Updater Cover Image</DialogHeader>
        <DialogBody>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />
          {coverImage && (
            <img
              src={URL.createObjectURL(coverImage)}
              alt="Avatar Preview"
              className="max-w-full h-auto mb-4"
            />
          )}
         
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}