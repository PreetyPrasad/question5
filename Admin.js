const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true } // Hashed password
});

module.exports = mongoose.model('Admin', adminSchema);
