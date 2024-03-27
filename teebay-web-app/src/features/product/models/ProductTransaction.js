const ProductTransaction = ({ 
    productId = null, 
    userId = null, 
    amount = 0, 
    rentFrom = '', 
    rentTo = '',
    transactionType = null,
} = {}) => ({
    productId,
    userId,
    amount,
    rentFrom: rentFrom ? new Date(rentFrom) : null, 
    rentTo: rentTo ? new Date(rentTo) : null, 
    transactionType: transactionType ? transactionType : null,
});

export default ProductTransaction;
