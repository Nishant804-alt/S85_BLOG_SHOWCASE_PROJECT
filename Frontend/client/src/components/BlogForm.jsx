import React, { useState } from "react";

const BlogForm = ({ onAddBlog }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    onAddBlog(data); // Update parent state
    setFormData({ title: "", content: "", author: "" }); // Reset form
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 mb-10"
    >
      <h2 className="text-2xl font-semibold mb-4 text-purple-700">
        Add a New Blog ✍️
      </h2>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="w-full border p-2 mb-3 rounded"
      />
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Content"
        required
        className="w-full border p-2 mb-3 rounded h-28"
      />
      <input
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Author"
        required
        className="w-full border p-2 mb-4 rounded"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800"
      >
        Post Blog
      </button>
    </form>
  );
};

export default BlogForm;
