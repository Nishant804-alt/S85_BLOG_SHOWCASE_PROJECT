import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [coverImage, setCoverImage] = useState(null); // renamed from image
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    if (coverImage) formData.append("coverImage", coverImage); // ✅ corrected field name

    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:3000/blogs/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      enqueueSnackbar("Blog created successfully!", { variant: "success" });
      navigate("/");
    } catch (err) {
      enqueueSnackbar("Failed to create blog", { variant: "error" });
      console.error("Create blog error:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Title:</label>
        <input
          type="text"
          className="w-full border p-2 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium">Body:</label>
        <textarea
          className="w-full border p-2 rounded mb-4"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        <label className="block mb-2 font-medium">Cover Image:</label>
        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={(e) => setCoverImage(e.target.files[0])}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
