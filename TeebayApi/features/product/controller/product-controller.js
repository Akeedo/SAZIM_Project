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

    async getProducts(req, res) {
        try {
            const products = await ProductService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async getProductById(req, res) {
        const { id } = req.params;
        const result = await ProductService.getProductById(id);
    
        if (result.error) {
            res.status(result.statusCode).send({ message: result.message });
        } else {
            res.status(result.statusCode).json(result.product);
        }
    },

    async deleteProduct(req, res) {
        const { id } = req.params;
        
        try {
            const result = await ProductService.deleteProduct(id);
            if (result.success) {
                res.status(200).json({ message: "Product deleted successfully.", product: result.deletedProduct });
            } else {
                res.status(result.statusCode).send({ message: result.message });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "An error occurred while deleting the product.", error: error.message });
        }
    },

    async updateProduct(req, res) {
        const { id } = req.params;
        const productData = req.body;
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const result = await ProductService.updateProduct(id, productData);
        res.status(201).json({ message: "Successful " + result.title + " updated."} );
        if (result.error) {
            res.status(result.statusCode).json({ message: result.message });
        } else {
            res.status(result.statusCode).json(result.updatedProduct);
        }
    },


        async buyProduct(req, res) {
            const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }
            try {
                const transactionType = 'buy';
                const result = await ProductService.productTransaction(req.body, transactionType);
                res.status(201).json({ message : result.message});
            } catch (error) {
                res.status(400).json({ message: "Error buying product", error: error.message });
            }
        },

        async rentProduct(req, res) {
            const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }
            try {
                const { userId, productId, amount, rentFrom, rentTo } = req.body;
                const transactionType = 'rent';
                const rentResult = await ProductService.productTransaction(userId, productId, amount, transactionType);
                if(rentResult.error) {
                    return res.status(400).json({ message: rentResult.message });
                } else {
                const result = await ProductService.rentProduct(rentResult.transaction, rentFrom, rentTo);
                if (result.error === false) {
                        return res.status(201).json({ message: result.message });
                    }
                }
            } catch (error) {
                res.status(400).json({ message: "Error rental product", error: error.message });
            }
        },
    
};

module.exports = ProductController;
