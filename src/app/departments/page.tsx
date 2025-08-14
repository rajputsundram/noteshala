"use client"
import React from 'react';
import { 
  AcademicCapIcon,
  BookOpenIcon,
  ChartBarSquareIcon,
  CloudIcon,
  CodeBracketSquareIcon,
  CpuChipIcon,
  LockClosedIcon,
  RectangleStackIcon
} from '@heroicons/react/24/outline';

const departments = [
  {
    name: "Bachelor of Computer Applications",
    code: "BCA",
    description: "Core programming, software development, and computer fundamentals",
    icon: <CodeBracketSquareIcon className="w-8 h-8 text-green-600" />,
    stats: {
      subjects: 42,
      notes: 1200,
      pyqs: 350
    },
    link: "/bca"
  },
  {
    name: "BCA - Cloud & Information Security",
    code: "BCA-CTIS",
    description: "Cloud computing infrastructure and cybersecurity management",
    icon: <CloudIcon className="w-8 h-8 text-blue-600" />,
    stats: {
      subjects: 36,
      notes: 980,
      pyqs: 240
    },
    link: "/bcactis"
  },
  {
    name: "BCA - Data Science",
    code: "BCA-DS",
    description: "Data analytics, machine learning, and big data systems",
    icon: <ChartBarSquareIcon className="w-8 h-8 text-purple-600" />,
    stats: {
      subjects: 38,
      notes: 1100,
      pyqs: 290
    },
    link: "/bcads"
  },
  {
    name: "Master of Computer Applications",
    code: "MCA",
    description: "Advanced software engineering and system design",
    icon: <CpuChipIcon className="w-8 h-8 text-red-600" />,
    stats: {
      subjects: 48,
      notes: 1500,
      pyqs: 420
    },
    link: "/mca"
  }
];

const DepartmentPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Academic Programs
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore specialized computer applications programs and their resources
        </p>
      </div>

      {/* Department Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {departments.map((dept, index) => (
          <a
            key={index}
            href={dept.link}
            className="group block bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 hover:border-green-500"
          >
            <div className="mb-4">
              <div className="w-12 h-12 bg-green-50 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                {dept.icon}
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dept.code}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                  {dept.name}
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
              {dept.description}
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-xs text-gray-500 dark:text-gray-400">Subjects</div>
                <div className="font-bold text-green-600">{dept.stats.subjects}</div>
              </div>
              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-xs text-gray-500 dark:text-gray-400">Notes</div>
                <div className="font-bold text-green-600">{dept.stats.notes}+</div>
              </div>
              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-xs text-gray-500 dark:text-gray-400">PYQs</div>
                <div className="font-bold text-green-600">{dept.stats.pyqs}+</div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Program Specializations */}
      <div className="mt-24">
        <h2 className="text-2xl font-bold mb-8 text-center">Program Focus Areas</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
            <CodeBracketSquareIcon className="w-8 h-8 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Core Development</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Programming languages, software engineering, DBMS
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
            <LockClosedIcon className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Cyber Security</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Network security, cryptography, cloud security
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
            <ChartBarSquareIcon className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Data Science</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Machine learning, big data analytics, visualization
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
            <RectangleStackIcon className="w-8 h-8 text-red-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Advanced Systems</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Distributed systems, AI, cloud architecture
            </p>
          </div>
        </div>
      </div>

   
    </div>
  );
};

export default DepartmentPage;