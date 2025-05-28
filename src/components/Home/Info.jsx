"use client"

import React from "react";
import { FaBookOpenReader } from "react-icons/fa6";
import { FaHandsHelping } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";

/**
 * InfoSection displays core philosophies with dark/light mode support via Tailwind's dark: classes.
 */
const InfoSection = () => {
  const data = [
    {
      icon: <FaBookOpenReader />, heading: 'Our Philosophy',
      description: '"Our Philosophy" focuses on empowering students through accessible, organized resources, fostering knowledge, creativity, and success in their academic journey.'
    },
    {
      icon: <FaHandsHelping />, heading: 'Your Learning Partner',
      description: '"Your Learning Partner" represents Noteshala as a reliable companion, offering resources and support to guide students through their academic journey successfully.'
    },
    {
      icon: <FaLightbulb />, heading: 'Redefining Learning',
      description: '"Redefining Learning" emphasizes innovation by providing modern, easily accessible study materials that enhance student engagement, understanding, and academic performance in a digital-first world.'
    }
  ];

  return (
    <section className="py-12 px-4 bg-gray-100 dark:bg-gray-900">
      {/* Section heading */}
      <div className="text-center mb-12 mt-12">
        <h2 className="text-3xl font-bold inline-block pb-1 text-gray-800 dark:text-white border-b-4 border-green-600 dark:border-green-400">
          Empowering Students
        </h2>
      </div>

      {/* Info cards */}
      <div className="flex flex-wrap justify-center mb-24 gap-4">
        {data.map(item => (
          <div
            key={item.heading}
            className="flex flex-col items-center justify-center p-6 w-full max-w-md rounded-lg shadow-lg bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 transition-colors duration-300"
          >
            <p className="text-4xl mb-4 text-green-500 dark:text-green-300">{item.icon}</p>
            <h3 className="font-bold text-xl mb-4 text-green-600 dark:text-green-400">{item.heading}</h3>
            <p className="text-center leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfoSection;
