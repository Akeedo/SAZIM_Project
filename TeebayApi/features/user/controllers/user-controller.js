const UserService = require('../services/user-services');

const UserController = {
    async createUser(req, res) {
        const { firstName, lastName, address, phoneNumber, email, password } = req.body;

        try {
            const emailExists = await UserService.findUserByEmail(email);
            if (emailExists) {
            return res.status(400).send({ message: "Email already registered." });
        }

            const newUser = await UserService.createUser({ firstName, lastName, address, phoneNumber, email, password });
            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "An error occurred while creating the user.", error: error.message });
        }
    },

};

module.exports = UserController;
