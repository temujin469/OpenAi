import React from 'react'
import { FaRobot } from "react-icons/fa"
import { BiMenu } from "react-icons/bi"
import { useAppContext } from '../contexts/AppContext';

function Header() {
  const { sidebar, setSidebar, model, setModel } = useAppContext() as any;


  return (
    <div className='h-[55px] select-none px-2 bg-mainBg dark:bg-mainDarkBg shadow-xl'>
      <ul className='flex justify-between items-center h-full'>
        <li className='md:hidden text-white dark:text-mainDarkText'>
          <BiMenu size={26} onClick={() => setSidebar(!sidebar)} className={sidebar ? "hidden" : "block"} />
        </li>
        {/* <li className={`flex gap-2 items-end text-sm`}>
          <Link to="create-post" className='text-white rounded-lg bg-primary p-2'>Зураг үүсгэх</Link>
        </li> */}
        <li className={`flex gap-2 items-end text-sm`}>
          <FaRobot size={30} className="text-primary" />
        </li>
      </ul>
    </div>
  )
}

export default Header