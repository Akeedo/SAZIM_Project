import axios from 'axios';
import axiosInstance from '../../../utils/axiosInstance';

const UserDataService = () => {
    const BASE_URL = 'http://localhost:3030/users';

    const addUser = async (user) => {
        try {
            const response = await axios.post(BASE_URL, user);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const getAllUserTransactions = async (userId) => {
        try {
            const response = await axiosInstance({ method: 'GET', url: `/users/${userId}/transactions` }).then((response) => response);
            return response.data;
        } catch (error) {
            throw error;
        }
    };


    return {
        addUser,
        getAllUserTransactions
    };
};

export default UserDataService();
