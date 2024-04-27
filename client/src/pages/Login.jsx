import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/Login.slice";

function Login() {
  const dispatch = useDispatch();
  const [logininfo, setLogininfo] = useState([]);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post("/v1/user/login", { email, password });
      console.log(response.data);
      setLogininfo(response.data);
      localStorage.setItem("accessToken", response.data.message.accessToken);
      localStorage.setItem("refreshToken", response.data.message.refreshToken);
      dispatch(loginActions.LoginData({ loginData: response.data }));
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 px-4 ">
      <div className="w-full md:w-1/2 lg:w-2/3 xl:w-3/4 2xl:w-4/5">
        <img
          src="https://dev.whitewizard.in/images/log2.jpg"
          alt="Login"
          className="w-full h-auto"
        />
      </div>

      <div className="bg-white p-8 md:p-8 lg:p-10 xl:p-12 2xl:p-16 rounded-lg shadow-md w-full max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mb-4 md:mb-0 mx-4">
        <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold mb-4 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="h-full">
          <div className="mb-2 sm:mb-4 md:mb-6 lg:mb-8">
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="mt-1 p-2 w-full border rounded-md text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
              placeholder="Enter your email"
              ref={emailRef}
              required
            />
          </div>
          <div className="mb-2 sm:mb-4 md:mb-6 lg:mb-8">
            <label
              htmlFor="password"
              className="block text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
              placeholder="Enter your password"
              ref={passwordRef}
              required
            />
          </div>
          <div className="mb-4 text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl"
            >
              Login
            </button>
          </div>
          <div className="text-center text-gray-600 text-sm ">
            <Link
              to="/forgot-password"
              className=" text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
            >
              Forgot Password?
            </Link>
            <div className="my-1">
              <Link to="/signup">Create new Account?</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
