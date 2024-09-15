const express = require('express');
const connectToMongo = require('./db')
const bodyParser = require('body-parser');
const cors = require('cors');
connectToMongo();
const app = express();
app.use(express.json())

// Use CORS middleware to handle CORS automatically


app.use(cors());

app.options('*', cors())
const helmet = require('helmet');
app.use(helmet());

// Use body-parser to parse JSON bodies
app.use(bodyParser.json());

app.use((req, res, next) => {
  // Set the appropriate policy depending on your use case
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin'); // or 'same-site'
  next();
});

app.use('/api/auth', require('./routes/auth'))
app.use('/api/items', require('./routes/items'))
app.use('/uploads', express.static('uploads'));
app.use(express.static('resources'));
require('dotenv').config();
const port = process.env.PORT || 8009;

app.listen(port, () => {
  console.log(`Server is running on port${port}`);
});