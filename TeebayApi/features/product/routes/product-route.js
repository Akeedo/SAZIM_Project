// Assuming this is saved as features/product/productRoutes.js
const express = require('express');
const router = express.Router();
const ProductController = require('../controller/product-controller');
const { productValidationRules } = require('../validation/product-validation');


router.post('/', [productValidationRules(), ProductController.createProduct]);

module.exports = router;
