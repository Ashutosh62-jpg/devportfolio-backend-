// backend/server.js

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

/*
  CORS configuration
  - Allows your Netlify site in production via FRONTEND_URL
  - Allows localhost:3000 during local development
  - Handles OPTIONS preflight and custom headers (x-admin-password)
*/
const allowedOrigins = [
  process.env.FRONTEND_URL,       // e.g. https://your-site.netlify.app
  'http://localhost:3000',        // local React dev
].filter(Boolean);

// Using cors package with dynamic origin checking
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (curl/Postman) and allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-admin-password'],
  optionsSuccessStatus: 200, // For legacy browsers
};

// Apply CORS and ensure preflight is handled
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Body parsers
app.use(express.json());
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
  console.error('Global error:', err);
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
  if (allowedOrigins.length) {
    console.log('✅ CORS allowed origins:', allowedOrigins.join(', '));
  } else {
    console.log('⚠️ No CORS origins configured. Set FRONTEND_URL in env.');
  }
});
