import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import img from '../../src/assets/sideimg.png';
import axios from 'axios';

export default function Signup() {
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const avatarRef = useRef(null);
  const coverImageRef = useRef(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const responseMessageRef = useRef("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordsMatch) {
      const formData = new FormData();
      formData.append('username', `${firstNameRef.current.value + lastNameRef.current.value + Math.round(Math.random() * 1000)}`);
      formData.append('email', emailRef.current.value);
      formData.append('fullName', `${firstNameRef.current.value} ${lastNameRef.current.value}`);
      formData.append('avatar', avatarRef.current.files[0]);
      formData.append('coverImage', coverImageRef.current.files[0]);
      formData.append('password', passwordRef.current.value);

      try {
        const response = await axios.post('/v1/user/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        responseMessageRef.current = response.data.message; // Store response message
        navigate("/");
      } catch (error) {
        console.error("Registration failed:", error);
        responseMessageRef.current = "Registration failed. Please try again."; // Set error message
      }
    }
  };

  const handlePasswordChange = () => {
    setPasswordsMatch(passwordRef.current.value === confirmPasswordRef.current.value);
  };

  return (
    <div className="flex flex-col lg:flex-row mx-auto p-10 rounded w-full gap-10 bg-slate-100 ">
      <div className="lg:w-1/2 lg:flex block">
        <img
          className="rounded-r h-full object-cover"
          src={img}
          alt=""
        />
      </div>
      <div className="w-full lg:w-1/3 p-4 lg:px-10 py-5  overflow-hidden bg-white rounded h-1/2 shadow-xl">
        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up 
        </h2>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              ref={firstNameRef}
              required
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-solid py-1 px-4"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              ref={lastNameRef}
              required
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-solid py-1 px-4"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <input
              id="email"
              type="email"
              ref={emailRef}
              required
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-solid py-1 px-4"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="avatar" className="block text-sm font-medium leading-6 text-gray-900">
              Avatar 
            </label>
            <input
              id="avatar"
              type="file"
              name="avatar"
              ref={avatarRef}
              accept="image/png, image/gif, image/jpeg"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="coverImage" className="block text-sm font-medium leading-6 text-gray-900">
              Cover Image 
            </label>
            <input
              id="coverImage"
              type="file"
              name="coverImage"
              ref={coverImageRef}
              accept="image/png, image/gif, image/jpeg"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <input
              id="password"
              type="password"
              ref={passwordRef}
              required
              onChange={handlePasswordChange}
              className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-solid py-1 px-4"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              ref={confirmPasswordRef}
              required
              onChange={handlePasswordChange}
              className={`block w-full mt-1 rounded-md border ${passwordsMatch ? "border-gray-300" : "border-red-500"} shadow-sm focus:border-indigo-600 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border border-solid py-1 px-4`}
            />
            {!passwordsMatch && (
              <p className="mt-2 text-sm text-red-500">Passwords do not match.</p>
            )}
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
        {responseMessageRef.current && (
          <div className="mt-4 text-sm text-gray-700">{responseMessageRef.current}</div>
        )}
      </div>
    </div>
  );
}
