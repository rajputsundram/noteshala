
'use client'
import React from 'react'
import { useState } from 'react';
import Link from "next/link";
import axios from 'axios';
import { toast } from 'react-toastify';
import {useRouter} from 'next/navigation';

function Login() {
    const router=useRouter();
    
    const [credentials,setCreadentials]=useState({email:"",password:""})
    const handleChange=(e)=>{
        setCreadentials({...credentials,[e.target.name]:e.target.value})

    }
    const handleSubmit= async(e)=>{
      
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('email', credentials.email);
            formData.append('password', credentials.password);
        

            const response = await axios.post('/api/LogIn', formData);

            if (response.data.success) {
                toast.success(response.data.msg);
                setCreadentials({
                    email: '',
                    password: ''
                 
                });
                localStorage.setItem("token",response.data.authToken)
                localStorage.setItem("userEmail",credentials.email);
                router.push("/")
             
            } else {
                toast.error(response.data.msg ||'Error occurred during login');
            }
        }catch (error) {
            console.error('Signup error:', error);
            toast.error('Something went wrong. Please try again.');
        }

    } 
  
     return (
    <div style={{height:"75vh",backgroundImage:'',backgroundSize:"cover",}}  className='flex justify-center items-center'>
        <div className="container w-full max-w-md">
            <form onSubmit={handleSubmit} className='bg-gray-100
              dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4'>

                <div className='mb-4'>
                    <label htmlFor="email">Username</label>
                    <input onChange={handleChange} 
                    required name='email'placeholder='Enter your email/username' type="email" value={credentials.email} className='shadow appearance-none border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-900 dark:text-gray-100' />
                </div>
                <div className='mb-4'>
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} name='password' type="password" 
                    required
                    placeholder='******' value={credentials.password} className='shadow appearance-none border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-900
                    dark:text-gray-100 ' />
                </div>
                <div className='fle x justify-between items-center'>
                <button type="submit" className='border font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-green-600 hover:text-white'>Log in</button>
                <Link href={"/signup"} style={{all:"unset"}}>
                <button type="button" className='border font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-green-600 hover:text-white'>New User?</button>
                </Link>
                </div>
                
            </form>
        </div>
    </div>
  )
}

export default Login