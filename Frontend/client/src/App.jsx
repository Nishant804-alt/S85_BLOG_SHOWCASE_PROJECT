import React, { useEffect, useState } from "react";
import BlogPost from "./components/BlogPost";
import BlogForm from "./components/BlogForm";

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  const addBlogToList = (newBlog) => {
    setBlogs([newBlog, ...blogs]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-purple-800">
        Blogify - Live Blogs from MongoDB
      </h1>

      <BlogForm onAddBlog={addBlogToList} />

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
