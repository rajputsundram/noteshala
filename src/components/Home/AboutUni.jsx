import React from 'react';
import Link  from 'next/link';

const AboutNoteshala = () => {
  return (
    <div className="bg-[#2F4F73] p-10 mt-24 text-white flex justify-center">
      <div className="flex flex-col md:flex-row md:justify-between max-w-[1000px] w-full">
        <div className="md:w-1/3 md:pr-5">
          <h2 className="text-2xl md:text-left mb-2">About Noteshala</h2>
          <div className="w-[75%] h-1 bg-[#69D17F] mb-5"></div> {/* underline */}

        </div>
        <div className="md:w-2/3 md:pl-5">
          <p className="text-[#9EB6CF] text-base leading-7 text-left">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem nesciunt quaerat ad reiciendis
            perferendis voluptate fugiat sunt fuga error totam.
          </p>
          <p className="text-[#9EB6CF] text-base leading-7 mt-4 text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus assumenda omnis tempora ullam alias
            amet eveniet voluptas, incidunt quasi aut officiis porro ad, expedita saepe necessitatibus rem debitis
            architecto dolore? Nam omnis sapiente placeat blanditiis voluptas dignissimos, itaque fugit a laudantium
            adipisci dolorem enim ipsum cum molestias? Quod quae molestias modi fugit quisquam. Eligendi recusandae
            officiis debitis quas beatae aliquam?
          </p>
          {/* <a href="#" className="text-[#69D17F] font-bold mt-5 block text-left">
         
          </a> */}

          <Link href={"/"} className="text-[#69D17F] font-bold mt-5 block text-left hover:underline"> Read more </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutNoteshala;
