// Import necessary modules
const express = require('express');           // Express for routing and middleware
const cors = require('cors');               // CORS middleware for cross-origin requests
const bodyParser = require('body-parser');  // Body parser middleware to parse incoming requests
const mongoose = require('mongoose');       // Mongoose to interact with MongoDB
require('dotenv').config();                 // Load environment variables from .env file

// Initialize the express app
const app = express();

// MongoDB connection using environment variable from .env file
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the schema for the Application model
const applicationSchema = new mongoose.Schema({
  name: { type: String, required: true },       // Name of the applicant
  phone: { type: String, required: true },      // Phone number of the applicant
  email: { type: String, required: true },      // Email address of the applicant
  statement: { type: String, required: true }   // Statement or message from the applicant
});

// Create a model for applications based on the schema
const Application = mongoose.model('Application', applicationSchema);

// Middleware setup
// CORS configuration: Allow frontend requests from a specific domain
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only requests from this domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Supported HTTP methods
  allowedHeaders: ['Content-Type'],  // Allowed headers for requests
}));

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Route to handle form submissions from users (POST request)
app.post('/api/apply', async (req, res) => {
  const application = new Application(req.body); // Create new application document from the request body
  try {
    await application.save(); // Save the application to the database
    res.status(200).json({ message: 'Application submitted successfully!' }); // Respond with success message
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: 'Error saving application.' }); // Respond with error message
  }
});

// Route to retrieve all applications (for Admin Dashboard - GET request)
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await Application.find(); // Fetch all applications from the database
    console.log('Fetched applications:', applications); // Log the applications for debugging
    res.status(200).json(applications); // Respond with the list of applications
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: 'Error fetching applications.' }); // Respond with error message
  }
});

// Handle OPTIONS request for preflight CORS checks (useful for browsers with CORS)
app.options('/api/apply', (req, res) => {
  res.sendStatus(204); // Respond with no content
});

// Start the server on a specific port
const port = process.env.PORT || 5000;  // Use environment variable PORT or default to 5000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log the server URL
});
