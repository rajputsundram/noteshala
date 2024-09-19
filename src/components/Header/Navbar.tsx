'use client'

import Link from "next/link"
import { FaLock } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import {  usePathname } from 'next/navigation';
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useTheme } from 'next-themes';

const Navbar=()=>{
    const pathname=usePathname();

    const links=[
        {name:"Home",path:"/" },
        {name:"About",path:"/About" },
        {name:"Departments",path:"/Departments" },
        {name:"Blogs",path:"/Blogs" },
        {name:"Contact us",path:"/ContactUs" },


       
    ]
    const {theme,setTheme}=useTheme();
    return(<>
  
    <div className="flex h-32 items-center  justify-between">

  {/* logo */}

  <Link href={""} className="flex justify-center items-center w-64">
  <p className="text-red font-extrabold text-[40px]">Noteshala</p>

  </Link>

    {/* nav links */}

    <nav className='flex gap-8'>
      {
        links.map((link,index)=>{
          return<Link href={link.path} key={index} className={`${link.path===pathname && "text-green-500 border-b-2 border-green-500"} capitalize font-medium hover:text-green-500 transition all`}>{link.name}</Link>
        })
      }
    </nav>

{/* login sign up buttons */}
    <div className="mr-[100px] flex gap-4">
        <div className="w-[80px] gap-1 border border-green-800 hover:bg-green-700  bg-green-500 p-1 flex text-white justify-center items-center h-[42px] rounded-[6px]">
            <FaLock/>
<Link href={"/login"} className="text-[16px]  font-medium ">Login</Link>
</div>    
 <div className="w-[80px] gap-1 border border-green-800 bg-green-500 hover:bg-green-700 text-white flex justify-center items-center h-[42px] p-1 rounded-[6px]">
    <FaUsers/>
<Link href={"signup"} className="text-[16px]  font-medium">Signup</Link>
</div>
<div>
<button onClick={()=>setTheme(theme==="dark"?"light":"dark")} className='text-white bg-black rounded-full p-1 dark:text-black dark:bg-white  flex items-center '>
  <MdOutlineLightMode/>
  /
<MdOutlineDarkMode/>
</button>
</div>

    </div>

    </div>
  
    </>)
}

export default Navbar;