'use client'

import Link from "next/link"
import { FaLock } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { usePathname } from 'next/navigation';
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useTheme } from 'next-themes';
import Image from "next/image";
import { useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/About" },
    { name: "Departments", path: "/Departments" },
    { name: "Blogs", path: "/Blogs" },
    { name: "Contact us", path: "/ContactUs" },
  ];

  // const toggleDropdown = () => {
  //   setDropdownOpen(!dropdownOpen);
  // };

  return (
    <div className="flex h-32 items-center justify-between" onMouseLeave={()=>{ setDropdownOpen(false)}}>
      {/* Logo */}
      <Link href={"/"} className="flex justify-center items-center w-64">
        <div className="ml-9 flex text-red font-extrabold text-[40px] text-blue-950 dark:text-white">
          <Image src="/images/Pietlogo.png" width={40} height={10} alt="logo" />
          <p className="ml-2 font-serif">Noteshala</p>
        </div>
      </Link>

      {/* Nav Links */}
      <nav className='flex gap-8'>
        {links.map((link, index) => {
          if (link.name === "Departments") {
            // The link that will have a dropdown menu
            return (
              <div className='relative' key={index} onMouseEnter={()=>setDropdownOpen(true)} onClick={()=>setDropdownOpen(false)} >
                <Link  href={link.path} className={`${link.path === pathname && "text-green-500 border-b-2 border-green-500"} capitalize font-medium hover:text-green-500 transition-all`}>
                  {link.name}
                </Link>
                {dropdownOpen && (
                  <div  onMouseEnter={()=>setDropdownOpen(true)} onMouseLeave={()=>setDropdownOpen(false)} className='absolute left-0 mt-2 w-52 rounded-sm text-lg bg-white border border-gray-200 shadow-lg'>
                    <Link href='/bcactis' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>BCA-CTIS</Link>
                    <Link href='/bca' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>BCA-GEN</Link>
                    <Link href='/bcads' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>BCA-DS</Link>
                    <Link href='/mca' className='block px-4 py-2 text-gray-800 hover:bg-gray-200'>MCA</Link>
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <Link   href={link.path} key={index} className={`${link.path === pathname && "text-green-500 border-b-2 border-green-500"} capitalize font-medium hover:text-green-500 transition-all`}>
                {link.name}
              </Link>
            );
          }
        })}
      </nav>

      {/* Login and Signup buttons */}
      <div className="mr-[100px] flex gap-4">
        <div className="w-[80px] gap-1 border border-green-800 hover:bg-green-700 bg-green-500 p-1 flex text-white justify-center items-center h-[42px] rounded-[6px]">
          <FaLock />
          <Link href={"/login"} className="text-[16px] font-medium">Login</Link>
        </div>
        <div className="w-[80px] gap-1 border border-green-800 bg-green-500 hover:bg-green-700 text-white flex justify-center items-center h-[42px] p-1 rounded-[6px]">
          <FaUsers />
          <Link href={"/signup"} className="text-[16px] font-medium">Signup</Link>
        </div>
        <div>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className='text-white bg-black rounded-full p-1 dark:text-black dark:bg-white flex items-center'>
            <MdOutlineLightMode />
            /
            <MdOutlineDarkMode />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
