// import { validateToken } from "../services/authentication.js";

// export function checkForAuthenticationHeader() {
//   return (req, res, next) => {
//     const authHeader = req.headers["authorization"];

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       // No token found in header
//       return next();
//     }

//     const token = authHeader.split(" ")[1]; // Extract token after 'Bearer '

//     try {
//       const userPayload = validateToken(token);
//       req.user = userPayload;
//     } catch (error) {
//       console.error("Error validating token:", error.message);
//     }

//     return next();
//   };
// }

// middleware/auth.js
// const jwt = require("jsonwebtoken");
// const User = require("../models/user.js");

// const authenticateUser = async (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");

//   if (!token) return res.status(401).json({ message: "No token" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);

//     if (!user) return res.status(404).json({ message: "User not found" });

//     req.user = { id: user._id }; // Attach user info
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = authenticateUser;


// middlewares/authMiddleware.js
// middlewares/auth.middleware.js



// import jwt from "jsonwebtoken";

// export const checkForAuthenticationHeader = (req, res, next) => {
//   const token = req.headers["authorization"]?.split(" ")[1];

//   if (!token) {
//     req.user = null;
//     return next();
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error("❌ Invalid JWT:", err.message);
//     req.user = null;
//     next(); // Don't block, just proceed without user
//   }
// };

import jwt from "jsonwebtoken";
import User from "../models/user.js";

const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // or { id: user._id, fullName: user.fullName }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticateUser;
