"use client"
import Link from 'next/link';
import React from 'react';
import { 
  AcademicCapIcon,
  BookOpenIcon,
  CalendarIcon,
  ClockIcon,
  DocumentTextIcon,
  // LibraryIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const teamMembers = [
  {
    name: 'Sundram Kumar',
    position: 'Study Resource Architect',
    image: '/images/sundram.jpg',
    description: 'Curates and verifies academic content from top-performing students and faculty',
    social: {
      github: 'https://github.com/sundram',
      linkedin: 'https://linkedin.com/in/sundram'
    }
  },
  {
    name: 'Akshat',
    position: 'Platform Developer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    description: 'Built the centralized repository for easy access to all study materials',
    social: {
      github: 'https://github.com/akshat',
      linkedin: 'https://linkedin.com/in/akshat'
    }
  },
  {
    name: 'Sumaiya',
    position: 'Academic Organizer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
    description: 'Structures timetables and exam preparation materials',
    social: {
      github: 'https://github.com/sumaiya',
      linkedin: 'https://linkedin.com/in/priya'
    }
  }
];

const AboutNoteshala = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Your Complete Academic Companion for
            <span className="text-green-600 dark:text-green-400 block mt-3">BCA/MCA Success</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Access curated notes, smart timetables, and 10+ years of previous question papers in one place
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Browse Study Materials
            </button>
            <button className="border-2 border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 px-6 py-3 rounded-lg font-medium hover:bg-green-50 dark:hover:bg-gray-800 transition-colors">
              How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="mb-24 grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <BookOpenIcon className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Subject Notes</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Comprehensive notes covering all units with diagrams and examples
          </p>
          <div className="text-green-600 text-sm">
            • 1,500+ Digital Notes<br/>
            • 98% Syllabus Coverage<br/>
            • Semester-wise Categorization
          </div>
        </div>
        
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <CalendarIcon className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold mb-3">Smart Timetables</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Adaptive schedules balancing study time and revisions
          </p>
          <div className="text-green-600 text-sm">
            • Exam Countdowns<br/>
            • Priority-based Planning<br/>
            • Progress Tracking
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <AcademicCapIcon className="h-8 w-8 text-green-600 mb-4" />
          <h3 className="text-xl font-semibold mb-3">PYQ Repository</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Solved previous year papers with marking schemes
          </p>
          <div className="text-green-600 text-sm">
            • 2013-2023 Papers<br/>
            • Model Answers<br/>
            • Difficulty Ratings
          </div>
        </div>
      </section>

      {/* Material Showcase */}
     {/* Material Showcase */}
<section className="mb-24 grid md:grid-cols-2 gap-12 items-center">
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
      Organized for Maximum
      <span className="text-green-600 dark:text-green-400 block">Study Efficiency</span>
    </h2>
    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
      All resources categorized by semester, subject, and resource type:
    </p>
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 bg-green-50 dark:bg-gray-700 rounded-lg">
        <div className="text-green-600 dark:text-green-400 font-medium mb-2">Semester 1-6</div>
        <div className="text-sm text-gray-600 dark:text-gray-300">Gradually released materials</div>
      </div>
      <div className="p-4 bg-green-50 dark:bg-gray-700 rounded-lg">
        <div className="text-green-600 dark:text-green-400 font-medium mb-2">Core Subjects</div>
        <div className="text-sm text-gray-600 dark:text-gray-300">DBMS, OS, Networks, etc.</div>
      </div>
      <div className="p-4 bg-green-50 dark:bg-gray-700 rounded-lg">
        <div className="text-green-600 dark:text-green-400 font-medium mb-2">Resource Types</div>
        <div className="text-sm text-gray-600 dark:text-gray-300">Notes/PYQs/References</div>
      </div>
      <div className="p-4 bg-green-50 dark:bg-gray-700 rounded-lg">
        <div className="text-green-600 dark:text-green-400 font-medium mb-2">File Formats</div>
        <div className="text-sm text-gray-600 dark:text-gray-300">PDF/DOCX/PPTX</div>
      </div>
    </div>
  </div>

  
<div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
  <img 
    src="./images/about.png" 
    alt="Study material" 
    className="object-cover absolute inset-0 w-full h-full"
    onError={(e) => {
      e.currentTarget.src = 'https://source.unsplash.com/800x450/?study,education';
    }}
  />
</div>

</section>


      {/* Team Section */}
      <section className="mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Curated by Academic Achievers
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Our team combines top-performing students and experienced faculty reviewers
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-6 border-4 border-green-100 dark:border-gray-600"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x400';
                }}
              />
              <h3 className="text-xl font-semibold text-center mb-2">{member.name}</h3>
              <p className="text-green-600 dark:text-green-400 text-center mb-4">{member.position}</p>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">{member.description}</p>
              <div className="flex justify-center space-x-4">
                {Object.entries(member.social).map(([platform, url]) => (
                  <a 
                    key={platform} 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors"
                  >
                    {platform === 'github' && (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    )}
                    {platform === 'linkedin' && (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    )}
                    {platform === 'medium' && (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 dark:bg-green-700 rounded-xl p-8 text-center text-white">
        {/* <LibraryIcon className="h-12 w-12 mx-auto mb-6 text-white opacity-90" /> */}
        <h2 className="text-3xl font-bold mb-4">Start Academic Success Today</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Join many BCA/MCA students already using Noteshala to streamline their studies
        </p>
        <div className="max-w-md mx-auto">
          <div className="flex gap-4">
            <Link 
              href="/department"
              className="flex-1 bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Access Resources Now
            </Link>
          </div>
          <p className="text-sm mt-4 opacity-90">
            Free access forever for students • Verified content • Regular updates
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutNoteshala;