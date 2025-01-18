import React from "react";
import { FaBookOpenReader } from "react-icons/fa6";
import { FaHandsHelping } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
const InfoSection = () => {

const data=[
  {icon:<FaBookOpenReader/>,heading:'Our Philosophy',description:'"Our Philosophy" focuses on empowering students through accessible, organized resources, fostering knowledge, creativity, and success in their academic journe'},

  {icon:<FaHandsHelping/>,heading:'Your Learning Partner',description:'"Your Learning Partner" represents Noteshala as a reliable companion, offering resources and support to guide students through their academic journey successfully.'},
  {icon:< FaLightbulb/>,heading:'Redefining Learning',description:'"Redefining Learning" emphasizes innovation by providing modern, easily accessible study materials that enhance student engagement, understanding, and academic performance in a digital-first world.'}



]

  return (
    <>

 <div className="text-center mb-12 mt-12">
  <h2 className="text-3xl font-bold text-white inline-block border-b-4 border-green-400 pb-1">
    Empowering Students
  </h2>
</div>

<div className="flex flex-wrap justify-center mb-24 gap-1 lg:gap-4">
  {data.map((item) => {
    return (
      <div key={item.heading} className="flex flex-col items-center justify-center p-6 w-full max-w-md bg-gray-800 rounded-lg shadow-lg">
        <p className="text-4xl mb-4">{item.icon}</p>
        <h3 className="text-green-400 font-bold text-xl mb-4">{item.heading}</h3>
        <p className="text-gray-300 text-center">{item.description}</p>
      </div>
    );
  })}
</div>

  
</>
  
  
  
  
    
  );
};

export default InfoSection;
