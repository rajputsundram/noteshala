'use client'
import React, { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import Loading from '../../components/Loader'

export const dynamic = 'force-dynamic';

const SyllabusPage = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const fetchResources = async () => {
    try {
      setLoading(true);

      const year = searchParams.get("year");
      const department = searchParams.get("department");
      const category = searchParams.get("category");

      const params = { year, department, category };
      const response = await axios.get('/api/resources', { params });

      setCardData(response.data.resources || []);
    } catch (error) {
      console.error("❌ Error fetching resources:", error);
      setCardData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [searchParams.toString()]);

  const renderCardsBySemester = (semester) => {
    const filtered = cardData.filter(item => item.semester === semester);

    if (loading) return <Loading />;
    if (!loading && filtered.length === 0) {
      return <p className="text-white text-center w-full">No resources found.</p>;
    }

    return filtered.map((item, index) => (
      <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 max-w-xs bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-[350px]">
        <div className="h-48">
          <Image
            src={'/images/dsa.png'}
            width={200}
            height={150}
            alt="Card Image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex flex-col justify-between h-full">
          <h2 className="text-lg font-bold mb-2 text-black">{item.title}</h2>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{item.description}</p>
          <div className="mt-auto">
            <Link href={item.link || '#'} className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-full text-center">
              Open Now
            </Link>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="text-center mb-8 mt-12">
        <h2 className="text-3xl font-bold text-white inline-block border-b-4 border-green-400 pb-1">
          First Semester
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-6 p-4">
        {renderCardsBySemester("first")}
      </div>

      <div className="text-center mb-8 mt-12">
        <h2 className="text-3xl font-bold text-white inline-block border-b-4 border-green-400 pb-1">
          Second Semester
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-6 p-4">
        {renderCardsBySemester("second")}
      </div>
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<Loading />}>
    <SyllabusPage />
  </Suspense>
);

export default Page;
