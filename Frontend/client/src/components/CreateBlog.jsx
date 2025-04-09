import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "./footer";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null); // Handle file object
  const [body, setBody] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const handleBlogSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("coverImage", coverImage);
    formData.append("body", body);
  
    console.log("FormData: ", formData);
  
    axios
      .post("http://localhost:3000/blogs/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        enqueueSnackbar("Blog Created successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        console.error("Error response:", err.response); // ✅ FIXED
        if (err.response) {
          enqueueSnackbar(`Error: ${err.response.data.message || "Unknown error"}`, {
            variant: "error",
          });
        } else {
          enqueueSnackbar("Network or server error", { variant: "error" });
        }
      });
  };
  

  return (
    <>
      <Navbar />
      <div className="mt-24 flex justify-center items-center h-screen">
        <div className="max-w-xl w-full bg-white p-8 rounded shadow-2xl">
          <h2 className="text-2xl font-bold mb-6">Create Blog</h2>
          <form onSubmit={handleBlogSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <label
                htmlFor="coverImage"
                className="block text-xl font-medium text-gray-700"
              >
                Cover Image
              </label>
              <input
                type="file"
                className="text-xl p-3 mt-1 block w-full border-gray-300 rounded-md shadow-lg focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e) => setCoverImage(e.target.files[0])} // Handle file object
                id="coverImage"
                name="coverImage"
                aria-describedby="coverImage"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-xl font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                className="p-3 text-2xl mt-1 block w-full border-gray-500 rounded-md shadow-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                name="title"
                aria-describedby="title"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="body"
                className="block text-xl font-medium text-gray-700"
              >
                Body
              </label>
              <textarea
                className="p-3 text-2xl mt-1 block w-full border-gray-300 rounded-md shadow-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                name="body"
                id="body"
                rows="5"
              ></textarea>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-xl text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateBlog;
