'use client'
import React from 'react'
import Typewriter from 'typewriter-effect';
import Image from 'next/image';
import { GrNotes } from "react-icons/gr";
import { FaPaperPlane } from "react-icons/fa6";
import { IoBookSharp } from "react-icons/io5";
import { FaJava } from "react-icons/fa";

function BcaCtis() {

  const Cards=[
    {
      icons:<GrNotes/>,
      title:'Notes',
      descrip:'Lorem ipsum dolor sit amet.'
      

    }
    ,
    {
      icons:<FaPaperPlane/>,
      title:'Previous Paper',
      descrip:''

    }
    ,
    {
      icons:<IoBookSharp/>,
      title:'Syllabus',
      descrip:''

    },
    {
      icons:<FaJava/>,
      title:'Java',
      descrip:''

    },
    {
      icons:<GrNotes/>,
      title:'',
      descrip:''

    }
    
    ,
    {
      icons:<GrNotes/>,
      title:'',
      descrip:''

    }
    
    ,
    {
      icons:<GrNotes/>,
      title:'',
      descrip:''

    }
    
    ,
    {
      icons:<GrNotes/>,
      title:'',
      descrip:''

    }
    ,
   
    
  ]
  return (
    <>


    <div className='flex mt-20'>

{/* text section */}
      <div className=' h-auto w-[50%] items-center justify-end flex  '>
        <div className='  h-[300px] w-[70%] flex items-center'>
          <h1 className=' text-blue-950 dark:text-white font-mono font-bold text-[40px] '>Welcome! Here You Can 
            <div className='flex  '>
            <h1 className=''>Get </h1>
        
          <span className='text-green-500 ml-6' >
              <Typewriter
      options={{
        strings: ['Notes',"Previous Year Papers","Notices","Time Tables"],
        autoStart: true,
        loop: true,
      }}
    /></span>
    </div>
    </h1>
          </div>

      </div>
{/* image section */}
      <div className='flex justify-center items-center'>
        <Image src={'/images/BCACtis.jpg'}  width={600} height={100} alt='' className='rounded-lg'></Image>
      </div>

   </div>


   {/* card Section */}


   <div className='h-[700px]  flex justify-center items-center'>

    <div className='grid grid-flow-col grid-rows-2 grid-col-2  '>
      {
        Cards.map((items,index)=>{
          return(
            <>
            <div className='h-[160px] w-[300px] text-white flex justify-center items-center text-center flex-col shadow-lg hover:shadow-green-400  rounded-lg  bg-green-700 m-2 my-14' >

{/* icons sec */}
<div className='text-[40px]'>{items.icons}</div>
<h1 className='text-lg font-bold my-3'>{items.title}</h1>
<p className='text-lg'>{items.descrip}</p>


            </div>
            </>
          )

        })
         
        
      }
    </div>

    
   </div>

</>
  )
}

export default BcaCtis