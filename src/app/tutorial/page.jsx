'use client'
import React, { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import Loading from '../../components/Loader'

export const dynamic = 'force-dynamic'

const PreviousYearPaperPage = () => {
  const [cardData, setCardData] = useState([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  const fetchResources = async () => {
    try {
      setLoading(true)
      const year = searchParams.get('year')
      const department = searchParams.get('department')
      const params = { year, department }
      const response = await axios.get('/api/tutorialsClient', { params })
      setCardData(response.data.resources || [])
    } catch (error) {
      console.error('❌ Error fetching resources:', error)
      setCardData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResources()
  }, [searchParams.toString()])

  const renderButtonsBySemester = (semester) => {
    const items = cardData.filter(item => item.semester === semester)
    if (loading) {
      return <Loading />
    }
    if (!loading && items.length === 0) {
      return <p className="text-center text-white w-full">No resources found.</p>
    }
    return items.map((item, idx) => (
      <div key={idx}>
        <Link href={`/tutorial/${item._id}`}>
          <button
            type="button"
            className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
          >
            {item.title}
          </button>
        </Link>
      </div>
    ))
  }

  return (
    <div>
      {/* First Semester */}
      <div className="text-center mb-8 mt-12">
        <h2 className="text-3xl font-bold text-white inline-block border-b-4 border-green-400 pb-1">
          First Semester
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-6 p-4">
        {renderButtonsBySemester('first')}
      </div>

      {/* Second Semester */}
      <div className="text-center mb-8 mt-12">
        <h2 className="text-3xl font-bold text-white inline-block border-b-4 border-green-400 pb-1">
          Second Semester
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-6 p-4">
        {renderButtonsBySemester('second')}
      </div>
    </div>
  )
}

const Page = () => (
  <Suspense fallback={<Loading />}>
    <PreviousYearPaperPage />
  </Suspense>
)

export default Page
