// features/user/AuthController.js
const AuthService = require('../services/auth-service');
const jwt = require('jsonwebtoken');
const JWTConfig = require('../../../config/JWTConfig');


const AuthController = {
  // Other authentication-related controllers like login and register...

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await AuthService.findUserByEmail(email);
      if (!user) {
        return res.status(400).send({ message: "User not found." });
      }

      const isMatch = await AuthService.comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: "Invalid credentials." });
      }

      // User authentication successful, issue tokens
      const token = jwt.sign({ userId: user.id }, JWTConfig.JWT_SECRET, { expiresIn: JWTConfig.expiresIn });
      const refreshToken = jwt.sign({ userId: user.id }, JWTConfig.JWT_REFRESH_SECRET, { expiresIn: JWTConfig.refreshExpiresIn });

      res.status(200).send({
        message: "Login successful",
        user: { id: user.id, email: user.email }, // Simplify the user object sent to the client
        token,
        refreshToken
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};

module.exports = AuthController;
