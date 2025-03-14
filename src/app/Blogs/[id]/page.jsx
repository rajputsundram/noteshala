'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import DOMPurify from "dompurify";
import Image from 'next/image';

const formatDate = (isoDate) => {
  if (!isoDate) return "Unknown Date";
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

const Page = () => {
  const { id } = useParams(); // Retrieve the dynamic route parameter
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const { data } = await axios.get(`/api/blogClient/${id}`);
        if (data.success) {
          setBlog(data.blog);
        } else {
          setError('Blog not found.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (loading)
    return (
      <div className="text-center text-gray-700 dark:text-white">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 dark:text-red-400">
        Error: {error}
      </div>
    );
  if (!blog)
    return (
      <div className="text-center text-gray-700 dark:text-gray-300">
        No blog found.
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 p-4 text-gray-900 dark:text-white">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden flex flex-col items-center text-center p-6">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {blog.title}
        </h1>

        <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-3 mb-4 text-center sm:text-left">
          <div className="w-12 h-12 bg-red-500 text-white flex justify-center items-center text-lg font-bold rounded-full">
            {blog.author?.charAt(0) || "?"}
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Author: {blog.author}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(blog.publishedDate)}
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2">
          <span>&#x1F4C5; Updated on {formatDate(blog.updatedDate)}</span>
        </div>
      </div>

      {/* Blog Main Image */}
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-6 mt-6">
        {blog.image && (
          <div className="relative w-full mb-4" style={{ height: "400px" }}>
            <Image
              src={blog.image}
              alt="Blog Main Image"
              fill
              className="rounded-lg object-cover"
            />
          </div>
        )}

        {/* Blog Content Topics */}
        {blog.topics?.map((topic, index) => (
          <div key={index} className="pt-3 w-full">
            <h3 className="text-2xl font-bold text-gray-900 pb-2 dark:text-white text-start">
              {topic.heading}
            </h3>

            {topic.image && (
              <div className="relative w-full mb-4" style={{ height: "500px" }}>
                <Image
                  src={topic.image}
                  alt="Topic Image"
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            )}

            <div className="mb-4 text-start text-gray-600 dark:text-gray-300">
              {topic.description ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(topic.description),
                  }}
                />
              ) : (
                <p>No description available.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
