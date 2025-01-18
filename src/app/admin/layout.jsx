
import Sidebar from  "../../components/adminComponent/Sidebar"
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Layout({children}){
    return(
        <>
        <div className="flex">
            <ToastContainer theme="dark"/>
            <Sidebar/>
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-center w-full py-3 max-h-[60px] px-12 border-b   ">
                    <h1 className="font-lg text-3xl font-bold ">Admin Panel</h1>
                   
                </div>
                {children}
            </div>
        </div>
       
        </>
    )
}