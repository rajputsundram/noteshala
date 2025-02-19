'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const uploadAreaimg = "/images/upload_area.png";
  const [image, setImage] = useState(uploadAreaimg);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',  
    category: 'tech',
    image: null,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFormData((prevData) => ({ ...prevData, image: file }));
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    Object.keys(formData).forEach((key) => {
      submissionData.append(key, formData[key]);
    });

    try {
      const response = await axios.post('/api/blogs', submissionData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        credentials: 'include',
      });

      if (response.data.success) {
        toast.success(response.data.msg);
        setFormData({
          title: '',
          description: '',
          author: '',  // ✅ Reset author after submission
          category: 'technology',
          image: null,
        });
        setImage(uploadAreaimg);
        setTimeout(() => location.reload(), 1000);
      } else {
        toast.error('Error submitting form');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <div className='mb-2'>
          <label className='block text-xl font-medium dark:text-gray-300'>Thumbnail</label>
          <label htmlFor='image'>
            <Image className='mt-4' src={image} width={140} height={70} alt='Thumbnail Preview' required />
          </label>
          <input type='file' id='image' hidden onChange={handleImageChange} required />
        </div>

        <p className='text-xl mt-4'>Blog title</p>
        <input name='title' onChange={onChangeHandler} value={formData.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type='text' placeholder='Type here' required />

        <p className='text-xl mt-4'>Author name</p>
        <input name='author' onChange={onChangeHandler} value={formData.author} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type='text' placeholder='Type here' required />

        <p className='text-xl mt-4'>Category</p>
        <select name='category' onChange={onChangeHandler} value={formData.category} className='w-40 mt-4 px-4 py-3 border text-gray-500'>
          <option value='technology'>Technology</option>
          <option value='lifestyle'>Lifestyle</option>
          <option value='others'>Others</option> {/* ✅ Fixed value */}
        </select>

        <p className='text-xl mt-4'>Description</p>
        <textarea name='description' onChange={onChangeHandler} value={formData.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' placeholder='Write content here' rows={6} required />

        <br />
        <button type='submit' className='mt-8 w-40 h-12 bg-green-500 hover:bg-green-600 shadow-xl border-spacing-1 text-white'>ADD</button>
        <br /> <br />
      </form>
    </div>
  );
};

export default Page;
