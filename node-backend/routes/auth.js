const express = require('express');
const User = require('../models/User');
const fetchuser = require("../middleware/fetchuser")
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET;
const path = require('path');
// const uploadPath = process.env.UPLOAD_DIR;
const multer = require('multer');

// create a user using POST "/api/auth doesnt require auth"
const uploadPath = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // folder where the files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // unique filename
  }
});

const upload = multer({ storage: storage });

router.post('/createuser',
  upload.single('picture'), // Add multer middleware to handle single file upload
  [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    body('mobile', 'Enter a valid mobile number').isLength({ min: 10 }).optional(),
    body('gender', 'Enter a valid gender').isIn(['male', 'female', 'other']).optional(),
  ], async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: 'Sorry, a user with this email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePass,
        picture: req.file ? req.file.path : null, // Store file path in the database
        gender: req.body.gender,
        mobile: req.body.mobile,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });

    } catch (error) {
      console.error(error.message);
      res.status(500).send('Some error occurred');
    }
  }
);


// Route 2 Authenticated using: POST"/api/auth/login no login req"
router.post('/login', [

  body('email', "enter a valid Email").isEmail(),
  body('password', "password cannot be blank").exists({ min: 5 })
  ,], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {

      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: 'Please try to login with correct credential' })

      }
      const passwordCompare = await bcrypt.compare(password, user.password)
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({ success, errors: 'Please try to login with correct credential' })
      }
      const data = {

        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken })
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error")
    }

  })




// Route 3 to get user detail using: POST"/api/auth/getuser no login req"
router.get('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)


  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error")
  }
})










module.exports = router
