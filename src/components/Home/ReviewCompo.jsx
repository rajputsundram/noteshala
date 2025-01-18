'use client';

import React from 'react';
import Image from 'next/image';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { IoIosStar } from "react-icons/io";
import Slider from 'react-slick';
// import userImg from '../../../public/assets/user.png';

const star = [<IoIosStar/>, <IoIosStar/>, <IoIosStar/>, <IoIosStar/>];

const ReviewCompo = () => {
    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1, // Show only one slide at a time
        slidesToScroll: 1,
        centerMode: true, // Center the active slide
        centerPadding: '0px', // No padding on either side of the centered slide
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                centerPadding: '0px', // Adjust padding for medium screens
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                centerPadding: '0px', // Adjust padding for small screens
              }
            },
        ]
    };


    const reviewData = [
        { name: "Alice Johnson", review: "Noteshala has been a game-changer for my studies! The notes are detailed and easy to understand." },
        { name: "Michael Smith", review: "Great platform! It saved me so much time while preparing for exams. Highly recommend!" },
        { name: "Emma Wilson", review: "I love the organized layout of the website. It makes finding the right resources so easy!" },
        { name: "David Brown", review: "The timetables and previous year question papers have been incredibly helpful in my revision." },
        { name: "Sophia Davis", review: "Noteshala’s resources are top-notch! It's like having a personal study assistant." },
        { name: "James Taylor", review: "I’ve never had such an efficient way to prepare for my exams. Love it!" },
        { name: "Olivia Martinez", review: "The blogs and updates are insightful and provide a great way to stay engaged with the community." },
        { name: "Benjamin Moore", review: "The variety of subjects available is impressive. I’ve found everything I need for my courses." },
        { name: "Charlotte Clark", review: "As a student, Noteshala makes studying so much easier with all the resources in one place." },
        { name: "Daniel Lee", review: "Noteshala has helped me stay organized and on top of my assignments. A must-have!" }
      ];;

    return (
        <div className="max-w-screen-lg mx-auto mt-8 px-4"> 
          <div className="text-center mb-8 mt-12">
  <h2 className="text-3xl font-bold text-white inline-block border-b-4 border-green-400 pb-1">
    Reviews
  </h2>
</div>
            <Slider {...settings}>
                {reviewData.map((items, index) => (
                    <div key={index} className='px-4'>
                        <div className='flex justify-center lg:justify-start gap-1 mb-2'>
                            {star.map((item, starIndex) => (
                                <p key={starIndex} className='text-blue-400 text-xl'>{item}</p>
                            ))}
                        </div>
                        <p className="my-4 font-medium text-lg lg:text-2xl text-center lg:text-left">{items.review}</p>
                        <div className='flex justify-center lg:justify-start items-center text-center gap-4 lg:gap-6'>
                            <div className='relative h-20 w-20'>
                                <Image src={items.userImgs} layout='fill' className='rounded-full object-cover' alt={items.userName} />
                            </div>
                            <span className='font-medium text-lg lg:text-xl'>{items.name}</span>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default ReviewCompo;
