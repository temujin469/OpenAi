import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Chat from './components/Chat'
import ImageGenerate from './components/ImageGenerate';
import Layout from './components/Layout';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout />
      ),
      children: [
        {
          path: "/",
          element: <Chat />
        },
        {
          path: "/image-generate",
          element: <ImageGenerate />
        }
      ]
    },
  ]);
  return (
    <RouterProvider router={router} />
  )

}

export default App