import React from 'react'
import Image from 'next/image'
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiViewList } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className='flex flex-col bg-slate-100 '>
     
      <div className='w-28 sm:w-80 h-[100vh] relative py-12 border border-gray-500 border-t-0'>
        <div className="w-[50%] sm:w-[80%] absolute right-0">
        <Link href={'/admin/addItems'} className='flex items-center border  gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#006400]'>
<span className='text-2xl'><IoIosAddCircleOutline/></span><p>Add Resources</p>
        </Link>

        <Link href={'/admin/listItems'} className='mt-5 flex items-center border  gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#006400]'>
      <span className='text-2xl'><CiViewList/></span><p>List Resources</p>
        </Link>
        

        </div>
       


      </div>
    </div>
  )
}

export default Sidebar
