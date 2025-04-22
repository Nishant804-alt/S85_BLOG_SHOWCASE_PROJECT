// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db1.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Fetch all users
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Fetch posts by user ID
app.get('/api/posts/user/:userId', (req, res) => {
  const userId = req.params.userId;
  db.query('SELECT * FROM posts WHERE created_by = ?', [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
