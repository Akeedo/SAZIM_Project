const Product = ({ id = null, title = '', description = '', price = 0, category = '' } = {}) => ({
    id,
    title,
    description,
    price,
    category,
});

export default Product;