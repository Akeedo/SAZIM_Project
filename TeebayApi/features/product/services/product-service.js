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

  // Here you can add more business logic methods, like updating or deleting products
};

module.exports = ProductService;
