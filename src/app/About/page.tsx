import React from 'react';

const teamMembers = [
  {
    name: 'sundri',
    position: 'dev',
    image: 'https://via.placeholder.com/100', // Replace with actual image URLs
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi hendrerit elit',
  },
  {
    name: 'sam',
    position: 'dev',
    image: 'https://via.placeholder.com/100', // Replace with actual image URLs
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi hendrerit elit',
  },
  {
    name: 'nini',
    position: 'dev',
    image: 'https://via.placeholder.com/100', // Replace with actual image URLs
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit morbi hendrerit elit',
  },
];

const AboutNoteshala = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 text-gray-800 dark:text-gray-200">
      {/* About Noteshala Section */}
      <section className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-4">About Noteshala</h2>
        <div className="w-16 h-1 bg-green-600 mx-auto mb-6"></div>
        <p className="text-lg leading-relaxed">
          Noteshala is a dedicated platform that provides comprehensive notes and resources for BCA (Bachelor of Computer Applications) and MCA (Master of Computer Applications) students. With a focus on clarity, accessibility, and academic success, Noteshala aims to support students in mastering course content and excelling in their studies.
        </p>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-4">Our Team</h2>
        <div className="w-16 h-1 bg-green-600 mx-auto mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{member.name}</h3>
              <p className="text-gray-500 dark:text-gray-400">{member.position}</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{member.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutNoteshala;
