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

    const getAllProducts = async () => {
      try {
          const response = await axios.get(BASE_URL);
          return response.data;
      } catch (error) {
          throw error;
      }
  };

  const getProductById = async (productId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${productId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const updateProduct = async (productId, product) => {
  try {
      const response = await axios.put(`${BASE_URL}/${productId}`, product);
      return response.data; // Returns the updated product data
  } catch (error) {
      throw error; // Rethrows the error to be caught by the caller
  }
};

    return {
        addProduct,
        getAllProducts,
        getProductById,
        updateProduct
    };
};

export default ProductDataService();
