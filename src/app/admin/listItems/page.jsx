'use client'
import ResourceTableItem from '../../../components/adminComponent/ResourceTableItems'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const page = () => {
  const [resource,setResource]=useState([]);
  const fetchResource=async ()=>{
    const response=await axios.get('/api/resources');
    setResource(response.data.blogs)
  }

  const deleteResource=async (mongoId)=>{
    const response=await axios.delete('/api/resources',{
      params:{
        id:mongoId
      }
    })

    toast.success(response.data.msg);
    fetchResource();

  }

  
   useEffect(()=>{
    
   fetchResource();
   },[])



  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Resource</h1>
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-grat-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='hidden sm:block px-6 py-3'>Author name</th>
              <th scope='col' className=' px-6 py-3'>Resource Title</th>
              <th scope='col' className=' px-6 py-3'>Date</th>
              <th scope='col' className=' px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              resource.map((item,index)=>{
           
            return <ResourceTableItem key={index} mongoId={item._id} title={item.title}  author={item.author} date={item.date} deleteResource={deleteResource}/>

              })
            }
          </tbody>
        </table>
      </div>
   
    </div>
  )
}

export default page
