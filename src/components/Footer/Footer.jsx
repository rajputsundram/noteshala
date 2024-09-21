'use client'
import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const Footer=()=>{
const departments=["BCA","MCA","BCA-CTIS","BCA-DS"];
const impLinks=["importantLinks","importantLinks","importantLinks","importantLinks"];
const SocialIcons=[{icons:<BsTwitterX/>,path:""},{icons:<FaInstagram/>,path:""},{icons:<FaFacebookF/>,path:""},{icons:<FaLinkedinIn/>,path:""}]


    return(
        <>
        <div className="bg-blue-950 h-[450px] flex flex-col justify-center items-center ">
            <div className="container   flex justify-center flex-wrap  gap-6 items-center ">
            {/* first section */}
            <div className=" flex flex-col w-96 h-72 gap-7 p-7 pt-0">
                <h1 className="font-semibold text-xl w-24 text-white border-b-2 border-spacing-5">Noteshala</h1>
                <div className="flex flex-col justify-start items-start gap-3">
                <p className="text-white ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem, eum.</p>
                   <button className="text-green-500">Learn more</button>
                </div>


            </div>
            {/* Second Sections */}
            <div className="flex flex-col w-52  h-72">
                <h1 className="font-semibold text-xl text-white  border-b-2  w-32 mb-6">Departments</h1>
               
               <div className="flex flex-col text-green-500 text-sm gap-1">
                {
                     departments.map((links,index)=>{
                        return(<>
                        <Link key={index} href={""}>{links}</Link>
                        </>)
                      })  
                    }
                    </div>
            </div>
            {/* Third section */}
            <div className="flex flex-col w-52  h-72">
                <h1 className="font-semibold text-xl text-white  border-b-2 mb-6 w-[145px]">Important links</h1>
<div className="text-green-500 flex flex-col">
      {
        impLinks.map((links,index)=>{
           return(<>
           <Link key={index} href={""}>{links}</Link>
           </>)
         })  
       }
       </div>


            </div>
{/* social media Sections */}
            <div className="w-52  h-72">
                <h1 className="font-semibold text-xl text-white border-b-2 mb-6 w-[125px] ">Social Media</h1>
                <div className="flex ">
                {
                   SocialIcons.map((items,index)=>{
                    return(

                        <>
                        <div className="rounded-full bg-green-500 hover:bg-white hover:text-green-600 text-white h-10 w-10 flex justify-center items-center m-1">
                        <Link  key={index} href={items.path}>
                         {items.icons}
                        </Link>
                        </div>
                        </>
                    )

                   }) 
                }
                </div>
            </div>

            </div>
            <div  className="flex text-white mb-2  justify-center items-center">
            <p>Copyright &copy;2024 All right reserved</p>
           </div>
        </div>
       
      
        </>

        
    )
}

export default Footer;