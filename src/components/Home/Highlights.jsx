import React from 'react'
import { AiOutlineNotification } from "react-icons/ai";
import { FaBlog } from "react-icons/fa";
import { GrWorkshop } from "react-icons/gr";
import Link from 'next/link';

const Highlights = () => {
  const Highlts = [
    { icons: <AiOutlineNotification />, name: "Notice",path: "/notice", descriptions: "Important updates and announcements for students to stay informed and engaged."  }, 
    { icons: <FaBlog />, name: "Blogs", path: "/Blogs", descriptions: "Engaging articles and insights to enhance learning, share knowledge, and inspire students." },
     { icons: <GrWorkshop />, name: "Clubs & Workshop", path: "/clubs&workshop", descriptions: "Opportunities for hands-on learning, skill development, and collaboration through clubs and workshops" }]
  return (

    <>

      <div className=' flex  sm:mt-0 mt-24 flex-col sm:h-[700px] h-[1000px] justify-center items-center '>
        <div className=' flex items-center h-44 sm:mb-4 mb-16'>
          <h1 className='text-gray-700 dark:text-white font-semibold  border-b-[4px] border-b-green-400   text-4xl'>Highlights</h1>
        </div>

        <div className=' flex justify-center gap-16 sm:gap-8 items-center flex-wrap'>
          {
            Highlts.map((items, index) => {
              return (<>
                <div key={index} className='h-[280px] w-[330px] gap-5 relative  flex flex-col p-6 justify-center items-center border border-gray-300'>
                  <div className='flex justify-center items-center bg-green-600 absolute text-white text-3xl rounded-sm h-12 w-16 mb-[270px] hover:text-green-600 hover:bg-white' key={index}>{items.icons}</div>
                  <h1 key={index} className='font-semibold text-xl'>{items.name}</h1>
                  <p key={index} className='text-center text-medium text-gray-400'>{items.descriptions}</p>
                  <Link href={items.path}>
                    <button key={index} className='bg-green-500 hover:bg-green-700 hover:underline h-11 text-white w-28 rounded'>Learn more</button>
                  </Link>


                </div>

              </>)

            })
          }
        </div>
      </div>
    </>
  )
}

export default Highlights
