import React from "react";

const InfoSection = () => {
  return (
    <div
      className="relative bg-cover bg-center py-16"
      style={{ backgroundImage: "url('/images.jfif')" }} // Add your image URL here
    >
      {/* Translucent Background Overlay */}
      <div className="absolute inset-0 bg-blue-900 bg-opacity-70"></div>

      {/* Content */}
      <div className="relative container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 text-white">
        {/* Card 1 */}
        <div className="text-center">
          <div className="mb-4">
            {/* Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9-5 9 5-9 5z"
              />
            </svg>
          </div>
          <h3 className="text-green-400 font-bold text-xl mb-4">Our Philosophy</h3>
          <p className="text-gray-300">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis
            recusandae, iure repellat quis delectus ea? Dolore, amet
            reprehenderit.
          </p>
        </div>

        {/* Card 2 */}
        <div className="text-center">
          <div className="mb-4">
            {/* Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9-5 9 5-9 5z"
              />
            </svg>
          </div>
          <h3 className="text-green-400 font-bold text-xl mb-4">Academics Principle</h3>
          <p className="text-gray-300">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis
            recusandae, iure repellat quis delectus ea? Dolore, amet
            reprehenderit.
          </p>
        </div>

        {/* Card 3 */}
        <div className="text-center">
          <div className="mb-4">
            {/* Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9-5 9 5-9 5z"
              />
            </svg>
          </div>
          <h3 className="text-green-400 font-bold text-xl mb-4">Key of Success</h3>
          <p className="text-gray-300">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis
            recusandae, iure repellat quis delectus ea? Dolore, amet
            reprehenderit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
