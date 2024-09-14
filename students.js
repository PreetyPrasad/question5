const express = require('express');
const Student = require('../models/Student');
const { authenticateJWT } = require('./auth');

const router = express.Router();

// Create student
router.post('/', authenticateJWT, async (req, res) => {
  const { name, age, email, grade } = req.body;
  const student = new Student({ name, age, email, grade });
  await student.save();
  res.send('Student created');
});

// Read all students
router.get('/', authenticateJWT, async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Update student
router.put('/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  const { name, age, email, grade } = req.body;

  const student = await Student.findByIdAndUpdate(id, { name, age, email, grade }, { new: true });
  res.json(student);
});

// Delete student
router.delete('/:id', authenticateJWT, async (req, res) => {
  const { id } = req.params;
  await Student.findByIdAndDelete(id);
  res.send('Student deleted');
});

module.exports = router;
