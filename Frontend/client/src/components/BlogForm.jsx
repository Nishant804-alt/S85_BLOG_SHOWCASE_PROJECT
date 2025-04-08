import React, { useState } from "react";

const BlogForm = ({ onPost }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const newBlog = await res.json();
      onPost(newBlog);
      setFormData({ title: "", content: "", author: "" });
    } catch (err) {
      console.error("Error posting blog:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mb-10 p-6 bg-white rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-purple-300"
    >
      <h2 className="text-2xl font-bold mb-6 text-purple-800 text-center animate-fade-in-down">
        ✍️ Write a New Blog
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Enter blog title..."
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full mb-4 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
      />

      <textarea
        name="content"
        placeholder="Write your blog content..."
        value={formData.content}
        onChange={handleChange}
        required
        rows="5"
        className="w-full mb-4 p-3 border border-purple-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
      />

      <input
        type="text"
        name="author"
        placeholder="Author name"
        value={formData.author}
        onChange={handleChange}
        className="w-full mb-6 p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
      />

      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 hover:scale-105 transition-transform duration-300"
      >
        🚀 Publish Blog
      </button>
    </form>
  );
};

export default BlogForm;
