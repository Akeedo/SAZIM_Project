const bcrypt = require('bcrypt');
const UserModel = require('../models/user-model');

const UserService = {
    async findUserByEmail(email) {
        return UserModel.findByEmail(email);
    },

    async createUser(userData) {
        const saltRounds = 10;
        userData.password = await bcrypt.hash(userData.password, saltRounds);
        return UserModel.create(userData);
    },

    // Implement additional user service methods as needed
};

module.exports = UserService;
