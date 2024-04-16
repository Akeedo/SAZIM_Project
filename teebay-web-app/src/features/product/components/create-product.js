import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ProductDataService from '../services/product-data-service';
import ProductModelService from '../services/product-model-service';
import ProductForm from '../views/product-form';


const CreateProduct = () => {

  const navigate = useNavigate();

  const [error, setError] = useState(null);
    const initialProduct = ProductModelService.setDefaultProduct();
    const [validationErrors, setValidationErrors] = useState({});

  const [product, setProduct] = useState({ ...initialProduct});

  const categoriesOptions = ProductModelService.getCategories();


  const handleChange = (e, { name, value }) => {
    const updatedProductField = ProductModelService.updateProductField(product, name, value);
    setProduct(updatedProductField);
};

const handleSubmit = async () => {
  // Check if the product object is empty
  // if (!product || Object.keys(product).length === 0) {
  //     setValidationErrors({ general: "Product data cannot be empty." });
  //     return;
  // }

  // const errors = ProductModelService.validateProduct(product);
  // if (Object.keys(errors).length > 0) {
  //     setValidationErrors(errors);
  //     return;
  // }
  // setValidationErrors({});

  try {
      const response = await ProductDataService.addProduct(product);
      alert(response.message);
      navigate('/');
  } catch (error) {
      console.log("There was an error posting the data", error);
  }
};


  return (
    <div>
    <ProductForm
        product={product}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        categoriesOptions={categoriesOptions}
        validationErrors={validationErrors}
      />
     
      </div>
  );
};

export default CreateProduct;
