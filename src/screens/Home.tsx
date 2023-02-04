import React from 'react'
import { Outlet } from 'react-router-dom'
import BottomBar from '../components/BottomBar'
import Header from '../components/Header'

function Home() {
  return (
    <div>
      <Header />
      <div className='h-[calc(100vh-110px)] md:h-[calc(100vh-55px)] overflow-y-scroll dark:bg-secondDarkBg'>
        <Outlet />
      </div>
      <BottomBar />
    </div>
  )
}

export default Home