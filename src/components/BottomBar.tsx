import React from 'react'
import { NavLink } from 'react-router-dom'
import { HiOutlineNewspaper, HiOutlineDocumentAdd } from "react-icons/hi"


const activeLink = "bg-mainBg dark:bg-mainDarkBg flex flex-col items-center text-primary text-sm rounded-full w-20 h-20 p-5"
const normalLink = "text-white w-20 flex flex-col items-center text-sm"

function BottomBar() {
  return (
    <div className='bottom-0 md:hidden fixed h-[55px] w-full bg-mainBg dark:bg-mainDarkBg'>
      <div className='h-full flex items-center justify-around'>
        <NavLink to="/" className={({ isActive }) => isActive ? activeLink : normalLink} >
          <HiOutlineNewspaper className='text-xl' />
          <p >Нийтлэл</p>
        </NavLink>
        <NavLink to="/create-post" className={({ isActive }) => isActive ? activeLink : normalLink} >
          <HiOutlineDocumentAdd className='text-xl' />
          <p>үүсгэх</p>
        </NavLink>
      </div>
    </div>
  )
}

export default BottomBar