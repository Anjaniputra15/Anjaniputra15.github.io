require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const Post = require('./models/Post');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:8000',
  credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => { console.error('MongoDB connection error:', err); process.exit(1); });

// ============ AUTH ROUTES ============

// POST /api/login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/setup (one-time admin user creation — disable after use)
app.post('/api/setup', async (req, res) => {
  try {
    const count = await User.countDocuments();
    if (count > 0) return res.status(403).json({ error: 'Admin already exists' });

    const { username, password } = req.body;
    if (!username || !password || password.length < 8) {
      return res.status(400).json({ error: 'Username required and password must be 8+ characters' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ username, passwordHash });
    res.status(201).json({ message: 'Admin created', username: user.username });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ============ POST ROUTES ============

// GET /api/posts (public — only published)
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .select('-__v');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/posts/all (admin — all posts including drafts)
app.get('/api/posts/all', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).select('-__v');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/posts (create)
app.post('/api/posts', authMiddleware, async (req, res) => {
  try {
    const { title, content, category, tags, published } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Title and content required' });

    const post = await Post.create({
      title,
      content,
      category: category || 'Update',
      tags: tags || [],
      published: published || false
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/posts/:id (update)
app.put('/api/posts/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/posts/:id
app.delete('/api/posts/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
