'use client'

import React, { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function UploadPage() {
  const uploadAreaimg = '/images/upload_area.png'
  const [image, setImage] = useState(null)
  const [pdf, setPdf] = useState(null)
  const [data, setData] = useState({
    title: '',
    description: '',
    category: 'notes',
    author: '',
    department: 'bcactis',
    year: 'first',
    semester: 'first',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!image || !pdf) {
      toast.error('Please select both an image and a PDF.')
      return
    }
    setIsSubmitting(true)

    try {
      const form = new FormData()
      form.append('image', image)
      form.append('pdf', pdf)
      Object.entries(data).forEach(([key, val]) => form.append(key, val))

      const response = await axios.post('/api/resources', form, {
        withCredentials: true,
      })

      if (response.data.success) {
        toast.success(response.data.msg)
        setImage(null)
        setPdf(null)
        setData({
          title: '',
          description: '',
          category: 'notes',
          author: '',
          department: 'bcactis',
          year: 'first',
          semester: 'first',
        })
        setTimeout(() => location.reload(), 3000)
      } else {
        toast.error(response.data.error || 'Upload failed')
        setIsSubmitting(false)
      }
    } catch (err) {
      console.error('Upload error:', err.response?.data || err.message)
      toast.error('Upload failed — check console')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-5 px-5 sm:pt-12 sm:pl-16">
      <ToastContainer position="top-right" />
      <form onSubmit={handleSubmit}>
        <p className="text-xl">Upload thumbnail</p>
        <label htmlFor="image">
          <Image
            className="mt-4"
            src={image ? URL.createObjectURL(image) : uploadAreaimg}
            width={140}
            height={70}
            alt="Thumbnail Preview"
          />
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          hidden
          required
          onChange={e => setImage(e.target.files[0])}
        />

        <p className="text-xl mt-6">Upload PDF</p>
        <label htmlFor="pdf">
          {pdf ? (
            <p className="mt-4 text-blue-500 underline">Preview PDF</p>
          ) : (
            <Image
              className="mt-4"
              src={uploadAreaimg}
              width={140}
              height={70}
              alt="PDF Placeholder"
            />
          )}
        </label>
        <input
          id="pdf"
          type="file"
          accept="application/pdf"
          hidden
          required
          onChange={e => {
            const file = e.target.files[0]
            if (file?.type === 'application/pdf') {
              setPdf(file)
            } else {
              alert('Please upload a valid PDF file.')
              e.target.value = null
            }
          }}
        />

        <p className="text-xl mt-4">Resource title</p>
        <input
          name="title"
          value={data.title}
          onChange={handleChange}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Type here"
          required
        />

        <p className="text-xl mt-4">Author name</p>
        <input
          name="author"
          value={data.author}
          onChange={handleChange}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Type here"
          required
        />

        <div className="flex flex-wrap gap-4">
          <div>
            <p className="text-xl mt-4">Department</p>
            <select
              name="department"
              value={data.department}
              onChange={handleChange}
              className="w-40 mt-2 px-4 py-3 border text-gray-500"
            >
              <option value="bcactis">Bca-Ctis</option>
              <option value="bca">Bca-Gen.</option>
              <option value="bcads">Bca-DS</option>
              <option value="mca">MCA</option>
            </select>
          </div>

          <div>
            <p className="text-xl mt-4">Year</p>
            <select
              name="year"
              value={data.year}
              onChange={handleChange}
              className="w-40 mt-2 px-4 py-3 border text-gray-500"
            >
              <option value="first">First</option>
              <option value="second">Second</option>
              <option value="third">Third</option>
            </select>
          </div>

          <div>
            <p className="text-xl mt-4">Semester</p>
            <select
              name="semester"
              value={data.semester}
              onChange={handleChange}
              className="w-40 mt-2 px-4 py-3 border text-gray-500"
            >
              <option value="first">First</option>
              <option value="second">Second</option>
            </select>
          </div>
        </div>

        <p className="text-xl mt-4">Description</p>
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          rows={6}
          placeholder="Write content here"
          required
        />

        <p className="text-xl mt-4">Resources category</p>
        <select
          name="category"
          value={data.category}
          onChange={handleChange}
          className="w-40 mt-2 px-4 py-3 border text-gray-500"
        >
          <option value="notes">Notes</option>
          <option value="previousyearpaper">Question-paper</option>
          <option value="time-table">Time-table</option>
        </select>
<div className='mb-4'>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`mt-8 w-40 h-12 text-white ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 shadow-xl'
          }`}
        >
          {isSubmitting ? 'Uploading...' : 'ADD'}
        </button>
        </div> 
      </form>
    </div>
  )
}
