// client/src/components/BlogPost.jsx

import React from 'react';

const BlogPost = ({ title, content, author, date }) => {
  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-xl mb-4">
      <h2 className="text-2xl font-bold text-blue-700">{title}</h2>
      <p className="text-gray-700 mt-2">{content}</p>
      <div className="text-sm text-gray-500 mt-4">
        <p>By <span className="font-semibold">{author}</span></p>
        <p>{new Date(date).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default BlogPost;
