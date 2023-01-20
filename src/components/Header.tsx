import React, { useEffect } from 'react'
import { FaRobot } from "react-icons/fa"
import { BiMenu } from "react-icons/bi"
import { useAppContext } from '../contexts/appContext';
import { useLocation } from 'react-router-dom';
import { notification } from 'antd';

type Props = {
  title: string
}

function Header({ title }: Props) {
  const { sidebar, setSidebar, model, setModel } = useAppContext();

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

  const models = [
    { value: "text-davinci-001", title: "Модел 1" },
    { value: "text-davinci-002", title: "Модел 2" },
    { value: "text-davinci-003", title: "Модел 3" }
  ];

  return (
    <div className='h-[50px] select-none px-2 bg-gray-900 shadow-xl'>
      <ul className='flex justify-between items-center h-[50px]'>
        <li className='md:hidden'>
          <BiMenu color='#ccc' size={26} onClick={() => setSidebar(!sidebar)} className={sidebar ? "hidden" : "block"} />
        </li>
        <li>
          <select value={model} onChange={handleChange} className={`bg-gray-800 outline-none p-2 rounded-md text-white ${location.pathname === "/" ? "block" : "hidden"}`}>
            {
              models.map((model: any) => (
                <option value={model.value} key={model.value}>{model.title}</option>
              ))
            }
          </select>

        </li>
        <li className={`flex gap-2 items-end text-sm`}>
          <p className='text-[#ccc] text-lg'>{title}</p>
          <FaRobot size={30} color="#ccc" />
        </li>
      </ul>

    </div>
  )
}

export default Header