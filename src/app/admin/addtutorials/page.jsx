'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Page() {
  const [data, setData] = useState({
    title: '',
    description: '',
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
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, val]) => formData.append(key, val))

      const res = await axios.post('/api/addtutorials', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      })

      if (res.data.success) {
        toast.success(res.data.msg || 'Tutorial added!')
        setData({
          title: '',
          description: '',
          author: '',
          department: 'bcactis',
          year: 'first',
          semester: 'first',
        })
        setTimeout(() => location.reload(), 1000)
      } else {
        toast.error(res.data.error || 'Submission failed')
        setIsSubmitting(false)
      }
    } catch (err) {
      console.error('Submit error:', err)
      toast.error('An error occurred—check console')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-5 px-5 sm:pt-12 sm:pl-16">
      <ToastContainer position="top-right" />
      <form onSubmit={handleSubmit}>
        <p className="text-xl mt-4">Tutorial title</p>
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
          {isSubmitting ? 'Submitting...' : 'ADD'}
        </button>
        </div>
      </form>
    </div>
  )
}
