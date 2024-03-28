const express = require('express');
const router = express.Router();
const  authenticateToken  = require('../../middlewire/authenticateToken');
const { createUserValidationRules, validate } = require('./validations/user-validation');
const userController = require('./controllers/user-controller');

router.post('/', [createUserValidationRules(), validate], userController.createUser);
router.get('/:userId/transactions', userController.fetchUserTransactionsController);

module.exports = router;
