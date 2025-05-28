"use client";

import React from 'react';
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosStar } from "react-icons/io";
import Slider from 'react-slick';

/**
 * ReviewCompo displays user reviews with dark/light styling via Tailwind's dark: classes.
 */
const ReviewCompo = () => {
  const settings = {
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1, centerPadding: '0px' } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: '0px' } }
    ]
  };

  const reviewData = [
    { name: "Aarav Sharma", review: "Noteshala's notes are comprehensive and clear, making my exam prep far easier." },
    { name: "Saanvi Singh", review: "I appreciate the well-organized resources. They saved me hours of searching." },
    { name: "Vivaan Patel", review: "The interface is user-friendly, and the content quality is top-notch." },
    { name: "Ananya Gupta", review: "Excellent platform! It helped me score high on my semester tests." },
    { name: "Arjun Kumar", review: "The previous year papers section is a lifesaver for practicing." },
    { name: "Diya Reddy", review: "I love the range of subjects covered. Everything I need is here." },
    { name: "Krishna Iyer", review: "The blogs and tips keep me motivated and informed." },
    { name: "Ishaan Mehta", review: "Noteshala has transformed how I study—highly recommend." },
    { name: "Kavya Nair", review: "The design is sleek, and navigation is smooth. Great study companion." },
    { name: "Rohan Verma", review: "A one-stop solution for all my study materials. Superb!" }
  ];

  return (
    <div className="max-w-screen-lg mx-auto mt-8 px-4 py-8 bg-gray-100 dark:bg-transparent transition-colors">
      <div className="text-center mb-8 mt-12">
        <h2 className="text-3xl font-bold inline-block border-b-4 pb-1 text-gray-800 dark:text-white border-green-600 dark:border-green-400">
          Reviews
        </h2>
      </div>
      <Slider {...settings}>
        {reviewData.map((item, index) => (
          <div key={index} className="px-4 my-12">
            <div className="flex justify-center lg:justify-start gap-1 mb-2">
              {[...Array(4)].map((_, i) => (
                <IoIosStar key={i} className="text-yellow-600 dark:text-yellow-400 text-xl" />
              ))}
            </div>
            <p className="my-4 font-medium text-lg lg:text-xl text-center lg:text-left text-gray-800 dark:text-gray-200">
              {item.review}
            </p>
            <div className="flex justify-center lg:justify-start items-center gap-4 lg:gap-6">
              <div className="relative h-20 w-20 flex items-center justify-center rounded-full bg-green-500 dark:bg-gray-700">
                <span className="text-xl font-semibold text-white">
                  {item.name.charAt(0)}
                </span>
              </div>
              <span className="font-medium text-lg lg:text-xl text-gray-900 dark:text-white">
                {item.name}
              </span>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewCompo;