'use client'

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import Loader from '../../components/Loader'; // <-- import your loader

// Ensure dynamic rendering
export const dynamic = 'force-dynamic';

const NotesPage = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams(); // Get URL parameters

  const fetchResources = async () => {
    try {
      setLoading(true);
      // Extract query parameters from URL
      const year = searchParams.get("year");
      const department = searchParams.get("department");
      const category = searchParams.get("category");

      console.log("🔍 Extracted URL Params:", { year, department, category });

      // Construct query parameters for API request
      const params = { year, department, category };
      console.log("🚀 Fetching with params:", params);

      // Send GET request to the backend API with query params
      const response = await axios.get('/api/resources', { params });
      console.log("✅ API Response Data:", response.data);

      // Set the fetched resources into state
      setCardData(response.data.resources || []);
    } catch (error) {
      console.error("❌ Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch when search parameters change
  useEffect(() => {
    console.log("🔄 useEffect triggered. Fetching resources...");
    fetchResources();
  }, [searchParams.toString()]); // Ensures re-fetching when search parameters change

  return (
    <div>
      <div className="text-center mb-8 mt-12">
        <h2 className="text-3xl font-bold text-white inline-block border-b-4 border-green-400 pb-1">
          First Semester
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-6 p-4">
        {loading ? (
          <Loader />
        ) : cardData.filter(item => item.semester === "first").length > 0 ? (
          cardData.filter(item => item.semester === "first").map((item, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 max-w-xs bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-[350px]"
            >
              <div className="h-48">
                <Image
                  src={item.image}
                  width={200}
                  height={150}
                  alt="Card Image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col justify-between h-full">
                <h2 className="text-lg font-bold mb-2 text-black">{item.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {item.description}
                </p>
                <div className="mt-auto">
                  <Link
                    href={item.pdf || '#'}
                    className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-full text-center"
                  >
                    Open Now
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white">No resources found.</p>
        )}
      </div>

      <div className="text-center mb-8 mt-12">
        <h2 className="text-3xl font-bold text-white inline-block border-b-4 border-green-400 pb-1">
          Second Semester
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-6 p-4">
        {loading ? (
          <Loader />
        ) : cardData.filter(item => item.semester === "second").length > 0 ? (
          cardData.filter(item => item.semester === "second").map((item, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 max-w-xs bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-[350px]"
            >
              <div className="h-48">
                <Image
                  src={item.image}
                  width={200}
                  height={150}
                  alt="Card Image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col justify-between h-full">
                <h2 className="text-lg font-bold mb-2 text-black">{item.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {item.description}
                </p>
                <div className="mt-auto">
                  <Link
                    href={item.pdf || '#'}
                    className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-full text-center"
                  >
                    Open Now
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-white">No resources found.</p>
        )}
      </div>
    </div>
  );
};

// ✅ Wrap the component in Suspense (optional but recommended for a better UX)
const Page = () => (
  <Suspense fallback={<Loader />}>
    <NotesPage />
  </Suspense>
);

export default Page;
