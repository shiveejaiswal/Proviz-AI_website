// Import necessary modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');  // Add Nodemailer for email functionality
require('dotenv').config();

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
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  statement: { type: String, required: true }
});

// Create a model for applications based on the schema
const Application = mongoose.model('Application', applicationSchema);

// Middleware setup
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Assuming you're using Gmail. Adjust if using a different service.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Function to send email
async function sendEmail(application) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Application Submitted',
    text: `
      A new application has been submitted:
      
      Name: ${application.name}
      Phone: ${application.phone}
      Email: ${application.email}
      Statement: ${application.statement}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Route to handle form submissions from users (POST request)
app.post('/api/apply', async (req, res) => {
  const application = new Application(req.body);
  try {
    await application.save();
    await sendEmail(application);  // Send email notification
    res.status(200).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving application.' });
  }
});

// Route to retrieve all applications (for Admin Dashboard - GET request)
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await Application.find();
    console.log('Fetched applications:', applications);
    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching applications.' });
  }
});

// Handle OPTIONS request for preflight CORS checks
app.options('/api/apply', (req, res) => {
  res.sendStatus(204);
});

// Start the server on a specific port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});