import axios from 'axios';

const AuthDataService = () => {
    const BASE_URL = 'http://localhost:3030/auth';

    const authenticateUser = async (user) => {
        try {
            const response = await axios.post(BASE_URL + '/login', user);
            return response;
        } catch (error) {
            throw error;
        }
    };

    return {
        authenticateUser,
    };
};

export default AuthDataService();