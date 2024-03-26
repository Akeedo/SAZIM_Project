const ProductTransaction = ({ 
    productId = null, 
    userId = null, 
    amount = 0, 
    rentFrom = '', // Default to an empty string if not provided
    rentTo = '' // Default to an empty string if not provided
} = {}) => ({
    productId,
    userId,
    amount,
    rentFrom: rentFrom ? new Date(rentFrom) : null, // Convert to Date object or null if not provided
    rentTo: rentTo ? new Date(rentTo) : null, // Convert to Date object or null if not provided
});

export default ProductTransaction;
