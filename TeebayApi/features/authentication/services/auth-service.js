// features/user/AuthService.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWTConfig = require('../../../config/JWTConfig'); // Adjust the path as needed
const UserModel = require('../models/user-model');

const AuthService = {
    refreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, JWTConfig.JWT_REFRESH_SECRET, (err, user) => {
            if (err) {
            reject('Invalid Refresh Token');
            } else {
            const token = jwt.sign({ userId: user.id }, JWTConfig.JWT_SECRET, { expiresIn: '1h' });
            resolve(token);
            }
        });
        });
    },

    async comparePassword(plainTextPassword, hashedPassword) {
        return bcrypt.compare(plainTextPassword, hashedPassword);
      },

    async findUserByEmail(email) {
        return UserModel.findByEmail(email);
      },
};

module.exports = AuthService;
