'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



const page = () => {

const [data,setData]=useState({
  title:"",
  description:"",
  author:"",
  department:"bcactis",
  year:"first",
  semester:"first"


})
const OnChangeHandller=(event)=>{
  const name=event.target.name;
  const value=event.target.value;
  setData(data=>({...data,[name]:value}))
  console.log(data)


}
const onSubmitHandler=async(e)=>{
  e.preventDefault();
  const formData=new FormData();
  formData.append('title',data.title);
  formData.append('description',data.description);
  formData.append('author',data.author);
  formData.append('department',data.department);
  formData.append('year',data.year);
  formData.append('semester',data.semester)

  // const formDataObject = Object.fromEntries(formData.entries());
// console.log(formDataObject);

const response = await axios.post('/api/addtutorials', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
  credentials: "include", // ✅ Ensures cookies are sent
});


  // console.log(formData)
  if(response.data.success){
    toast.success(response.data.msg);
    setData(
      {
        title:"",
        description:"",
        author:"",
        department:"",
        semester:"",
        year:""
     
      }
      
    )
    setTimeout(() => {
      location.reload();
    }, 1000);

  }
  else{
    toast.error("Error");
  }
}
  return (
    <div >
      <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p className='text-xl mt-4'>Tutorial title</p>
        <input name='title' onChange={OnChangeHandller} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Type here' required />
        <p className='text-xl mt-4'>Author name</p>
        <input name='author' onChange={OnChangeHandller} value={data.author} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Type here' required />
        <p className='text-xl mt-4'>Department</p>
        <select  name="department" onChange={OnChangeHandller} value={data.department} className='w-40 mt-4 px-4 py-3 border text-gray-500'>
          <option value="bcactis">Bca-Ctis</option>
          <option value="bca">Bca-Gen.</option>
          <option value="bcads">Bca-DS</option>
          <option value="mca">MCA</option>
         
        </select>
        <p className='text-xl mt-4'>Year</p>
        <select  name="year" onChange={OnChangeHandller} value={data.year} className='w-40 mt-4 px-4 py-3 border text-gray-500'>
          <option value="first">First</option>
          <option value="second">Secoond</option>
          <option value="third">Third</option>
        </select>
        <p className='text-xl mt-4'>Semester</p>
        <select  name="semester" onChange={OnChangeHandller} value={data.semester} className='w-40 mt-4 px-4 py-3 border text-gray-500'>
          <option value="first">First</option>
          <option value="second">Second</option>
        
        </select>
        <p className='text-xl mt-4'> Description</p>
        <textarea name='description' onChange={OnChangeHandller} value={data.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='write content here' rows={6} required />
        <br />
        <button type='submit' className='mt-8 w-40 h-12 bg-green-500 hover:bg-green-600 shadow-xl border-spacing-1 text-white'>ADD</button>
        <br /> <br />
      </form>
    </div>
  )
}

export default page
