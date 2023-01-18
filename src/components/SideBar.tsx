import React from 'react'
import { useAppContext } from '../contexts/appContext';
import { AiOutlineClose } from "react-icons/ai"
import { FaRobot } from "react-icons/fa"
import { NavLink } from "react-router-dom";


function SideBar() {
  const { setModel, sidebar, setSidebar, model } = useAppContext();

  // const { data: models, isLoading, error } = useQuery(['models'], async () => {
  //   const { data: response } = await baseUrl.get('/models');
  //   return response.models.data;
  // })

  const models = [
    { value: "text-davinci-001", title: "Модел 1" },
    { value: "text-davinci-002", title: "Модел 2" },
    { value: "text-davinci-003", title: "Модел 3" }
  ];

  const activeLink =
    "flex items-center p-3 text-gray-900 text-md my-3";
  const normalLink =
    "flex items-center p-3 bg-gray-800 bg- text-md text-gray-700  dark:text-gray-200 dark:hover:bg-main-dark-bg hover:bg-light-gray my-3";

  return (
    <div className={`h-screen select-none duration-100 border-r border-gray-500 fixed w-[300px] bg-gray-900 z-50 shadow-xl p-4 ${sidebar ? "left-0" : "left-[-100%]"}`}>
      <div className='flex justify-between mb-5'>
        <div className='flex gap-2 items-end text-sm'>
          <FaRobot size={30} color="#ccc" />
          <p className='text-[#ccc]'>Хиймэл оюун ухаан</p>
        </div>
        <AiOutlineClose color='#ccc' size={26} onClick={() => setSidebar(false)} />
      </div>
      <div>
        <h3 className='text-lg text-[#ccc] mb-2 '>AI Моделууд</h3>
        <select className='bg-gray-800 w-full text-[#ccc] outline-none h-[50px] px-2' value={model} onChange={(e) => setModel(e.target.value)}>
          {/* {
            isLoading ? (
              <p>Хайж байна...</p>
            ) : !error && (
              models.map((model: any) => (
                <option disabled={true} value={model.id} key={model.id}>{model.id}</option>
              ))
            )
          }
           */}
          {
            models.map((model: any) => (
              <option value={model.value} key={model.value}>{model.title}</option>
            ))
          }
        </select>
        <div>
          <NavLink
            to={`/`}
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#ccc" : "",
            })}
            onClick={() => setSidebar(false)}

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
            onClick={() => setSidebar(false)}
            className={({ isActive }) =>
              isActive ? activeLink : normalLink
            }
          >
            Зураг үүсгэх
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default SideBar