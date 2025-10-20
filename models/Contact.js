const mongoose = require('mongoose');

// Define the structure of a Contact message
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true, // Convert email to lowercase
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'], // Email validation regex
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
  isRead: {
    type: Boolean,
    default: false, // New messages are unread by default
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Contact', contactSchema);
