import axios from 'axios';

const ProductDataService = () => {
    const BASE_URL = 'https://65f88c14df151452460fa890.mockapi.io/api/v1/products';

    const addProduct = async (product) => {
        try {
            const response = await axios.post(BASE_URL, product);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return {
        addProduct,
    };
};

export default ProductDataService();
