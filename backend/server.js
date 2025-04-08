const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose"); // ✅ Import mongoose
const connectDatabase = require("./config/db");


dotenv.config(); // Load environment variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDatabase();

// Home Route  - Show MongoDB Connection Status
app.get("/", (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 
        ? "MongoDB Connected☑" 
        : "MongoDB Not Connected✖";
    
    res.send(`<h2>Hello, I am nishant and this is my project</h2>${dbStatus}`);
});



// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
