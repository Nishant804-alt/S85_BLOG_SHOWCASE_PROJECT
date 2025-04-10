// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/footer";
// import Script from "../components/Script";
// import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";

// const Home = () => {
//   const navigate = useNavigate();
  
//   const [blogs, setBlogs] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isInputFocused, setIsInputFocused] = useState(false);

//   useEffect(() => {
//     // Fetch the blogs from the backend
//     const fetchBlogs = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/blogs");
//         if (!response.ok) {
//           throw new Error("Failed to fetch blogs");
//         }
//         const res = await response.json();
        
//         // Debugging: Log the response data to check if coverImageUrl is present
//         console.log("Fetched Blogs:", res.data); // Check the structure of the data

//         setBlogs(res.data); // Assuming `data` is an object with a `data` property containing the array of blogs
//       } catch (error) {
//         console.error("Error fetching blogs:", error);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleInputFocus = () => {
//     setIsInputFocused(true);
//   };

//   const handleInputBlur = () => {
//     if (searchQuery === "") {
//       setIsInputFocused(false);
//     }
//   };

//   const filteredBlogs = blogs.filter((blog) =>
//     blog.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <>
//       <Navbar />
//       <div className="m-10 mt-24 flex justify-between">
//         <div className="flex items-center">
//           <input
//             type="text"
//             placeholder="Search by title"
//             value={searchQuery}
//             onChange={handleSearch}
//             onFocus={handleInputFocus}
//             onBlur={handleInputBlur}
//             className={`w-[350px] font-medium text-xl px-5 py-2 rounded-lg mr-5 ${
//               isInputFocused && searchQuery !== ""
//                 ? "bg-blue-100 border-blue-400"
//                 : "bg-gray-200 border-gray-400"
//             }`}
//           />
//           <button className="px-3 py-2 border border-black bg-blue-500 text-white rounded-lg">
//             Search
//           </button>
//         </div>
//         <div>
//           <Link
//             to="/blogs/create"
//             className="px-3 py-2 text-white border border-black bg-blue-500 text-2xl rounded-lg"
//           >
//             Create Blog
//           </Link>
//         </div>
//       </div>

//       {/* Blog List */}
//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
//         {filteredBlogs.length > 0 ? (
//           filteredBlogs.map((blog) => {
//             // Debugging: Log the blog object to see its content
//             console.log("Blog:", blog);

//             // Check if coverImageUrl exists and is correct
//             const imageUrl = blog.coverImageUrl ? `http://localhost:3000${blog.coverImageUrl}` : null;
//             console.log("Image URL:", imageUrl); // Log the image URL to see if it's correct

//             return (
//               <div
//                 key={blog._id}
//                 className="p-3 card w-full bg-white shadow-2xl rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
//               >
//                 <div className="mb-2 flex justify-between text-2xl text-primaryColor">
//                   <Link to={`/edit/blog/${blog._id}`}>
//                     <AiFillEdit />
//                   </Link>
//                   <Link to={`/delete/blog/${blog._id}`}>
//                     <AiOutlineDelete className="text-red-500" />
//                   </Link>
//                 </div>
//                 {/* Image Section */}
//                 {imageUrl ? (
//                   <img
//                     src={imageUrl}
//                     className="rounded-lg card-img-top w-full h-48 object-cover"
//                     alt="Blog cover"
//                   />
//                 ) : (
//                   <p>No image available</p> // In case the image URL is missing
//                 )}
//                 <div className="card-body p-4">
//                   <h5 className="card-title text-2xl font-bold mb-2">
//                     {blog.title}
//                   </h5>
//                   <button
//                     onClick={() => navigate(`/blog/${blog._id}`)}
//                     className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
//                   >
//                     View
//                   </button>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p>No blogs found</p> // Display if no blogs match the search
//         )}
//       </div>

//       <Footer />
//       <Script />
//     </>
//   );
// };

// export default Home;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Script from "../components/Script";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";

const Home = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/blogs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const res = await response.json();
        setBlogs(res.data); // assuming API returns { data: [...] }
      } catch (error) {
        console.error("Error fetching blogs:", error.message);
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
    if (searchQuery === "") setIsInputFocused(false);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="m-10 mt-24 flex justify-between flex-wrap gap-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={handleSearch}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className={`w-[300px] font-medium text-lg px-4 py-2 rounded-lg mr-4 transition-all duration-300 ${
              isInputFocused && searchQuery !== ""
                ? "bg-blue-100 border border-blue-400"
                : "bg-gray-100 border border-gray-300"
            }`}
          />
          <button className="px-4 py-2 border border-black bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Search
          </button>
        </div>
        <Link
          to="/blogs/create"
          className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 text-lg rounded-lg transition"
        >
          Create Blog
        </Link>
      </div>

      {/* Blog Grid */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-10">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => {
            const imageUrl = blog.coverImageUrl
              ? `http://localhost:3000${blog.coverImageUrl}`
              : null;

            return (
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Edit/Delete Icons */}
                <div className="flex justify-between p-3 text-xl text-gray-600">
                  <Link to={`/edit/blog/${blog._id}`}>
                    <AiFillEdit className="hover:text-blue-600" />
                  </Link>
                  <Link to={`/delete/blog/${blog._id}`}>
                    <AiOutlineDelete className="text-red-500 hover:text-red-700" />
                  </Link>
                </div>

                {/* Blog Image */}
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Blog Cover"
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="h-48 flex items-center justify-center bg-gray-100 text-gray-500">
                    No image available
                  </div>
                )}

                {/* Blog Content */}
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-3">{blog.title}</h3>
                  <button
                    onClick={() => navigate(`/blog/${blog._id}`)}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                  >
                    View
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No blogs found.
          </p>
        )}
      </div>

      <Footer />
      <Script />
    </>
  );
};

export default Home;
