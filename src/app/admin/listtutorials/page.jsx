'use client';

import TutorialsItems from "../../../components/adminComponent/TutorialsItems";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Page = () => {
  const [resource, setResource] = useState([]);

  // Fetch Resources (Only for Logged-in User)
  const fetchResource = async () => {
    try {
      const response = await axios.get('/api/addtutorials');
      setResource(response.data.resources || []); // Ensure resource is always an array
    } catch (error) {
      console.error('Failed to fetch resources:', error);
      toast.error('Failed to fetch resources.');
    }
  };

  // Delete Resource
  const deleteResource = async (mongoId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this tutorial?");
    if (!isConfirmed) return;
    try {
      const response = await axios.delete('/api/addtutorials', {
        params: { id: mongoId },
      });
      toast.success(response.data.msg);
      fetchResource(); // Refresh the list after deletion
    } catch (error) {
      console.error('Failed to delete resource:', error);
      toast.error('Failed to delete the resource.');
    }
  };

  // Fetch Resources on Component Mount
  useEffect(() => {
    fetchResource();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:px-16">
      <h1 className="text-2xl font-bold mb-4">All Tutorials</h1>
      <div className="relative h-[80vh] max-w-full overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
            <tr className="shadow-2xl border border-b-2">
              <th scope="col" className="hidden sm:block px-6 py-3">
                Author Name
              </th>
              <th scope="col" className="px-6 py-3">Tutorials Title</th>
              <th scope="col" className="px-6 py-3">Published on</th>
              <th scope="col" className="px-6 py-3">Updated on</th>
              <th scope="col" className="px-6 py-3">Action</th>
              <th scope="col" className="px-6 py-3">Add New</th>
            </tr>
          </thead>
          <tbody>
            {resource.length > 0 ? (
              resource.map((item, index) => (
                <TutorialsItems
                  key={item._id || index}
                  mongoId={item._id}
                  title={item.title}
                  author={item.author}
                  publishedDate={item.publishedDate}
                  updatedDate={item.updatedDate}
                  deleteResource={deleteResource}
                  topics={item.topics}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No resources available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
