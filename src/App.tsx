import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import BotChat from './screens/BotChat'
import ImageGenerate from './screens/ImageGenerate';
import Layout from './components/Layout';
import Login from './screens/Login';
import Register from './screens/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './screens/Home';
import Friends from './screens/Friends';
import Chats from './screens/Chats';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/bot",
          element: <BotChat />
        },
        {
          path: "/image-generate",
          element: <ImageGenerate />
        },
        {
          path: "/",
          element: <Home />,
          children: [
            {
              path: "/",
              element: <Chats />
            },
            {
              path: "/friends",
              element: <Friends />
            },
          ]
        },

      ]
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },
  ]);
  return (
    <RouterProvider router={router} />
  )

}

export default App