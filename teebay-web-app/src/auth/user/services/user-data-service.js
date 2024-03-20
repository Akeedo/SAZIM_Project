import axios from 'axios';

const UserDataService = () => {
    const BASE_URL = 'https://65f88c14df151452460fa890.mockapi.io/api/v1/users';

    const addUser = async (user) => {
        try {
            const response = await axios.post(BASE_URL, user);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const getAllUsers = async () => {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const getUserById = async (userId) => {
        try {
            const response = await axios.get(`${BASE_URL}/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const updateUser = async (userId, user) => {
        try {
            const response = await axios.put(`${BASE_URL}/${userId}`, user);
            return response.data; // Returns the updated user data
        } catch (error) {
            throw error; // Rethrows the error to be caught by the caller
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${BASE_URL}/${userId}`);
        } catch (error) {
            throw error;
        }
    };

    return {
        addUser,
        getAllUsers,
        getUserById,
        updateUser,
        deleteUser
    };
};

export default UserDataService();
