
import Product from "../models/Product";

const ProductModelService = () => {
    
    const product = Product;

    const categories = [
        { key: 'electronics', value: 'electronics', text: 'Electronics' },
        { key: 'furniture', value: 'furniture', text: 'Furniture' },
        { key: 'home_appliances', value: 'home_appliances', text: 'Home Appliances' },
        { key: 'sporting_goods', value: 'sporting_goods', text: 'Sporting Goods' },
        { key: 'outdoor', value: 'outdoor', text: 'Outdoor' },
        { key: 'toys', value: 'toys', text: 'Toys' },
    ];

    const setDefaultProduct = async (product) => {
        return product;
    };
    
    
    const updateProductField = (product, fieldName, fieldValue) => {
        return { ...product, [fieldName]: fieldValue };
    };

    return {
        setDefaultProduct,
        updateProductField,
        getCategories: () => categories,
    };
};

export default ProductModelService();
