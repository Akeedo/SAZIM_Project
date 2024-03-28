const bcrypt = require('bcrypt');
const UserModel = require('../models/user-model');
const ProductModel = require('../../product/models/product-model');

const UserService = {
    async findUserByEmail(email) {
        return UserModel.findByEmail(email);
    },

    async createUser(userData) {
        try{
            const saltRounds = 10;
            userData.password = await bcrypt.hash(userData.password, saltRounds);
            const response =  UserModel.create(userData);
            return response;
        }catch(error){console.error(error);res.status(500).json({message:"An error occurred while creating the user.",error:error.message});}
       
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
