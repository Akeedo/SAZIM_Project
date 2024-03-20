import React, { useState } from 'react';

import axios from 'axios';

import ProductDataService from '../services/product-data-service';
import ProductModelService from '../services/product-modal-service';
import ProductForm from '../views/product-form';

const CreateProduct = () => {

  const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const initialProduct = ProductModelService.setDefaultProduct();

  const [product, setProduct] = useState({
    title: initialProduct.title,
    category: initialProduct.category,
    description: initialProduct.description,
    price: initialProduct.price
  });

  const categoriesOptions = ProductModelService.getCategories();


  const handleChange = (e, { name, value }) => {
    const updatedProductField = ProductModelService.updateProductField(product, name, value);
    setProduct(updatedProductField);
};

  const handleSubmit = async () => {
    try {
      const response = await ProductDataService.addProduct(product);
      console.log(response.data);
    } catch (error) {
      console.error("There was an error posting the data", error);
    }
  };

  return (
    <ProductForm
        product={product}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        categoriesOptions={categoriesOptions}
      />
  );
};

export default CreateProduct;
