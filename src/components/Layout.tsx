import React, { useEffect } from 'react'
import { useAppContext } from '../contexts/AppContext'
import SideBar from './SideBar'
import { Outlet } from "react-router-dom"

const Layout = () => {
  const { setMode, isDark } = useAppContext()

  useEffect(() => {
    const currentThemeMode = localStorage.getItem("themeMode");

    if (currentThemeMode) {
      setMode(currentThemeMode);
    }
  }, []);
  return (
    <div className={isDark ? "dark" : ""}>
      <SideBar />
      <div className={`md:ml-[350px] duration-100 relative`}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout