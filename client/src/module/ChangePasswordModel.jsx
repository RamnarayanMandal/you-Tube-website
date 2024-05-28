import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ChangePasswordModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confPassword: "",
  });

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async() => {
    try {
      const response=await axios.post("/v1/user/change-password",
      formData,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
       
      })
      toast.success('password is change sucessfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

      setOpen(false);
    } catch (error) {

      console.log(error);
      toast.error('password does not change plz try agin', {
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
  };

  return (
    <>
    <ToastContainer />
      <Button onClick={handleOpen} className="bg-cyan-700">
        Change Password
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Change Password</DialogHeader>
        <DialogBody>
          <div className="flex flex-col space-y-4">
            <input
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              value={formData.oldPassword}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              name="confPassword"
              placeholder="Confirm Password"
              value={formData.confPassword}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
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
