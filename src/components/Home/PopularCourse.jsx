'use client'
import React from 'react';
import Image from 'next/image';
import Clang from '/public/images/Cprog.png';
import Cpp from '/public/images/Cpp.png';
// import Java from '/public/images/Java.png';
import DSA from '/public/images/dsa.png';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Link from 'next/link';

const PopularCourse = () => {
  const popularCourses = [
    { name: 'C', image: Clang, desc: 'Learn C programming from basics to advanced.',path:"" },
    { name: 'C++', image: Cpp, desc: 'Master C++ with in-depth tutorials.',path:"" },
    { name: 'Java', image: Java, desc: 'Comprehensive Java programming course.',path:"" },
    { name: 'DSA', image: DSA, desc: 'Data Structures and Algorithms made easy.',path:"" },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
      slidesToSlide: 3
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  return (
    <div className='my-6 flex flex-col justify-center items-center'>
       <div className=' flex items-center h-44 mb-4'>
      <h1 className='text-gray-700 dark:text-white font-semibold  border-b-[4px] border-b-green-400   text-4xl'>Popular Courses</h1>
      </div>
      <div className='w-full sm:w-[1000px] '>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        keyBoardControl={true}
        customTransition="all 1"
        transitionDuration={1000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="px-1"
      >
        {popularCourses.map((item, index) => (
          <div key={index} className="flex flex-col items-center rounded-sm  h-[400px] w-[300px] bg-blue-950 mx-auto ">
              <div className="relative w-full h-[150px]">
            <Image    layout="fill"  src={item.image}   alt={`${item.name} logo`} className="object-cover " />
            </div>
            <h1 className="text-white text-2xl font-bold mt-4">{item.name}</h1>
            <p className="text-white text-sm h-10 my-4 px-2 text-center">{item.desc}</p>
           <div className='h-16  flex justify-center items-center '>
            <Link href={item.path}>
          <button key={index} className='bg-green-500 hover:bg-green-700 hover:underline h-11 text-white w-28 rounded'>Learn more</button>
          </Link>
          </div> 
          </div>
        ))}
      </Carousel>
      </div>
    </div>
  );
};

export default PopularCourse;
