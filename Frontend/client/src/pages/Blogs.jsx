import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem("token"); // ✅ Get token from localStorage

      try {
        const response = await axios.get("http://localhost:3000/blogs", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Add token to Authorization header
          },
        });
        setBlogs(response.data.data); // Assuming response.data has a 'data' array
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="flex justify-center my-10 mt-24">
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={handleSearch}
          className="w-1/2 px-5 py-2 text-xl font-medium border border-gray-400 rounded-lg focus:border-blue-400 focus:bg-blue-100"
        />
      </div>
      <div className="text-center">
        <h3 className="text-3xl font-semibold">Our Blogs ({filteredBlogs.length})</h3>
        <hr className="mt-2 mb-4 ml-[43%] items-center border-b-4 w-44"/>
      </div>
      <div className="container grid grid-cols-1 gap-10 px-4 mx-auto md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            className="w-full p-3 overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-2xl card hover:shadow-lg"
          >
            <div className="flex justify-between mb-2 text-2xl text-primaryColor">
              <Link to={`/edit/blog/${blog._id}`}>
                <AiFillEdit />
              </Link>
              <Link to={`/delete/blog/${blog._id}`}>
                <AiOutlineDelete className="text-red-500" />
              </Link>
            </div>
            <img
              src={`http://localhost:3000/${blog.coverImageUrl}`}
              className="object-cover w-full h-48 rounded-lg card-img-top"
              alt="Blog cover"
            />
            <div className="p-4 card-body">
              <h5 className="mb-2 text-2xl font-bold card-title">
                {blog.title}
              </h5>
              <button
                onClick={() => navigate(`/blog/${blog._id}`)}
                className="w-full px-4 py-2 text-white transition-colors duration-300 bg-blue-500 rounded hover:bg-blue-700"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Blogs;
