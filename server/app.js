const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();  // Import dotenv to load variables from .env file

const app = express();

// MongoDB connection using environment variable
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Application model (make sure to create a proper schema for the applications)
const applicationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  statement: String
});

const Application = mongoose.model('Application', applicationSchema);

// Middleware setup
app.use(cors({
  origin: 'http://localhost:3000',  // Allow frontend requests from this domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json()); // Parse incoming JSON requests

// POST route to handle form submission
app.post('/api/apply', async (req, res) => {
  const application = new Application(req.body); // Create a new application document from the request body
  try {
    await application.save(); // Save the application to the database
    res.status(200).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving application.' });
  }
});

// GET route to retrieve all applications (for Admin Dashboard)
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await Application.find(); // Fetch all applications from the database
    console.log('Fetched applications:', applications);
    res.status(200).json(applications); // Send the applications data as the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching applications.' });
  }
});

// Handle OPTIONS request (for CORS preflight)
app.options('/api/apply', (req, res) => {
  res.sendStatus(204); // No content response
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
