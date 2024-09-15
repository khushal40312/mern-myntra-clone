const express = require('express');
const connectToMongo = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Initialize MongoDB connection
connectToMongo();

const app = express();
app.use(express.json());

// Set up CORS with allowed origins
const allowedOrigins = ['https://myntra-clone-mern-1.onrender.com'];  // Replace with your actual frontend URL
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Enable pre-flight requests for all routes
app.options('*', cors());

// Use Helmet for security
app.use(helmet());

// Use body-parser to parse JSON bodies
app.use(bodyParser.json());

// Set Cross-Origin-Resource-Policy headers
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));
app.use('/uploads', express.static('uploads'));
app.use(express.static('resources'));

const port = process.env.PORT || 8009;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
