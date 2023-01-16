import React from 'react'
import { useAppContext } from '../contexts/appContext'
import SideBar from './SideBar'
import { Outlet } from "react-router-dom"

const Layout = () => {
  const { sidebar } = useAppContext()
  return (
    <div className='bg-gray-900'>
      <SideBar />
      <div className={`duration-100 ${sidebar && "md:ml-[300px]"}`}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout