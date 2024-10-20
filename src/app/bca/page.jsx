'use client'
import React from 'react'
import Typewriter from 'typewriter-effect';
import Image from 'next/image';
import { GrNotes } from "react-icons/gr";
import { FaPaperPlane } from "react-icons/fa6";
import { IoBookSharp } from "react-icons/io5";
import { FaJava } from "react-icons/fa";

function Bca() {

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
        <Image src={'/images/BCAGen.jpg'}  width={600} height={100} alt='' className='rounded-lg'></Image>
      </div>

   </div>


{/* filter year */}

<div className=' justify-start  '>
  <div className='flex justify-start items-end space-x-9 ml-[230px]  h-28'>
    <div>
      <button className='hover:bg-green-600 hover:text-white bg-white h-[40px] w-[110px] rounded-full text-lg font-medium text-green-800 hover:shadow-green-600 shadow-lg '>First Year</button>
      </div>
    <div><button className='bg-white h-[40px] hover:bg-green-600 hover:text-white w-[110px] max-w-[200px] rounded-full text-lg font-medium text-green-600 hover:shadow-green-600 shadow-lg '>Second Year</button></div>
    <div><button className='bg-white h-[40px] hover:bg-green-600 hover:text-white w-[110px] rounded-full text-lg font-medium hover:shadow-green-600 shadow-lg  text-green-600'>Third Year</button></div>
  </div>

  <div className='bg-white h-[1px] mt-6  w-[73%] ml-[230px]'></div>
</div>


   {/* card Section */}


   <div className='h-[600px]  flex justify-center items-center'>

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

export default Bca