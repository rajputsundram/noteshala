'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

export default function BlogList() {
  const [menu, setMenu] = useState("All");
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[600px]">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[600px]">
        Error: {error}
      </div>
    );
  }

  // derive unique categories
  const categories = ["All", ...Array.from(new Set(blogs.map(b => b.category)))];

  // filter blogs by menu
  const filtered = blogs.filter(b => menu === "All" ? true : b.category === menu);

  return (
    <div className="px-4 py-8">
      {/* category buttons */}
      <div className="flex justify-center gap-4 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setMenu(cat)}
            className={`py-2 px-4 rounded ${
              menu === cat
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* blogs grid */}
      <div className="flex justify-center flex-wrap gap-6">
        {filtered.map(blog => (
          <div
            key={blog._id}
            className="w-[330px] h-[430px] flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700"
          >
            <Link href={`/blogs/${blog._id}`} className="block">
              <Image
                src={blog.image || "https://via.placeholder.com/300x220"}
                alt={blog.title}
                width={300}
                height={220}
                className="w-full h-[220px] object-cover"
              />
            </Link>

            <div className="flex-grow p-5 flex flex-col justify-between">
              <div>
                <Link href={`/blogs/${blog._id}`}>
                  <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    {blog.title}
                  </h5>
                </Link>
              
                <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
                  {blog.description?.substring(0, 100)}...
                </p>
              </div>

              <Link
                href={`/blogs/${blog._id}`}
                className="mt-auto inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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

        {filtered.length === 0 && (
          <p className="text-center text-gray-500">No posts in “{menu}” yet.</p>
        )}
      </div>
    </div>
  );
}
