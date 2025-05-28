'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Page = () => {
  const uploadAreaimg = "/images/upload_area.png";
  const [imagePreview, setImagePreview] = useState(uploadAreaimg);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    category: 'technology',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select an image.');
      return;
    }
    setIsSubmitting(true);

    const data = new FormData();
    data.append('file', file);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('author', formData.author);
    data.append('category', formData.category);

    try {
      const res = await axios.post('/api/blogs', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.msg || 'Blog submitted!');
        setFormData({
          title: '',
          description: '',
          author: '',
          category: 'technology',
        });
        setFile(null);
        setImagePreview(uploadAreaimg);
        setTimeout(() => location.reload(), 1000);
      } else {
        toast.error(res.data.error || 'Failed to submit blog.');
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error('An error occurred while submitting the blog.');
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        {/* Thumbnail upload */}
        <div className='mb-2'>
          <label className='block text-xl font-medium dark:text-gray-300'>Thumbnail</label>
          <label htmlFor='image'>
            <Image
              className='mt-4'
              src={imagePreview}
              width={140}
              height={70}
              alt='Thumbnail Preview'
            />
          </label>
          <input
            type='file'
            id='image'
            hidden
            accept='image/*'
            onChange={handleImageChange}
          />
        </div>

        {/* Title */}
        <p className='text-xl mt-4'>Blog title</p>
        <input
          name='title'
          onChange={onChangeHandler}
          value={formData.title}
          className='w-full sm:w-[500px] mt-4 px-4 py-3 border'
          type='text'
          placeholder='Type here'
          required
        />

        {/* Author */}
        <p className='text-xl mt-4'>Author name</p>
        <input
          name='author'
          onChange={onChangeHandler}
          value={formData.author}
          className='w-full sm:w-[500px] mt-4 px-4 py-3 border'
          type='text'
          placeholder='Type here'
          required
        />

        {/* Category */}
        <p className='text-xl mt-4'>Category</p>
        <select
          name='category'
          onChange={onChangeHandler}
          value={formData.category}
          className='w-40 mt-4 px-4 py-3 border text-gray-500'
        >
          <option value='technology'>Technology</option>
          <option value='lifestyle'>Lifestyle</option>
          <option value='others'>Others</option>
        </select>

        {/* Description */}
        <p className='text-xl mt-4'>Description</p>
        <textarea
          name='description'
          onChange={onChangeHandler}
          value={formData.description}
          className='w-full sm:w-[500px] mt-4 px-4 py-3 border'
          placeholder='Write content here'
          rows={6}
          required
        />

        {/* Submit */}
        <div className='mb-4'>
        <button
          type='submit'
          disabled={isSubmitting}
          className={`mt-8 w-40 h-12 text-white ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 shadow-xl'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'ADD'}
        </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
