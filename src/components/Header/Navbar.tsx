import Link from "next/link"
import { FaLock } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";

const Navbar=()=>{

    const NavLinks=[
        {name:"Home",path:"/home" },
        {name:"About",path:"/About" },
        {name:"Contact",path:"/contact" },
        {name:"Contact",path:"/contact" },
        {name:"Contact",path:"/contact" },


       
    ]
    return(<>
  
    <div className="flex h-32 items-center justify-between">

  {/* logo */}

  <Link href={""} className="flex justify-center items-center w-64">
  <p className="text-red font-extrabold text-[40px]">Noteshala</p>

  </Link>

    {/* nav links */}

    <div className="flex gap-8 ml-[300px]">
        {
            NavLinks.map((item, index)=>{
                return(
                    <>
                    <Link  href={item.path} className="text-slate-700 text-[17px] font-medium" key={index}>{item.name}</Link>
                    </>
                )

            })
        }
    </div>

{/* login sign up buttons */}
    <div className="mr-[100px] flex gap-4">
        <div className="w-[80px] gap-1 border border-green-800 hover:bg-green-700  bg-green-500 p-1 flex text-white justify-center items-center h-[42px] rounded-[6px]">
            <FaLock/>
<Link href={""} className="text-[16px]  font-medium ">Login</Link>
</div>    
 <div className="w-[80px] gap-1 border border-green-800 bg-green-500 hover:bg-green-700 text-white flex justify-center items-center h-[42px] p-1 rounded-[6px]">
    <FaUsers/>
<Link href={""} className="text-[16px]  font-medium">Signup</Link>
</div>

    </div>
    </div>
    </>)
}

export default Navbar;