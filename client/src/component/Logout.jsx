import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginActions } from '../store/Login.slice';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogout = async () => {
        const token = localStorage.getItem("accessToken");
        console.log(token);
    
        try {
            await axios.post("/v1/user/logout", null, { 
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(loginActions.Logout('')); 
            toast.success("Logout successful!", {
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
            console.error('Error logging out:', error);
            toast.error(error.response.data.message || "logout failed. Please try again.", {
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
    
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user_id");
        navigate("/login");
    }; 

    return (
        <>
            <ToastContainer />
            <h1 onClick={handleLogout} className='cursor-pointer bg-red-700 px-3 py-2 rounded-lg text-white text-sm font-semibold'>Logout</h1>
        </>
    );
};

export default Logout;
