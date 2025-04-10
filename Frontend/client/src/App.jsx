// App.jsx
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreateBlog from "./pages/CreateBlog.jsx";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import Contact from "./pages/Contact.jsx";
import Blog from "./pages/Blog.jsx";
import Blogs from "./pages/Blogs.jsx";
import DeleteBlog from "./pages/DeleteBlog.jsx";
import EditBlog from "./pages/EditBlog.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";


const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/blogs"
        element={
          <PrivateRoute>
            <Blogs />
          </PrivateRoute>
        }
      />
      <Route
        path="/blogs/create"
        element={
          <PrivateRoute>
            <CreateBlog />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit/blog/:id"
        element={
          <PrivateRoute>
            <EditBlog />
          </PrivateRoute>
        }
      />
      <Route
        path="/delete/blog/:id"
        element={
          <PrivateRoute>
            <DeleteBlog />
          </PrivateRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <PrivateRoute>
            <Contact />
          </PrivateRoute>
        }
      />
      <Route
        path="/blog/:id"
        element={
          <PrivateRoute>
            <Blog />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
