import  ProductTransaction  from '../models/ProductTransaction';

const ProductTransactionModelService = () => {
    
const setRentTransaction = async (productId, amount, rentFrom, rentTo) => {
    try{
    const user = localStorage.getItem('user');
    const userObject = JSON.parse(user);
    const userId = userObject.id;
    const productIdToInteger = parseInt(productId, 10);
    amount = parseFloat(amount);
    const productTransaction = ProductTransaction({productId: productIdToInteger, amount, userId, rentFrom: rentFrom, rentTo: rentTo});
    return productTransaction;
    }catch(error){
        console.error('There was an error setting the product transaction', error);
        throw error;
    }
};

return {
    setRentTransaction,
};

}


export default ProductTransactionModelService();
