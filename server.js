// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const app = express();

// Configures the server's listening port with fallback to 3000 if not specified
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

// Applies rate limiting to all requests to prevent abuse. Limits each IP to 100 requests per 15-minute interval.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes in milliseconds
  max: 100, // Maximum number of requests per window per IP
});
app.use(limiter);

// Establishes connection to MongoDB using the connection string from environment variables. Configures basic connection events.
mongoose.connect(DATABASE_URL).then(() => {
  console.log('Connected to MongoDB successfully.');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Middleware to parse JSON bodies in incoming requests
app.use(express.json());

// Import and use routes for waitlist applicants
const waitlistApplicantsRouter = require('./routes/waitlistApplicants');
app.use('/waitlist_applicants', waitlistApplicantsRouter);

// Global error handling middleware for catching and responding to unhandled exceptions within the application
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(500).send('Internal Server Error');
});

// Starts the server on the configured port, logging a message to console once successful
app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));