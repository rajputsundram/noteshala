
'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



const page = () => {
  var uploadAreaimg='/images/upload_area.png'
const [image,setImage]=useState(false);
const [pdf,setPdf]=useState(false);

const [data,setData]=useState({
  title:"",
  description:"",
  category:"notes",
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
  formData.append('category',data.category);
  formData.append('author',data.author);
  formData.append('department',data.department);
  formData.append('year',data.year);
  formData.append('semester',data.semester)
  formData.append('image',image);
  formData.append('pdf',pdf)
  // const formDataObject = Object.fromEntries(formData.entries());
// console.log(formDataObject);

 const response=await axios.post('/api/resources', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
  // console.log(formData)
  if(response.data.success){
    toast.success(response.data.msg);
    setImage(false);
    setPdf(false);
    setData(
      {
        title:"",
        description:"",
        category:"",
        author:"",
        department:"",
        semester:"",
        year:""
     
      }
      
    )
    setTimeout(() => {
      location.reload();
    }, 3000);

  }
  else{
    toast.error("Error");
  }
}
  return (
    <div>
      <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
      <p className='text-xl'>Upload thumbnail</p>
<label htmlFor="image">
  <Image
    className='mt-4'
    src={!image ? uploadAreaimg : URL.createObjectURL(image)}
    width={140}
    height={70}
    alt='Thumbnail Preview'
  />
</label>
<input
  onChange={(e) =>{
    console.log(e.target.files[0]);
    setImage(e.target.files[0])
    
  }}
  
  type="file"
  id='image'
  hidden
  required
/>

<p className='text-xl mt-6'>Upload PDF</p>
<label htmlFor="pdf">
  {pdf ? (
    <p className="mt-4 text-blue-500 underline">Preview PDF</p> // Placeholder for PDF
  ) : (
    <Image
      className='mt-4'
      src={uploadAreaimg}
      width={140}
      height={70}
      alt='PDF Placeholder'
    />
  )}
</label>
<input
  onChange={(e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      console.log(file);
      setPdf(file);
    } else {
      alert('Please upload a valid PDF file.');
      e.target.value = null; // Clear the input
    }
  }}
  type="file"
  id="pdf"
  accept="application/pdf"
  hidden
  required
/>


        <p className='text-xl mt-4'>Resource title</p>
        <input name='title' onChange={OnChangeHandller} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Type here' required />
        <p className='text-xl mt-4'>Autor name</p>
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
       
        <p className='text-xl mt-4'>Resources category</p>
        <select  name="category" onChange={OnChangeHandller} value={data.category} className='w-40 mt-4 px-4 py-3 border text-gray-500'>
          <option value="notes">Notes</option>
          <option value="questionpaper">Question-paper</option>
          <option value="time-table">Time-table</option>
        </select>
        <br />
        <button type='submit' className='mt-8 w-40 h-12 bg-black text-white'>ADD</button>
        <br /> <br />
      </form>
    </div>
  )
}

export default page
