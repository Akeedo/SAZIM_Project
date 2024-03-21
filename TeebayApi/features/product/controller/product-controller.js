// Assuming this is saved as features/product/productController.js
const { body, validationResult } = require('express-validator');
const ProductService = require('../services/product-service');

const ProductController = {
    createProduct: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const newProduct = await ProductService.addProduct(req.body);
            res.status(201).json({ message: "Successful " + newProduct.title + " created."} );
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
};

module.exports = ProductController;
