import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from "./pages/Login.jsx";
import SingUp from "./pages/Singup.jsx";
import App from './App.jsx';
import   '../src/index.css';
import {Provider} from 'react-redux';
import youtubestore from './store/index.js';
import YourChannel from './pages/userchannel/YourChannel.jsx';
import Dasbord from './pages/dashbord/Dasbord.jsx';




// Define your routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Dasbord /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SingUp /> },
      { path: '/channel', element: <YourChannel /> },
    
    ]
  }
]);

// Render the router using ReactDOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Provider store={youtubestore}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

