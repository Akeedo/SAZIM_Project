const express = require('express');
const router = express.Router();
const  authenticateToken  = require('../../middlewire/authenticateToken');
const { createUserValidationRules, validate } = require('./validations/user-validation');
const userController = require('./controllers/user-controller');

router.post('/', [authenticateToken, createUserValidationRules(), validate], userController.createUser);

module.exports = router;
