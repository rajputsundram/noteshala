'use client'
import React, { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

// Ensure dynamic rendering for this page
export const dynamic = 'force-dynamic';

const PreviousYearPaperPage = () => {
  const [cardData, setCardData] = useState([]);
  const searchParams = useSearchParams(); // Get URL parameters

  const fetchResources = async () => {
    try {
      // Extract query parameters from URL
      const year = searchParams.get("year");
      const department = searchParams.get("department");
    

    //   console.log("🔍 Extracted URL Params:", { year, department, category });

      // Construct query parameters for API request
      const params = { year, department };

      console.log("🚀 Fetching with params:", params);

      // Send GET request to the backend API with query params
      const response = await axios.get('/api/tutorialsClient', { params });

      console.log("✅ API Response Data:", response.data);

      // Set the fetched resources into state
      setCardData(response.data.resources || []);
    } catch (error) {
      console.error("❌ Error fetching resources:", error);
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
        {cardData.length > 0 ? (
          cardData.filter(item => item.semester === "first").map((item, index) => (
            <div
              key={index}
              className=""
            >
                  <Link
                    href={`/tutorial/${item._id}`}
                    className=""
                  >
                    <button type="button" class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">{item.title}</button>
                  </Link>
                
              
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
        {cardData.length > 0 ? (
          cardData.filter(item => item.semester === "second").map((item, index) => (
            <div
            key={index}
            className=""
          >
                <Link
                  href={`/tutorial/${item._id}`}
                  className=""
                >
                  <button type="button" class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">{item.title}</button>
                </Link>
              
            
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
  <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
    <PreviousYearPaperPage />
  </Suspense>
);

export default Page;
