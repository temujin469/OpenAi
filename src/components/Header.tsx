import React from 'react'
import { FaRobot } from "react-icons/fa"
import { BiMenu } from "react-icons/bi"
import { useAppContext } from '../contexts/appContext';

type Props = {
  title: string
}

function Header({ title }: Props) {
  const { sidebar, setSidebar } = useAppContext();
  return (
    <div className='h-[50px] fixed top-0 left-0 w-full select-none px-2 bg-gray-900 shadow-xl'>
      <ul className='flex justify-between items-center h-[50px]'>
        <li>
          <BiMenu color='#ccc' size={26} onClick={() => setSidebar(!sidebar)} className={sidebar ? "hidden" : "block"} />
        </li>
        <li className='flex gap-2 items-end text-sm'>
          <p className='text-[#ccc] text-lg'>{title}</p>
          <FaRobot size={30} color="#ccc" />
        </li>
      </ul>
    </div>
  )
}

export default Header