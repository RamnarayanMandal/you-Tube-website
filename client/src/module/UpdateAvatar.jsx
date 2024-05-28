import React, { useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function UpdateAvatar() {
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleOpen = () => setOpen(!open);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async () => {
    if (!avatar) {
      toast.error('Please select an image for your avatar.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('avatar', avatar);

      const response = await axios.patch("/v1/user/avatar", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      toast.success('Avatar updated successfully');

      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error('Failed to update avatar. Please try again.');
    }
  };

  return (
    <>
      <ToastContainer />
      <Button onClick={handleOpen} className="bg-blue-400">
        Update Avatar
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Update Avatar</DialogHeader>
        <DialogBody>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4"
          />
          {avatar && (
            <img
              src={URL.createObjectURL(avatar)}
              alt="Avatar Preview"
              className="max-w-full h-auto mb-4 rounded-lg"
            />
          )}
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit} disabled={!avatar}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
