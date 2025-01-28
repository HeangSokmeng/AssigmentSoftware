import React from 'react';

const ShowVid = () => {
  const files = [
    {
      type: 'document',
      name: 'Project Plan.pdf',
      icon: '📄',
      url: '/files/project-plan.pdf', // Replace with actual file URL
    },
    {
      type: 'photo',
      name: 'Beach Sunset.jpg',
      icon: '🖼️',
      url: '/files/beach-sunset.jpg', // Replace with actual file URL
    },
    {
      type: 'document',
      name: 'Meeting Notes.docx',
      icon: '📄',
      url: '/files/meeting-notes.docx', // Replace with actual file URL
    },
    {
      type: 'photo',
      name: 'Mountain View.png',
      icon: '🖼️',
      url: '/files/mountain-view.png', // Replace with actual file URL
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Your Files
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 rounded-lg p-4 shadow hover:shadow-lg transition duration-200 border border-gray-200"
          >
            <span className="text-4xl mr-4">{file.icon}</span>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{file.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{file.type}</p>
            </div>
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 active:bg-blue-700 transition duration-200"
            >
              View
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowVid;
