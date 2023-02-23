import React, { useContext } from 'react'
import { MdOutlineClose } from "react-icons/md"
import { NavLink } from "react-router-dom";
import { DarkModeToggle } from "react-dark-mode-toggle-2";
import { Image } from 'antd';
import { AppContext } from '../context/AppContext';



function SideBar() {
  const { sidebar, setSidebar, isDark, setMode } = useContext(AppContext)


  const activeLink = "flex animation-all bg-secondBg duration-300 shadow-xl items-center py-3 px-5 text-white text-md rounded-full my-4";
  const normalLink = "flex animation-all duration-300 shadow-xl items-center py-3 px-5 dark:bg-secondDarkBg text-md text-white rounded-full dark:text-mainDarkText dark:hover:bg-main-dark-bg hover:bg-secondBg my-4";

  return (
    <div className={`flex flex-row z-50 select-none duration-100 w-full md:w-auto fixed   ${sidebar ? "left-0" : " md:left-0 left-[-100%]"}`}>
      <div className='shadow-xl flex flex-col z-10  bg-mainBg dark:bg-mainDarkBg p-4 h-screen w-[280px] md:w-[350px]'>
        <div className='flex justify-between mb-5'>
          <div className='flex gap-2 items-center text-sm'>
            <Image preview={false} height={50} width={50} className="rounded-full object-cover" src='https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg' />
            <p className='font-bold text-primary md:text-xl'>Тэмүүжин</p>
          </div>
          <MdOutlineClose onClick={() => setSidebar(false)} className="md:hidden text-white dark:text-mainDarkText h-10 w-10 p-2 rounded-full shadow-lg" />
        </div>
        <div className='flex flex-col justify-between flex-[1]'>
          <div>
            <NavLink
              to={`/`}
              className={({ isActive }) =>
                isActive ? activeLink : normalLink
              }
            >
              Галерей
            </NavLink>
            <NavLink
              to={`/bot`}
              className={({ isActive }) =>
                isActive ? activeLink : normalLink
              }
            >
              Бот
            </NavLink>
            <NavLink
              to={`/image-generate`}
              className={({ isActive }) =>
                isActive ? activeLink : normalLink
              }
            >
              Зураг үүсгэх
            </NavLink>
            <DarkModeToggle
              onChange={() => setMode(isDark ? "Light" : "Dark")}
              isDarkMode={isDark}
              size={70}
            />

          </div>
          <a href='https://www.facebook.com/profile.php?id=100034295059325' className='text-white dark:text-mainDarkText underline text-center'> created by  temuujin</a>
        </div>
      </div>
      <div className="left-0 top-0 w-full h-screen bg-black/50 absolute animate-none" onClick={() => setSidebar(false)}>
      </div>
    </div>
  )
}

export default SideBar