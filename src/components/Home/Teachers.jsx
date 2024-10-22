"use client";
import React, { useState } from 'react';

const testimonialsData = [
  {
    name: 'Allison Holmes',
    title: 'Designer',
    img: 'https://randomuser.me/api/portraits/men/1.jpg',
    quote:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, mollitia. Possimus mollitia nobis libero quidem aut tempore dolore iure maiores, perferendis, provident numquam illum nisi amet necessitatibus. A, provident aperiam!',
  },
  {
    name: 'Allison Holmes',
    title: 'Designer',
    img: 'https://randomuser.me/api/portraits/women/1.jpg',
    quote:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, mollitia. Possimus mollitia nobis libero quidem aut tempore dolore iure maiores, perferendis, provident numquam illum nisi amet necessitatibus. A, provident aperiam!',
  },
  {
    name: 'John Doe',
    title: 'Developer',
    img: 'https://randomuser.me/api/portraits/men/2.jpg',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, laborum maiores? Iusto, animi? Vel ex praesentium voluptate fugiat, nostrum dolore.',
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Track active testimonial index

  // Function to handle dot click
  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">Testimonials</h2>
        <div className="w-[10%] h-1 bg-[#69D17F] mt-2 mx-auto"></div> {/* Green underline */}
      </div>

      {/* Testimonial Content */}
      <div className="mt-10 max-w-5xl mx-auto">
        <div className="flex flex-col items-center">
          {/* Dynamic Content */}
          <img
            className="w-16 h-16 rounded-full object-cover"
            src={testimonialsData[activeIndex].img}
            alt="Testimonial Avatar"
          />
          <div className="mt-4 text-center">
            <h3 className="text-xl font-semibold text-gray-900">
              {testimonialsData[activeIndex].name}
            </h3>
            <p className="text-gray-600">{testimonialsData[activeIndex].title}</p>
            <p className="mt-4 text-gray-500 text-sm">
              {testimonialsData[activeIndex].quote}
            </p>
          </div>
        </div>
      </div>

      {/* Dots for navigation */}
      <div className="flex justify-center mt-8">
        {testimonialsData.map((_, index) => (
          <span
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 w-2 rounded-full mx-1 cursor-pointer ${
              activeIndex === index ? 'bg-green-500' : 'bg-gray-300'
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
