// Import the required dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


// Load environment variables from .env file
require("dotenv").config();

// Initialize Express app
const app = express();

// Set up middleware
// Allow cross-origin requests
app.use(cors());
app.use(express.json());





// Connect to MongoDB
const { MONGODB_URI, PORT } = process.env;
mongoose.connect(MONGODB_URI);



const courseRoutes = require('./routes/course');

app.use('/api/courses', courseRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
   console.log('Connected to MongoDB.');
})
.catch(err => {
   console.error('Error connecting to MongoDB:', err);
});
