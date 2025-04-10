import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBlog = () => {
    const token = localStorage.getItem("token"); 

    axios
      .delete(`http://localhost:3000/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        enqueueSnackbar("Blog deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        enqueueSnackbar("Failed to delete blog", { variant: "error" });
        console.error("Delete error:", err);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Delete Blog</h1>
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete this?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBlog}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBlog;
