// middlewares/authenticateToken.js
const jwt = require('jsonwebtoken');
const  JWTConfig = require('../config/JWTConfig'); // Adjust the path as needed to where your JWT_SECRET is defined

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token

  if (!token) return res.status(401).send('Access Token Required');

  jwt.verify(token, JWTConfig.JWT_SECRET, (err, user) => {
    if (err) {
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

module.exports = authenticateToken;
