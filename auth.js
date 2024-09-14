const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret_key';

// Register admin
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new Admin({ username, password: hashedPassword });
  await admin.save();
  res.send('Admin registered');
});

// Login admin
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(400).send('Invalid credentials');
  }

  const token = jwt.sign({ adminId: admin._id }, JWT_SECRET);
  res.json({ token });
});

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send('Token required');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminId = decoded.adminId;
    next();
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
};

module.exports = { router, authenticateJWT };
