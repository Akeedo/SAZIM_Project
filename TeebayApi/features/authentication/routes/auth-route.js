// features/user/userRoutes.js or features/user/authRoutes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth-controller');
const  authenticateToken  = require('../../../middlewire/authenticateToken');
const { loginValidationRules, validate } = require('../validation/auth-validation');

router.post('/login', [loginValidationRules(), validate], AuthController.login);
router.post('/refresh-token', AuthController.refreshToken);
router.get('/protected-route', authenticateToken, (req, res) => {
    res.send("Access to protected data");
  });

module.exports = router;
