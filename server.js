// Import required packages
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

// Initialize Express app
const app = express();

// Middleware
// Enable CORS for frontend communication
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Allow frontend origin
  credentials: true, // Allow cookies
}));

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Import route handlers
const projectRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');

// Mount routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Root route - API health check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'DevPortfolio Pro API is running! 🚀',
    endpoints: {
      projects: '/api/projects',
      contact: '/api/contact',
    },
  });
});

// 404 handler - catches all undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server',
    error: err.message,
  });
});

// Define port from environment variable or use 5000
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 http://localhost:${PORT}`);
});
