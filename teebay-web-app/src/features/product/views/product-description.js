import React from 'react';


const ProductDescription = ({ product }) => {


  return (
    <div className="product-detail">
        <h2>{product.title}</h2>
        <p>Description: {product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Category: {product.category}</p>
    </div>
  );
}

export default ProductDescription;
