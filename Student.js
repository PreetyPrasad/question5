const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: { type: String, unique: true, required: true },
  grade: String
});

module.exports = mongoose.model('Student', studentSchema);
