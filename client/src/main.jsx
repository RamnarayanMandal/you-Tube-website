import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from "./pages/Login.jsx";
import Dasbord from './pages/Dasbord.jsx';
import SingUp from "./pages/Singup.jsx";
import App from './App.jsx';
import   '../src/index.css';



// Define your routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Dasbord /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SingUp /> }
    ]
  }
]);

// Render the router using ReactDOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
    <RouterProvider router={router} />
  
  </React.StrictMode>
);

