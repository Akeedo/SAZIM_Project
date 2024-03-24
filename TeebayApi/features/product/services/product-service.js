// Assuming this is saved as features/product/productService.js
const ProductModel = require('../models/product-model');

const ProductService = {
    async addProduct(productData) {
        const { title } = productData;
        const titleAlreadyExists = await ProductModel.titleExists(title);
        if (titleAlreadyExists) {
        throw new Error("Title already registered.");
        }
        return await ProductModel.create(productData);
    },

    async getAllProducts() {
        return await ProductModel.findAll();
      },

    async getProductById(id) {
        
        const productId = parseInt(id, 10);
        if (isNaN(productId)) {
            return { error: true, statusCode: 400, message: "Invalid product ID." };
        }
        try {
            const product = await ProductModel.findById(productId);
            if (!product) {
            return { error: true, statusCode: 404, message: "Product not found." };
        }
            return { error: false, statusCode: 200, product };
        } catch (error) {
            console.error(error);
            return { error: true, statusCode: 400, message: "An error occurred while fetching the product." };
        }
    },

    async deleteProduct(id) {
        const productId = parseInt(id, 10);
        if (isNaN(productId)) {
            return { success: false, statusCode: 400, message: "Invalid product ID." };
        }
    
        try {
            const deletedProduct = await ProductModel.delete(productId);
            return { success: true, deletedProduct };
        } catch (error) {
            if (error.code === 'P2025') {
                return { success: false, statusCode: 404, message: "Product not found." };
            }
            throw error;
        }
    },

    async updateProduct(id, productData) {
        const productId = parseInt(id, 10);
        if (isNaN(productId)) {
            return { error: true, statusCode: 400, message: "Invalid product ID." };
        }
        
        try {
            const updatedProduct = await ProductModel.updateById(productId, productData);
            if (!updatedProduct) {
                return { error: true, statusCode: 404, message: "Product not found." };
            }
            return { error: false, statusCode: 200, updatedProduct };
        } catch (error) {
            console.error(error);
            // Specific error handling could go here if you have known error types you want to handle differently
            return { error: true, statusCode: 500, message: "An error occurred while updating the product." };
        }
    },
};

module.exports = ProductService;
