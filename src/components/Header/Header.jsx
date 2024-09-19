'use client'
import Navbar from "@/components/Header/Navbar";
import MobileNav from "@/components/Header/MobileNav"
import { useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa6";

const Header=()=>{
    const [isNavVisible, setIsNavVisible] = useState(false);
    const toggleNav = () => {
        
            setIsNavVisible((prev) =>!prev);
          
      };

    return(
    <>
    <div className="sticky top-0 z-50  dark:bg-gray-900 bg-white ">
         <div className="pt-4 pb-4  lg:hidden">
            
<div className='text-center flex  items-center gap-4 font-bold text-4xl'><Link href="/"><h1 className="p-3 pt-0" >Noteshala</h1></Link><FaBars onClick={toggleNav}/></div>
<div className={`transition-all duration-1000 ease-in-out ${isNavVisible ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
{isNavVisible&&<MobileNav/>}
</div>
    

   
 
    </div>
  <div className="xl:block hidden">
        <Navbar/>
        </div>
     
   


        </div>
    </>
    )
}

export default Header;