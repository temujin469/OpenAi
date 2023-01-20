import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Chat from './components/Chat'
import ImageGenerate from './components/ImageGenerate';
import Layout from './components/Layout';


function App() {

  const [isFullscreen, setIsFullscreen] = React.useState(false);

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    document.addEventListener('fullscreenchange', onFullscreenChange);

    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);
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