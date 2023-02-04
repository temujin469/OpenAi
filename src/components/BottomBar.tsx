import React from 'react'
import { NavLink } from 'react-router-dom'
import { BsFillChatDotsFill, BsFillPeopleFill } from "react-icons/bs"


const activeLink = "bg-mainBg dark:bg-mainDarkBg flex flex-col items-center text-primary text-sm rounded-full w-20 h-20 p-5"
const normalLink = "text-white w-20 flex flex-col items-center text-sm"

function BottomBar() {
  return (
    <div className='bottom-0 md:hidden fixed h-[55px] w-full bg-mainBg dark:bg-mainDarkBg'>
      <div className='h-full flex items-center justify-around'>
        <NavLink to="/" className={({ isActive }) => isActive ? activeLink : normalLink} >
          <BsFillChatDotsFill className='text-xl' />
          <p >Зурвас</p>
        </NavLink>
        <NavLink to="/friends" className={({ isActive }) => isActive ? activeLink : normalLink} >
          <BsFillPeopleFill className='text-xl' />
          <p>Найзууд</p>
        </NavLink>
      </div>
    </div>
  )
}

export default BottomBar