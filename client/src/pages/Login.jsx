import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 px-4"> {/* Added px-4 for left and right padding */}
      {/* Login Image Section */}
      <div className="w-full md:w-1/2 lg:w-2/3 xl:w-3/4 2xl:w-4/5">
        <img 
          src="https://dev.whitewizard.in/images/log2.jpg"  // replace with the path to your login image
          alt="Login"
          className="w-full h-auto"
        />
      </div>
      
      {/* Login Form Section */}
      <div className="bg-white p-4 md:p-8 lg:p-10 xl:p-12 2xl:p-16 rounded-lg shadow-md w-full max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mb-4 md:mb-0 mx-4"> {/* Added mx-4 for margin */}
        <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold mb-4 text-center">Login</h2> {/* Adjusted text sizes */}
        <form onSubmit={handleSubmit} className="h-full"> {/* Increased height of form */}
          <div className="mb-2 sm:mb-4 md:mb-6 lg:mb-8">
            <label htmlFor="username" className="block text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium text-gray-600 mb-1">Username / Email</label> {/* Added mb-1 */}
            <input
              type="text"
              id="username"
              className="mt-1 p-2 w-full border rounded-md text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
              placeholder="Enter your username/ email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-2 sm:mb-4 md:mb-6 lg:mb-8">
            <label htmlFor="password" className="block text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium text-gray-600 mb-1">Password</label> {/* Added mb-1 */}
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 text-center"> {/* Added text-center */}
            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl"> {/* Increased text size */}
              Login
            </button>
          </div>
          {/* Additional Links */}
          <div className="text-center text-gray-600">
            <a href="/forgot-password" className="mr-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">Forgot Password?</a> {/* Adjusted text size */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
