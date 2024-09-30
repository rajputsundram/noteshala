'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { GoLinkExternal } from "react-icons/go";

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BCACtis from "@/../../public/images/BCACtis.jpg"
import BCADS from "@/../../public/images/BCADS.jpg"
import BCAGen from "@/../../public/images/BCAGen.jpg"
import MCA from "@/../../public/images/MCA.jpg"



const CarouselComponents = () => {
  const Allimages=[{images:BCACtis,name:"BCA_CTIS",path:'/bcactis '},{images: BCADS,name:"BCA-DS",path:'/ bcads'},{images:BCAGen,name:"BCA-GEN.",path:'/ bca'},{images:MCA,name:"MCA",path:'/mca'},]
  return (
   <Carousel
     autoPlay
      infiniteLoop 
      emulateTouch
      showThumbs={false}
      axis='horizontal'
      showStatus={false}>

        {
        Allimages.map((imglink)=>{
          return(
            <>
            <div className='relative'>
<div className='object-center  brightness-100' style={{maxHeight:"39rem"}}>
  <div className='flex justify-center absolute  bg-transparent text-visible  z-50 items-center text-green-600 h-full w-full'>
    <div className=' rounded  h-80 flex flex-col justify-center items-center w-72 bg-opacity-30 bg-white text-green-950 hover:bg-green-800 transition-all duration-800 ease-out hover:text-white'>
    <h1 className='text-5xl font-bold pb-4'>{imglink.name}</h1>
    <Link href={imglink.path}>
    <button className='bg-green-500 flex justify-center items-center gap-2  hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full'>visit now <GoLinkExternal/></button>
    
    </Link>
   
    </div>
  </div>
  <div className='h-full w-full'>

  <Image 
                  src={imglink.images} 
                  alt={imglink.name} 
                  layout="responsive" 
                  width={700} 
                  height={475} 
                  className='object-cover' 
                />
  </div>

</div>
</div>
</>
          )
        })
        }



   </Carousel>
  )
}

export default CarouselComponents
