const express = require('express');
const User = require('../models/User');
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const uploadPath = path.join(__dirname, '..', 'uploads');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only JPG, JPEG, and PNG are allowed.'));
    }
    cb(null, true);
  }
});

// Error handling middleware for multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(500).json({ error: 'An error occurred during the file upload.' });
  }
  next();
});

// Route 1: Create a new user
router.post('/createuser',
  upload.single('picture'),
  [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    body('mobile', 'Enter a valid mobile number').isLength({ min: 10 }).optional(),
    body('gender', 'Enter a valid gender').isIn(['male', 'female', 'other']).optional(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: 'A user with this email already exists.' });
      }

      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(req.body.password, salt);

      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: securePass,
        picture: req.file ? req.file.path : 'uploads/defaultProfile.jpg', // Default image if none uploaded
        gender: req.body.gender || null,
        mobile: req.body.mobile || null
      });

      await user.save();

      const data = { user: { id: user.id } };
      const authtoken = jwt.sign(data, JWT_SECRET);  // JWT token with 1-hour expiration
      success = true;
      res.json({ success, authtoken });

    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Route 2: Login a user
router.post('/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password.' });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: 'Invalid email or password.' });
      }

      const data = { user: { id: user.id } };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });

    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Route 3: Get logged-in user details
router.get('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
      
