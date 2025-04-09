import dotenv from "dotenv";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Models & Routes
import Blog from "./models/blog.js";
import blogRoute from "./Routes/blog.js";
import contactRoute from "./Routes/contact.js";

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

// Connect to MongoDB with retry logic
const connectWithRetry = () => {
  mongoose.connect(MONGO_URL).then(() => {
    console.log("✅ MongoDB Connected");
  }).catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
  });
};

connectWithRetry();

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Ensure the frontend can make requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploads folder)
app.use('/uploads', express.static(path.resolve(__dirname, 'public/uploads')));  // Serving images from uploads

// Routes
app.use("/blogs", blogRoute);
app.use("/contact", contactRoute);

// Home Page Route
app.get("/", async (req, res) => {
  try {
    const allBlogs = await Blog.find({}).sort("-createdAt"); // Fetch and sort blogs by creation date
    res.render("home", {
      user: req.user || null, // Add user to the template if exists
      blogs: allBlogs,        // Pass the fetched blogs to the template
    });
  } catch (err) {
    console.error("❌ Error fetching blogs:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

// Error Handling Middleware (generic error handler)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server started at: http://localhost:${PORT}`);
});
