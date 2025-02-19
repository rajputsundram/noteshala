'use client';
import Bloglist from "../../../components/adminComponent/Bloglist";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Page = () => {
  const [resource, setResource] = useState([]);

  // Fetch Resources (Only for Logged-in User)
  const fetchResource = async () => {
    try {
      const response = await axios.get('/api/blogs'); 
      setResource(response.data.blogs || []); // Ensure resource is always an array
    } catch (error) {
      console.error('Failed to fetch resources:', error);
      toast.error('Failed to fetch resources.');
    }
  };

  // Delete Resource
  const deleteBlog = async (mongoId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this tutorials?");
    if (!isConfirmed) return;
    try {
      const response = await axios.delete('/api/blogs', {
        params: { blogId: mongoId },
      });
      toast.success(response.data.msg);
      fetchResource(); // Refresh the list after deletion
    } catch (error) {
      toast.error('Failed to delete the blog.');
    }
  };

  // Fetch Resources on Component Mount
  useEffect(() => {
    fetchResource();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:px-16">
      <h1 className="text-2xl font-bold mb-4">All Blogs</h1>
      <div className="relative h-[80vh] w-full overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="min-w-full text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr className="border-b border-gray-300">
              <th scope="col" className="hidden sm:table-cell px-4 py-3 text-center text-gray-700 uppercase">
                Author Name
              </th>
              <th scope="col" className="px-4 py-3 text-center text-gray-700 uppercase">
                Tutorials Title
              </th>
              <th scope="col" className="px-4 py-3 text-center text-gray-700 uppercase">
                Published on
              </th>
              <th scope="col" className="px-4 py-3 text-center text-gray-700 uppercase">
                Updated on
              </th>
              <th scope="col" className="px-4 py-3 text-center text-gray-700 uppercase">
                Action
              </th>
              <th scope="col" className="px-4 py-3 text-center text-gray-700 uppercase">
                Add New
              </th>
            </tr>
          </thead>
          <tbody>
            {resource.length > 0 ? (
              resource.map((item, index) => (
                <Bloglist
                  key={item._id || index}
                  mongoId={item._id}
                  title={item.title}
                  author={item.author}
                  publishedDate={item.publishedDate}
                  updatedDate={item.updatedDate}
                  deleteBlog={deleteBlog}
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
