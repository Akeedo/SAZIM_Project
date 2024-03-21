// features/product/product-validation.js
const { body } = require('express-validator');

const productValidationRules = () => [
    body('title').trim().escape().notEmpty().withMessage('Title is required'),
    body('description').trim().escape().notEmpty().withMessage('Description is required'),
    body('price').isDecimal({ decimal_digits: '2' }).withMessage('Price must be a valid decimal with two decimal places.'),
    body('category').trim().escape().notEmpty().withMessage('Category is required'),
];

module.exports = { productValidationRules };
