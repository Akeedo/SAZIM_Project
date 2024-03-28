
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

    const validateField = (name, value) => {
        let errors = {};
        if (name === 'title' && !value.trim()) {
            errors.title = 'Title is required';
        } else if (name === 'description' && !value.trim()) {
            errors.description = 'Description is required';
        } else if (name === 'price' && (value <= 0 || isNaN(value))) {
            errors.price = 'Price must be greater than 0';
        } else if (name === 'category' && !value.trim()) {
            errors.category = 'Category is required';
        }
        return errors;
    };

    const validateProduct = (productData) => {
        let validationErrors = {};
        Object.keys(productData).forEach(key => {
            const fieldErrors = validateField(key, productData[key]);
            validationErrors = { ...validationErrors, ...fieldErrors };
        });
        return validationErrors;
      };

    const setDefaultProduct = async (productInitial) => {
        productInitial = product;
        return productInitial;
    };
    
    
    const updateProductField = (product, fieldName, fieldValue) => {
        return { ...product, [fieldName]: fieldValue };
    };

    return {
        setDefaultProduct,
        updateProductField,
        getCategories: () => categories,
        validateProduct,
    };
};

export default ProductModelService();
