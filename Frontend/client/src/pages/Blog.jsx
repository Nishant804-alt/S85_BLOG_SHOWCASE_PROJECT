import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/footer.jsx";
import axios from "axios";

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch blog data based on the blog ID
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/blogs/${id}`, {
          withCredentials: true, // Ensure cookies are sent
        });
        setBlog(response.data.blog);
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlogData();
  }, [id]);

  // Handle the form submission for comments
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/blogs/comment/${blog._id}`,
        {
          content: newComment,
        },
        {
          withCredentials: true, // Ensure cookies are sent
        }
      );
      setComments([...comments, response.data.comment]);
      setNewComment("");

      // Redirect back to the same blog page after adding comment
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="container p-4 mx-auto my-10 mt-24">
        <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md">
          {/* Blog cover image */}
          <img
            src={`http://localhost:3000/uploads/${blog.coverImageUrl}`} // Use the correct path for the image
            className="object-cover w-full h-96"
            alt="Blog cover"
          />
          <div className="p-6">
            <h1 className="mb-4 text-3xl font-bold">{blog.title}</h1>
            <p className="text-lg text-gray-700">{blog.body}</p>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">
            Comments - ({comments.length})
          </h2>
          <form onSubmit={handleCommentSubmit} className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Enter your comment"
              className="w-full p-4 border rounded-lg"
              rows="4"
              required
            ></textarea>
            <button
              type="submit"
              className="px-4 py-2 mt-2 text-white bg-blue-500 rounded btn hover:bg-blue-700"
            >
              Add Comment
            </button>
          </form>
          <div>
            {comments.map((comment) => (
              <div key={comment._id} className="mb-4">
                <div className="flex items-center mb-2">
                  <img
                    src="default-user-image.jpg" // Example for user profile image
                    alt="User"
                    className="w-10 h-10 mr-4 rounded-full"
                  />
                  <div>
                    <p className="font-bold">
                      {comment.createdBy && comment.createdBy.fullName
                        ? comment.createdBy.fullName
                        : "Anonymous"}
                    </p>
                  </div>
                </div>
                <p className="ml-14">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
