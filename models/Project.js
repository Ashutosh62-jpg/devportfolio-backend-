const mongoose = require('mongoose');

// Define the structure of a Project document
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'], // Validation with custom message
    trim: true, // Remove whitespace from both ends
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
  },
  image: {
    type: String,
    required: [true, 'Project image URL is required'],
  },
  technologies: {
    type: [String], // Array of strings
    required: true,
  },
  githubLink: {
    type: String,
    required: false, // Optional field
  },
  liveLink: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'fullstack', 'mobile'], // Only allow these values
    default: 'frontend',
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create and export the model
module.exports = mongoose.model('Project', projectSchema);
