import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Load environment variables
dotenv.config();

// Setup Express App
const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/blogify";

// Setup __dirname (for ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Routes
import userRoute from "./Routes/user.js";
import blogRoute from "./Routes/blog.js";
import contactRoute from "./Routes/contact.js";

// Models
import Blog from "./models/blog.js";

// MongoDB Connection with Retry Logic
const connectWithRetry = () => {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => {
      console.error("❌ MongoDB Connection Error:", err.message);
      setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files for Image Uploads
app.use("/uploads", express.static(path.resolve(__dirname, "public/uploads")));

// Optional: EJS Setup for Rendering Templates
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

// Routes
app.use("/user", userRoute);
app.use("/blogs", blogRoute);
app.use("/contact", contactRoute);

// Home Route (renders all blogs)
app.get("/", async (req, res) => {
  try {
    const allBlogs = await Blog.find({}).sort("-createdAt");
    res.render("home", {
      user: req.user || null,
      blogs: allBlogs,
    });
  } catch (err) {
    console.error("❌ Error fetching blogs:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌", err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
