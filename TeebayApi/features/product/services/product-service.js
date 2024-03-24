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

    async productTransaction(userId, productId, amount, transactionType) {
        // Logic to check product availability can be added here
        try {
            // Assume ProductModel.createTransaction is correctly defined to handle transaction creation
            const transaction = await ProductModel.createTransaction({
                product_id: productId,
                user_id: userId,
                transaction_type: transactionType,
                date: new Date(),
                amount: amount,
            });
            return { error: false, message: "Transaction successfully created.", transaction: transaction};
        } catch (error) {
            console.error(error);
    
            // Handle known error types or provide a generic error message
            let errorMessage = "An error occurred while creating the transaction.";
            if (error.name === "SomeSpecificError") {
                errorMessage = "Specific error message related to the encountered issue.";
            }
            
            // Return an error message indicating that the transaction could not be created
            return { error: true, message: errorMessage };
        }
    },

   async rentProduct(transaction, rentFrom, rentTo) {
    try {
        const rentFromDate = new Date(rentFrom);
        const rentToDate = new Date(rentTo);

        // Validate if the dates are valid. If not, this will throw an error.
        if (isNaN(rentFromDate.getTime()) || isNaN(rentToDate.getTime())) {
            throw new Error("Invalid date format for rentFrom or rentTo.");
        }

        const rentFromISO = rentFromDate.toISOString();
        const rentToISO = rentToDate.toISOString();

        // Assuming createRental performs the operation and returns the created rental object
        const rental = await ProductModel.createRental({
            transaction_id: transaction.id,
            rent_from: rentFromISO,
            rent_to: rentToISO,
        });

        // If the operation is successful, return a structured response indicating success
        return {
            error: false,
            message: "Rent successfully created.",
            transaction: rental, // Or rental, if you want to return the newly created rental details
        };
    } catch (error) {
        // Log the error and/or rethrow it or handle it as per your error handling strategy
        console.error("Error in rentProduct:", error);
        // Return or throw an error object indicating failure and containing the error message
        return {
            error: true,
            message: error.message,
        };
        // Depending on your error handling policy, you may choose to throw the error instead
        // throw error;
    }
}
,


    
    

};

module.exports = ProductService;
