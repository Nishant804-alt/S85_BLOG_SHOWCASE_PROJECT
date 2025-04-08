// client/src/App.jsx

import React from 'react';
import BlogPost from './components/BlogPost';

function App() {
  const dummyBlog = {
    title: "Why I Built Blogify 🚀",
    content:
      "Blogify is a blogging platform built during the ASAP program. It allows users to create, read, update, and delete blog posts with ease!",
    author: "Nishant",
    date: "2025-04-07",
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl text-center font-bold mb-6 text-purple-800">Welcome to Blogify</h1>
      <BlogPost {...dummyBlog} />
    </div>
  );
}

export default App;
