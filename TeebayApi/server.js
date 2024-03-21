const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const cors = require('cors');
const Joi = require('joi');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const JWT_SECRET = process.env.JWT_SECRET || 'ef3d171d0fb5328c8c12f188e34b403a94bd4cf9600e34ac664280eebb6a1947'; // It's better to use an environment variable for the secret key
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '3c0273f989ec034f8cb204e53bcac115433f8e64a3ba561131eb109f23ecfa87';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token

  if (!token) return res.status(401).send('Access Token Required');

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      // Token validation error or expired token
      const isExpired = err.name === 'TokenExpiredError';
      if (isExpired) {
        return res.status(401).send('Token Expired');
      } else {

        return res.status(403).send('Invalid Token');
      }
    }
    req.user = user; // Attach the decoded user payload to the request object
    next();
  });
};


const app = express();
app.use(bodyParser.json());

app.use(cors());

// Joi schema definition
const userSchema = Joi.object({
    userName: Joi.string().min(3).max(20).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  });

// Validation middleware
const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
  };

  // Login route
app.post('/login', [
  // Validation and sanitization rules for login
  body('email').isEmail().normalizeEmail(),
  body('password').trim(),
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  app.get('/protected-route', authenticateToken, (req, res) => {
    // This route is now protected
    res.status(200).send("Access to protected data");
  });

  // Extract values
  const { email, password } = req.body;

  try {
    console.log(`Type of for email: '${typeof email}'`);
    // Check if a user exists with the given email

    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
    
    if (!user) {
      return res.status(400).send({ message: "User not found." });
    }

    // Compare the provided password with the hashed password in the database
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).send({ message: "Invalid credentials." });
    // }

  // User authentication successful, issue a token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' }); // Adjust expiresIn as needed
  const refreshToken = jwt.sign({ userId: user._id }, JWT_REFRESH_SECRET, { expiresIn: '1h' }); // Adjust expiresIn as needed

    // If password matches, login successful
    res.status(200).send({ message: "Login successful", user: { id: user.id, firstName: user.first_name, lastName:user.last_name, email: user.email }, token, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post('/refresh-token', (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.status(401).send('Refresh Token Required');

  jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid Refresh Token');

    // Assuming the refresh token is valid, issue a new access token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' }) ;
    res.json({ token});
  });
});

app.post('/users', [
  authenticateToken, 
  body('firstName').trim().escape(),
  body('lastName').trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password').trim().escape(),
  body('address').optional().trim().escape(),
  body('phoneNumber').optional().trim().escape(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract sanitized values including the optional address and phoneNumber
  const { firstName, lastName, email, password, address, phoneNumber } = req.body;

  try {
    const emailExists = await prisma.users.findUnique({
      where: { email },
    });

    if (emailExists) {
      return res.status(400).send({ message: "Email already registered." });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Proceed to create the new user with all provided and sanitized inputs
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        address, // Included address
        phoneNumber, // Included phoneNumber
        email,
        password: hashedPassword,
      },
    });
app.post('/products', [
  authenticateToken, // This route is now protected
  // Validation and sanitization rules
  body('title').trim().escape(),
  body('description').trim().escape(),
  body('price').isDecimal({ decimal_digits: '2', }).withMessage('Price must be a valid decimal with two decimal places.'),
  body('category').trim().escape(),

], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract sanitized values
  const { title, description, price, category } = req.body;

  try {
  
    const titleExists = await prisma.products.findFirst({
      where: {
        title: title,
      },
    });

    if (titleExists) {
      return res.status(400).send({ message: "Title already registered." });
    }
    // Proceed to create the new user with sanitized inputs
    const newProduct = await prisma.products.create({
      data: {
        title:title, 
        description:description, 
        price:price, 
        category:category,
      },
    });
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(400).send(error);
  }
});
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An error occurred while creating the user." });
  }
});


 
// READ (all users)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// READ (single user by ID)
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        if (!user) {
        return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// UPDATE
app.patch('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).send();
        }
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE
app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ id: req.params.id });
        if (!deletedUser) {
        return res.status(404).send();
        }
        res.status(200).send(deletedUser);
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
