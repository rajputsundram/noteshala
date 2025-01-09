'use client'
import React, { useState } from 'react'
import Typewriter from 'typewriter-effect';
import Image from 'next/image';
import { GrNotes } from "react-icons/gr";
import { FaPaperPlane } from "react-icons/fa6";
import { IoBookSharp } from "react-icons/io5";
import { FaJava } from "react-icons/fa";
import Link from 'next/link';

function BcaCtis() {
  const [year,setYear]=useState("first");
  const Cards = [
    {
      department:"bca-ctis",
      resources:"notes",
      year:"first",
      path: 'notes',
      icons: <GrNotes />,
      title: 'Notes',
      descrip: 'Lorem ipsum dolor sit amet.'
    },
    {
      
      department:"bca-ctis",
      resources:"notes",
      year:"first",
      path: 'previousyearpaper',
      category: "First Year",
      icons: <FaPaperPlane/>,
      title: 'Previous Paper',
      descrip: ''
    },
    {
      department:"bca-ctis",
      resources:"notes",
      year:"first",
      path: 'syllabus',
      category: "First Year",
      icons: <IoBookSharp/>,
      title: 'Syllabus',
      descrip: ''
    },
    {
      department:"bca-ctis",
      resources:"notes",
      year:"first",
      path: 'tutorial',
      icons: <FaJava/>,
      title: 'Tutorials',
      descrip: ''
    }
  ];

  return (
   
    <>
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row mt-20 px-4 lg:px-0">
        {/* Text Section */}
        <div className="lg:w-1/2 flex items-center justify-center lg:justify-end">
          <div className="h-[300px] w-full lg:w-[70%] flex items-center">
            <h1 className="text-blue-950 dark:text-white font-mono font-bold text-[30px] md:text-[40px] text-center lg:text-left">
              Welcome! Here You Can
              <div className="flex flex-wrap justify-center lg:justify-start">
                <h1 className="">Get </h1>
                <span className="text-green-500 ml-2">
                  <Typewriter
                    options={{
                      strings: ['Notes', "Previous Year Papers", "Notices", "Time Tables"],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </span>
              </div>
            </h1>
          </div>
        </div>
        {/* Image Section */}
        <div className="flex justify-center items-center mt-6 lg:mt-0">
          <Image
            src={'/images/BCACtis.jpg'}
            width={600}
            height={100}
            alt="BCA CTIS"
            className="rounded-lg w-full max-w-[600px] object-cover"
          />
        </div>
      </div>

      {/* Filter Year Section */}
      <div className="flex flex-col items-center lg:items-start lg:ml-[230px] mt-10">
        <div className="flex space-x-6">
         
            <button
              
              onClick={()=>setYear('first')} className={year==="first"?" bg-green-600 text-white h-[40px] w-[110px] rounded-full text-lg font-medium  shadow-lg ":'hover:shadow-green-600 h-[40px] w-[110px] rounded-full hover:bg-green-600 hover:text-white text-black bg-white'}>First year
            </button>
            <button
              
              onClick={()=>setYear('second')} className={year==="second"?" bg-green-600 text-white h-[40px] w-[110px] rounded-full text-lg font-medium  shadow-lg ":'hover:shadow-green-600 h-[40px] w-[110px] rounded-full hover:bg-green-600 hover:text-white text-black bg-white '}>Second year
            </button>
            <button
              
              onClick={()=>setYear('third')} className={year==="third"?" bg-green-600 text-white h-[40px] w-[110px] rounded-full text-lg font-medium  shadow-lg ":'hover:shadow-green-600 h-[40px] w-[110px] rounded-full hover:bg-green-600 hover:text-white text-black bg-white '}>Third year
            </button>
           
     
        </div>
        <div className="bg-white h-[1px] mt-6 w-full max-w-[73%] lg:w-[73%]"></div>
      </div>

      {/* Card Section */}
      <div className="flex flex-wrap justify-center items-center mt-10 px-4">
        {Cards.map((items, index) => (
          <Link href={`./${items.path}/${items.department}/${year}`}
            key={index}
            className="h-[160px] w-full max-w-[300px] text-white flex justify-center items-center text-center flex-col shadow-lg hover:shadow-green-400 rounded-lg bg-green-700 m-2"
          >
            {/* Icon Section */}

          
            <div className="text-[40px]" >{items.icons}</div>
            <h1 className="text-lg font-bold my-3">{items.title}</h1>
            <p className="text-lg">{items.descrip}</p>
            </Link>
        
         
        ))}
      </div>
    </>
  );
}

export default BcaCtis;
