
import axiosInstance from '../../../utils/axiosInstance';

const ProductDataService = () => {

    const addProduct = async (product) => {
        try {
            const response = await axiosInstance({ method: 'POST', url: '/products', data:product }).then((response) => response);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

        const getAllProducts = async () => {
        try {
            const response = await axiosInstance({ method: 'GET', url: '/products' }).then((response) => response);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const getProductById = async (productId) => {
        try {
            const response = await axiosInstance({ method: 'GET', url: `/products/${productId}` }).then((response) => response);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

const updateProduct = async (productId, product) => {
  try {
    const response = await axiosInstance({ method: 'PUT', url: `/products/${productId}`, data: product }).then((response) => response);
      return response.data;
  } catch (error) {
      throw error; 
  }
};

const deleteProduct = async (productId) => {
    try {
        await axiosInstance({ method: 'DELETE', url: `/products/${productId}` }).then((response) => response);
    } catch (error) {
        throw error; 
    }
};

const rentProduct = async (rentProduct) => {
    try {
        const response = await axiosInstance({ method: 'POST', url: '/products/rent-product', data:rentProduct }).then((response) => response);
        return response.data;
    } catch (error) {
        throw error;
    }
};

    return {
        addProduct,
        getAllProducts,
        getProductById,
        updateProduct,
        deleteProduct,
        rentProduct
    };
};

export default ProductDataService();
