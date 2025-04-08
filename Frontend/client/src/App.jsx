import React, { useEffect, useState } from "react";
import BlogPost from "./components/BlogPost";
import BlogForm from "./components/BlogForm";

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  const handleNewPost = (newBlog) => {
    setBlogs((prev) => [newBlog, ...prev]); // Add on top
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl text-center font-bold mb-6 text-purple-800">
        Blogify - Live Blogs from MongoDB
      </h1>

      <BlogForm onPost={handleNewPost} />

      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogPost
            key={blog._id}
            title={blog.title}
            content={blog.content}
            author={blog.author}
            date={blog.createdAt}
          />
        ))
      ) : (
        <p className="text-center text-gray-600">Loading blogs...</p>
      )}
    </div>
  );
}

export default App;
