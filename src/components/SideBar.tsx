import React from 'react'
import { useAppContext } from '../contexts/appContext';
import { AiOutlineClose } from "react-icons/ai"
import { FaRobot } from "react-icons/fa"
import { NavLink } from "react-router-dom";



function SideBar() {
  const { sidebar, setSidebar } = useAppContext();

  // const { data: models, isLoading, error } = useQuery(['models'], async () => {
  //   const { data: response } = await baseUrl.get('/models');
  //   return response.models.data;
  // })



  const activeLink = "flex items-center p-3 text-gray-900 text-md rounded-md my-4";
  const normalLink = "flex items-center p-3 bg-gray-800 bg- text-md text-gray-700 rounded-md  dark:text-gray-200 dark:hover:bg-main-dark-bg hover:bg-light-gray my-4";

  return (
    <div className={`flex flex-row select-none duration-100 w-full fixed   ${sidebar ? "left-0" : " md:left-0 left-[-100%]"}`}>
      <div className='shadow-xl   z-50 bg-gray-900 p-4 h-screen w-[260px] md:w-[350px] border-r border-gray-800'>
        <div className='flex justify-between mb-5'>
          <div className='flex gap-2 items-end text-sm'>
            <FaRobot size={30} color="#ccc" />
            <p className='text-[#ccc]'>Хиймэл оюун ухаан</p>
          </div>
          <AiOutlineClose color='#ccc' size={26} onClick={() => setSidebar(false)} className="md:hidden" />
        </div>
        <div>
          <div>
            <NavLink
              to={`/`}
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#ccc" : "",
              })}

              className={({ isActive }) =>
                isActive ? activeLink : normalLink
              }
            >
              Бот
            </NavLink>
            <NavLink
              to={`/image-generate`}
              style={({ isActive }) => ({
                backgroundColor: isActive ? "#ccc" : "",
              })}
              className={({ isActive }) =>
                isActive ? activeLink : normalLink
              }
            >
              Зураг үүсгэх
            </NavLink>

          </div>
        </div>
      </div>
      <div className="left-0 top-0 w-full h-screen bg-black/50 absolute md:hidden animate-none" onClick={() => setSidebar(false)}>
      </div>
    </div>
  )
}

export default SideBar