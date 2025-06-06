// Home.jsx

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "./footer";
import Script from "../components/Script";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";

const Home = () => {
  const navigate = useNavigate();
  
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    // Fetch the blogs from the backend
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const res = await response.json();
        setBlogs(res.data); // Assuming `data` is an object with a `data` property containing the array of blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    if (searchQuery === "") {
      setIsInputFocused(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="m-10 mt-24 flex justify-between">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={handleSearch}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className={`w-[350px] font-medium text-xl px-5 py-2 rounded-lg mr-5 ${
              isInputFocused && searchQuery !== ""
                ? "bg-blue-100 border-blue-400"
                : "bg-gray-200 border-gray-400"
            }`}
          />
          <button className="px-3 py-2 border border-black bg-blue-500 text-white rounded-lg">
            Search
          </button>
        </div>
        <div>
          <Link
            to="/blogs/create"
            className="px-3 py-2 text-white border border-black bg-blue-500 text-2xl rounded-lg"
          >
            Create Blog
          </Link>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
        {filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            className="p-3 card w-full bg-white shadow-2xl rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-2 flex justify-between text-2xl text-primaryColor">
              <Link to={`/edit/blog/${blog._id}`}>
                <AiFillEdit />
              </Link>
              <Link to={`/delete/blog/${blog._id}`}>
                <AiOutlineDelete className="text-red-500" />
              </Link>
            </div>
            <img
              src={`http://localhost:3000${blog.coverImageUrl}`}
              className="rounded-lg card-img-top w-full h-48 object-cover"
              alt="Blog cover"
            />
            <div className="card-body p-4">
              <h5 className="card-title text-2xl font-bold mb-2">
                {blog.title}
              </h5>
              <button
                onClick={() => navigate(`/blog/${blog._id}`)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
      <Script />
    </>
  );
};

export default Home;
