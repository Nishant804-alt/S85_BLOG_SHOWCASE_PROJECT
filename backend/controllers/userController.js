import User from "../models/user.js";
import jwt from "jsonwebtoken";

export async function signUp(req, res) {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const newUser = await User.create({ fullName, email, password });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.status(201).json({
      message: "Signup successful",
      user: { id: newUser._id, fullName: newUser.fullName, email: newUser.email },
      token,
    });
  } catch (err) {
    console.error("Signup Error:", err.message);
    res.status(500).json({ message: "Signup failed" });
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, fullName: user.fullName, email: user.email },
      token,
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Login failed" });
  }
}

export function logOut(req, res) {
  res.status(200).json({ message: "Logged out successfully" });
}
