import React from 'react';

const Page = () => {
  const files = [
    {
      title: 'Title 1',
      description: 'This is a short description for the first post.',
      category: 'Category',
      icon: 'https://via.placeholder.com/40', // Replace with your logo or image
      time: '32 minutes ago',
      thumbnail: 'https://via.placeholder.com/100',
    },
    {
      title: 'Title 2',
      description:
        'This is a description for the second post, providing more details.',
      category: 'Programming/Coding Tips',
      icon: 'https://via.placeholder.com/40',
      time: 'December 23, 2024',
      thumbnail: 'https://via.placeholder.com/100',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Recent Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex flex-col bg-gray-100 rounded-lg p-4 shadow hover:shadow-lg transition duration-200 border border-gray-200"
          >
            {/* Icon/Logo */}
            <div className="flex items-center mb-4">
              <img
                src={file.icon}
                alt={`Logo for ${file.title}`}
                className="rounded-full w-12 h-12 mr-4"
              />
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">
                  {file.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{file.time}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4">{file.description}</p>

            {/* Category */}
            <span className="text-xs px-2 py-1 bg-gray-200 rounded text-gray-700 self-start">
              {file.category}
            </span>

            {/* Thumbnail */}
            <img
              src={file.thumbnail}
              alt={`Thumbnail for ${file.title}`}
              className="rounded-lg w-full h-32 object-cover mt-4"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
