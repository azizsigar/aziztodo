import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './companents/login/Login';
import Signup from './companents/signup/Signup';
import Post from './companents/post/Post';
import Profile from './companents/profile/profile';
import Favorites from './companents/favorites/Favorites';
import MyPosts from './companents/myPosts/MyPosts';
import { ToastContainer } from 'react-toastify';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/post',
        element: <Post />
      },
      {
        path: '/profile',
        element: <Profile />,
        children: [
          {
            path: '/profile/my-posts',
            element: <MyPosts />
          },
          {
            path: '/profile/favorites',
            element: <Favorites />
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
