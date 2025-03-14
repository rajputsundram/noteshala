import React from 'react';

const teamMembers = [
  {
    name: 'Sundram',
    position: 'Fullstack Developer',
    image: './images/sundram.jpg', // Replace with actual image URL
    description: 'Specializes in building robust APIs and database management.',
  },
  {
    name: 'Akshat',
    position: 'Frontend Developer',
    image: 'https://via.placeholder.com/100',
    description: 'Passionate about building intuitive user interfaces and enhancing user experience.',
  },
  // Additional team members can be added here.
];

const AboutNoteshala = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 text-gray-800 dark:text-gray-200">
      {/* About Noteshala Section */}
      <section className="mb-12 text-center">
        <div className="flex justify-center items-center h-20 mb-4">
          <h1 className="text-gray-700 dark:text-white font-bold border-b-4 border-green-400 text-4xl">
            About Noteshala
          </h1>
        </div>
        <p className="text-lg leading-relaxed max-w-3xl mx-auto">
          Noteshala is a dedicated platform providing comprehensive notes, timetables, and previous year
          question papers for BCA (Bachelor of Computer Applications) and MCA (Master of Computer Applications) students.
          Our goal is to make learning easier and more accessible for students worldwide.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="mb-12 text-center">
        <div className="flex justify-center items-center h-20 mb-4">
          <h1 className="text-gray-700 dark:text-white font-bold border-b-4 border-green-400 text-4xl">
            Our Mission
          </h1>
        </div>
        <p className="text-lg leading-relaxed max-w-3xl mx-auto">
          We aim to empower students by providing high-quality, well-structured study resources that help them excel academically.
          Noteshala is designed to bridge the gap between students and essential study materials, ensuring seamless learning experiences.
        </p>
      </section>

      {/* Team Section */}
      <section>
        <div className="flex justify-center items-center  h-20 mb-4">
          <h1 className="text-gray-700 dark:text-white font-bold border-b-4 border-green-400 text-4xl">
            Meet Our Team
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 text-center justify-items-center">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg text-center hover:shadow-2xl transition duration-300 w-full max-w-sm"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-green-500"
              />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{member.name}</h3>
              <p className="text-green-600 dark:text-green-400 font-medium">{member.position}</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{member.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutNoteshala;
