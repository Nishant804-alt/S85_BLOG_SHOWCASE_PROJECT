// import multer from "multer";
// import path from "path";
// import Blog from "../models/blog.js";
// import Comment from "../models/comments.js";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.resolve(`./public/uploads/`));
//   },
//   filename: function (req, file, cb) {
//     const fileName = `${Date.now()}-${file.originalname}`;
//     cb(null, fileName);
//   },
// });

// const upload = multer({ storage: storage });

// export async function getAllBlogs(req, res) {
//   try {
//     const blogs = await Blog.find({});
//     return res.status(200).json({
//       count: blogs.length,
//       data: blogs,
//     });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// }

// export async function getSingleBlog(req, res) {
//   try {
//     const blog = await Blog.findById(req.params.id).populate("createdBy");
//     const comments = await Comment.find({ blogId: req.params.id }).populate(
//       "createdBy"
//     );
//     return res.json({
//       user: req.user,
//       blog,
//       comments,
//     });
//   } catch (error) {
//     console.error("Error fetching blog or comments:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }

// export async function editBlog(req, res) {
//   try {
//     const { id } = req.params;
//     const blog = await Blog.findById(id);
//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }
//     res.status(200).json({
//       ...blog._doc,
//       coverImageUrl: blog.coverImageUrl
//         ? `${req.protocol}://${req.get("host")}${blog.coverImageUrl}`
//         : null,
//     });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// }

// export const updateBlog = [
//   upload.single("coverImage"),
//   async (req, res) => {
//     const { title, body } = req.body;
//     try {
//       if (!title || !body) {
//         return res.status(400).send({
//           message: "Send All required fields: title, body, coverImage",
//         });
//       }

//       const { id } = req.params;
//       const updateData = { title, body };

//       if (req.file) {
//         updateData.coverImageUrl = `/uploads/${req.file.filename}`;
//       }

//       const result = await Blog.findByIdAndUpdate(id, updateData, {
//         new: true,
//       });

//       if (!result) {
//         return res.status(404).send({ message: "Blog not found" });
//       }

//       return res
//         .status(200)
//         .send({ message: "Blog updated successfully", blog: result });
//     } catch (err) {
//       console.log(err.message);
//       res.status(500).send({ message: err.message });
//     }
//   },
// ];

// export async function commentOnBlog(req, res) {
//   const { content } = req.body;
//   try {
//     const comment = await Comment.create({
//       content: content,
//       blogId: req.params.blogId,
//     });
//     return res.json({
//       message: "Comment added successfully",
//       comment,
//     });
//   } catch (error) {
//     console.error("Error adding comment:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }

// export const createNewBlog = [
//   upload.single("coverImage"),
//   async (req, res) => {
//     try {
//       // Log request data to check if everything is being passed correctly
//       console.log("Request Body:", req.body); // Log the form data
//       console.log("Request File:", req.file);  // Log the uploaded file

//       const { title, body } = req.body;
//       const coverImageUrl = req.file ? `/uploads/${req.file.filename}` : null;

//       if (!title || !body) {
//         return res.status(400).json({ message: "Title and body are required" });
//       }

//       // Create a new blog entry
//       const blog = await Blog.create({
//         title,
//         body,
//         coverImageUrl,
//       });

//       return res.json({
//         message: "Blog created successfully",
//         blog,
//       });
//     } catch (error) {
//       console.error("Error creating blog:", error); // More detailed error logging
//       return res.status(500).json({ message: "Internal Server Error" });
//     }
//   },
// ];

// export async function deleteBlog(req, res) {
//   try {
//     const { id } = req.params;
//     const result = await Blog.findByIdAndDelete(id);

//     if (!result) {
//       return res.status(404).send({ message: "Blog not found" });
//     }
//     return res.status(200).send({ message: "Blog deleted successfully" });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ message: err.message });
//   }
// }

import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import Blog from "../models/blog.js";
import Comment from "../models/comments.js";

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads/"));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

// Utility: check if ID is valid
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Get all blogs
export async function getAllBlogs(req, res) {
  try {
    const blogs = await Blog.find({});
    return res.status(200).json({
      count: blogs.length,
      data: blogs,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
}

// Get single blog and its comments
export async function getSingleBlog(req, res) {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Blog ID" });
    }

    const blog = await Blog.findById(id).populate("createdBy");
    const comments = await Comment.find({ blogId: id }).populate("createdBy");

    return res.json({
      user: req.user,
      blog,
      comments,
    });
  } catch (error) {
    console.error("Error fetching blog or comments:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get blog for editing
export async function editBlog(req, res) {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Blog ID" });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      ...blog._doc,
      coverImageUrl: blog.coverImageUrl
        ? `${req.protocol}://${req.get("host")}${blog.coverImageUrl}`
        : null,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
}

// Update blog
export const updateBlog = [
  upload.single("coverImage"),
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid Blog ID" });
      }

      const { title, body } = req.body;
      if (!title || !body) {
        return res.status(400).send({
          message: "Send all required fields: title, body",
        });
      }

      const updateData = { title, body };
      if (req.file) {
        updateData.coverImageUrl = `/uploads/${req.file.filename}`;
      }

      const result = await Blog.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!result) {
        return res.status(404).send({ message: "Blog not found" });
      }

      return res
        .status(200)
        .send({ message: "Blog updated successfully", blog: result });
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  },
];

// Comment on blog
export async function commentOnBlog(req, res) {
  const { content } = req.body;
  const { blogId } = req.params;

  try {
    if (!isValidObjectId(blogId)) {
      return res.status(400).json({ message: "Invalid Blog ID" });
    }

    // Create the comment
    const comment = await Comment.create({
      content,
      blogId,
      createdBy: req.user._id,
    });

    // Populate the createdBy field with fullName
    const populatedComment = await comment.populate("createdBy", "fullName");

    return res.json({
      message: "Comment added successfully",
      comment: populatedComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Create a new blog
export const createNewBlog = [
  upload.single("coverImage"),
  async (req, res) => {
    try {
      const { title, body } = req.body;
      const coverImageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      if (!title || !body) {
        return res.status(400).json({ message: "Title and body are required" });
      }

      const blog = await Blog.create({
        title,
        body,
        coverImageUrl,
        createdBy: req.user._id, // assuming authentication is used
      });

      return res.json({
        message: "Blog created successfully",
        blog,
      });
    } catch (error) {
      console.error("Error creating blog:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

// Delete blog
export async function deleteBlog(req, res) {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Blog ID" });
    }

    const result = await Blog.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Blog not found" });
    }
    return res.status(200).send({ message: "Blog deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
}
