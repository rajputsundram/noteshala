import React from 'react';
import Link  from 'next/link';

const AboutNoteshala = () => {
  return (
    <div className="bg-[#2F4F73] p-10 mt-24 text-white flex justify-center">
    <div className="flex flex-col md:flex-row md:justify-between max-w-screen-xl w-full">
    <div className="md:w-1/3 md:pr-5 w-full text-center md:text-left">
  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 inline-block border-b-2 border-[#69D17F] pb-2">
    About Noteshala
  </h2>
</div>


      <div className="md:w-2/3 md:pl-5">
        <p className="text-[#9EB6CF] text-base leading-7 mb-4">
        Noteshala is not just a platform—it's your trusted companion in the academic journey, designed to make learning more accessible and efficient. Born out of a desire to empower students, Noteshala brings all your study needs into one seamless space. Whether you’re searching for detailed notes, timetables, or previous year’s question papers, Noteshala provides a user-friendly interface that allows you to access everything you need with just a few clicks.
        </p>
        <p className="text-[#9EB6CF] text-base leading-7 mb-4">
        We understand that every student has unique learning needs, and that’s why Noteshala is designed with flexibility in mind. From comprehensive notes to quick reference guides, our platform offers diverse resources that cater to different study styles. But we don’t stop there. Noteshala is built to stay ahead of the curve, continuously evolving with new tools and features to enhance your learning experience. With our advanced search options and organized layout, you’ll find exactly what you're looking for—whether you’re preparing for exams or simply trying to understand a complex concept.
        </p>
        <Link href={"/"} className="text-[#69D17F] font-bold mt-5 block text-left hover:underline">
          Read more
        </Link>
      </div>
    </div>
  </div>
  
  );
};

export default AboutNoteshala;
