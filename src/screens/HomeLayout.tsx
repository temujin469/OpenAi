import React from 'react'
import { Outlet } from 'react-router-dom'
import BottomBar from '../components/BottomBar'
import Header from '../components/Header'

function HomeLayout() {
  return (
    <div>
      <Header />
      <div className='h-[calc(100vh-110px)] md:h-[calc(100vh-55px)] py-8 overflow-y-scroll dark:bg-secondDarkBg px-5'>
        <Outlet />
      </div>
      <BottomBar />
    </div>
  )
}

export default HomeLayout