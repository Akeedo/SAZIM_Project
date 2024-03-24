const bcrypt = require('bcrypt');
const UserModel = require('../models/user-model');
const ProductModel = require('../../product/models/product-model');

const UserService = {
    async findUserByEmail(email) {
        return UserModel.findByEmail(email);
    },

    async createUser(userData) {
        const saltRounds = 10;
        userData.password = await bcrypt.hash(userData.password, saltRounds);
        return UserModel.create(userData);
    },

    async fetchUserTransactions(userId) {
        try {
            const userIdToInt = parseInt(userId, 10);
            const result = await ProductModel.getUserTransactionsWithProducts(userIdToInt);
            return result; 
        } catch (error) {
            console.error('Error in ProductService.fetchUserTransactions:', error);
           return { error: true, message: "An error occurred while fetching the user transactions.", error};
        }
    }
};

module.exports = UserService;
