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

export function UpdateAccount() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
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
      const response= await axios.patch("/v1/user/update-account",
      formData,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
       
      })
      toast.success('Account updateed  sucessfully', {
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
      toast.error('Account updatee does not change plz try agin', {
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
      <Button onClick={handleOpen} className="bg-purple-400">
        Update Account
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Update Account</DialogHeader>
        <DialogBody>
          <div className="flex flex-col space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
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
