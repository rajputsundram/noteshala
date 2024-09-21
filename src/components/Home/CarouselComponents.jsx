'use client'
import React from 'react'
import Link from 'next/link';
import { GoLinkExternal } from "react-icons/go";


import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselComponents = () => {
  const images=[{images:'https://www.thehighereducationreview.com/newsimagespl/C8u62mHV.jpeg',name:"BCA",path:'/bca'},{images:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCg5F4Dhi67K0cr7HnoHxp7z1Qc02jfPtw8g&s',name:"MCA",path:'/mca'},{images:'https://www.krmangalam.edu.in/wp-content/uploads/2024/05/128.jpg',name:"BCA-DS",path:'/bcads'},{images:'https://d1aeya7jd2fyco.cloudfront.net/thumbnail/online-bca-in-cloud-and-security...webp',name:"BCA-CTIS",path:'/bcactis'},]
  return (
   <Carousel
     autoPlay
      infiniteLoop 
      emulateTouch
      showThumbs={false}
      axis='horizontal'
      showStatus={false}>

        {
        images.map((imglink)=>{
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
  <img src={imglink.images} alt="pizza" />

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
