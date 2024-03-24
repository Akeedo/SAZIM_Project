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

    async fetchUserTransactionsController(req, res) {
        const userId = parseInt(req.params.userId); // Assuming the user ID comes from the route parameter
    
        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid user ID." });
        }
    
        try {
            const result = await UserService.fetchUserTransactions(userId);
    
            if (result.error) {
                return res.status(400).json({ message: result.message });
            }
            else{
                return res.status(200).json(result);
            }
        } catch (error) {
            res.status(500).json({ message: "An error occurred while fetching the transactions.", error: error.message });
        }
    },

};

module.exports = UserController;
