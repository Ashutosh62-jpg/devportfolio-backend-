// Import mongoose library for MongoDB connection
const mongoose = require('mongoose');

// Function to connect to MongoDB database
const connectDB = async () => {
  try {
    // Connect using connection string from environment variables
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,      // Use new URL parser
      useUnifiedTopology: true,   // Use new topology engine
    });
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// Export the function so it can be used in other files
module.exports = connectDB;
