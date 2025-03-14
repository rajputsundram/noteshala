'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const { data } = await axios.get("/api/blogClient");
        if (data.success) {
          setBlogs(data.blogs);
        } else {
          setError("Failed to load blogs.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading)
    return <div className="flex justify-center items-center h-[900px]">Loading...</div>;
  if (error)
    return <div className="flex justify-center items-center h-[900px]">Error: {error}</div>;

  return (
    <div className="flex justify-center items-center flex-wrap gap-5 py-10">
      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
        >
          <Link href={`/blogs/${blog._id}`}>
            <Image
              className="rounded-t-lg"
              src={blog.image || "https://via.placeholder.com/500"}
              height={500}
              width={500}
              alt={blog.title}
            />
          </Link>
          <div className="p-5">
            <Link href={`/blogs/${blog._id}`}>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {blog.title}
              </h5>
            </Link>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-300">
              <span className="text-green-600">Author:</span> {blog.author}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {blog.description?.substring(0, 100)}...
            </p>
            <Link
              href={`/Blogs/${blog._id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
