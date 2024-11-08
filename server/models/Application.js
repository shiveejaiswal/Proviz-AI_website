// Importing the mongoose package to interact with MongoDB
const mongoose = require('mongoose');

// Define the schema for the Application model
const applicationSchema = new mongoose.Schema({
  // 'name' field: Required string type
  name: {
    type: String,  // Data type: String
    required: true // Field is required
  },
  
  // 'phone' field: Required string type
  phone: {
    type: String,  // Data type: String
    required: true // Field is required
  },
  
  // 'email' field: Required string type
  email: {
    type: String,  // Data type: String
    required: true // Field is required
  },
  
  // 'statement' field: Required string type
  statement: {
    type: String,  // Data type: String
    required: true // Field is required
  }
});

// Create a model named 'Application' based on the applicationSchema
const Application = mongoose.model('Application', applicationSchema);

// Export the Application model to be used in other parts of the application
module.exports = Application;
