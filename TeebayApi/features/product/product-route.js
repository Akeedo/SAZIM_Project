// Assuming this is saved as features/product/productRoutes.js
const express = require('express');
const router = express.Router();
const ProductController = require('./controller/product-controller');
const { productValidationRules } = require('./validation/product-validation');
const authenticateToken = require('../../middlewire/authenticateToken');

console.log('authToken', authenticateToken);

router.post('/', [authenticateToken, productValidationRules(), ProductController.createProduct]);
router.get('/', authenticateToken, ProductController.getProducts);

module.exports = router;
