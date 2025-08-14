'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from "next/link"
// import {CiMenuFries} from 'react-icons/ci'

const links = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'departments', path: '/departments' },
  { name: 'blogs', path: '/Blogs' },
  { name: 'contact', path: '/contactus' },
]

function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="">
      <div className="flex mb-6 mt-1 text-center justify-center items-center">
        <div className="flex justify-center items-center">
          {/* <CiMenuFries className='mx-10 text-[32px]' /> */}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col">
        <nav className="flex flex-col justify-center items-center gap-6">
          {links.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              className={`${pathname.startsWith(link.path) ? "border-b-2 border-blue-800" : ""} text-xl capitalize hover:text-blue-800 transition-all duration-500`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Login / Sign Up buttons */}
        <div className="flex flex-col items-center gap-4 mt-6">
          <Link
            href="/login"
            className="px-6 py-2 border border-green-800 text-white rounded-lg hover:bg-green-800  transition-all duration-500"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-900 transition-all duration-500"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MobileNav
