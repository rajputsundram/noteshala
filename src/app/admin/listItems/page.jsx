'use client';
import ResourceTableItem from '../../../components/adminComponent/ResourceTableItems';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Page = () => {
  const [resource, setResource] = useState([]);

  // Fetch Resources
  const fetchResource = async () => {
    try {
      const response = await axios.get('/api/resources');
      setResource(response.data.resources || []); // Ensure resource is always an array
    } catch (error) {
      console.error('Failed to fetch resources:', error);
      toast.error('Failed to fetch resources.');
    }
  };

  // Delete Resource
  const deleteResource = async (mongoId) => {
    try {
      const response = await axios.delete('/api/resources', {
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
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Resources</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Author Name
              </th>
              <th scope="col" className="px-6 py-3">Resource Title</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {resource.length > 0 ? (
              resource.map((item, index) => (
                <ResourceTableItem
                  key={item._id || index}
                  mongoId={item._id}
                  title={item.title}
                  author={item.author}
                  date={item.date}
                  deleteResource={deleteResource}
                />
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
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
