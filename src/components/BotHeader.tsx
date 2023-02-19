import React from 'react'
import { FaRobot } from "react-icons/fa"
import { BiMenu } from "react-icons/bi"
import { useLocation } from 'react-router-dom';
import { notification } from 'antd';
import { useQuery } from 'react-query';
import baseUrl from '../utils/axios';
import { useAppContext } from '../contexts/AppContext';


function BotHeader() {
  const { sidebar, setSidebar, model, setModel } = useAppContext() as any;

  const location = useLocation();

  const handleChange = (e: any) => {

    setModel(e.target.value)
    notification.open({
      message: e.target.value,
      icon: <FaRobot />,
      className: "bg-gray-600 text-white",
      duration: 3,
      description:
        `${e.target.value === "text-davinci-003" ? '"text-davinci-003" модел нь код бичих болон орчуулга хийх чадвартай' : `Та яаг одоо "${e.target.value}" моделийг ашиглаж байна`
        }`,
    });
  }


  const { data: models, isLoading, error } = useQuery(['models'], async () => {
    const { data: response } = await baseUrl.get('/bot/models');
    return response.models.data;
  })

  // const availaleModels: string[] = ["davinci", "text-davinci-001", "text-davinci-002", "text-davinci-003"]


  return (
    <div className='h-[55px] select-none px-2 bg-mainBg dark:bg-mainDarkBg shadow-xl'>
      <ul className='flex justify-between items-center h-full'>
        <li className='md:hidden text-white dark:text-mainDarkText'>
          <BiMenu size={26} onClick={() => setSidebar(!sidebar)} className={sidebar ? "hidden" : "block"} />
        </li>
        <li>
          <select value={model} onChange={handleChange} className={`dark:bg-secondDarkBg bg-secondBg w-[200px] outline-none p-2 rounded-full dark:text-mainDarkText text-white ${location.pathname === "/bot" ? "block" : "hidden"}`}>
            {
              models?.map((model: any) => (
                <option value={model.id} key={model.id} > {model.id}</option>
              ))
            }
          </select>

        </li>
        <li className={`flex gap-2 items-end text-sm`}>
          {/* <p className=' text-lg font-bold'>{title}</p> */}
          <FaRobot size={30} className="text-primary" />
        </li>
      </ul>
    </div>
  )
}

export default BotHeader