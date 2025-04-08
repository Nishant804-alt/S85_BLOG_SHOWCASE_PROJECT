const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDatabase = require("./config/db");
const mongoose = require("mongoose");

dotenv.config(); // Load .env variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDatabase();

// Import Routes
const blogRoutes = require("./routes/blogRoutes");
app.use("/", blogRoutes);

// Test Home Route
app.get("/", (req, res) => {
  const dbStatus =
    mongoose.connection.readyState === 1
      ? "✅ MongoDB Connected"
      : "❌ MongoDB Not Connected";
  res.send(`<h2>Hi, I'm Nishant – Welcome to Blogify!</h2><p>${dbStatus}</p>`);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
);
