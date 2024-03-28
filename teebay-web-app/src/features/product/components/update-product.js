import React, { useState, useEffect } from 'react';
import { Button, Form, Input, TextArea, Dropdown } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductDataService from '../services/product-data-service';
import ProductModelService from '../services/product-model-service';
import ProductForm from '../views/product-form';


const UpdateProduct = () => {
  const { productId } = useParams(); 
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const initialProduct = ProductModelService.setDefaultProduct();

  const [product, setProduct] = useState({ ...initialProduct });
  const [validationErrors, setValidationErrors] = useState({});

  const categoriesOptions =  ProductModelService.getCategories();

  useEffect(() => {
    const fetchProduct = async () => {
        setIsLoading(true);
        try {
            const data = await ProductDataService.getProductById(productId);
            setProduct(data);
            setIsLoading(false);
        } catch (error) {
            console.error("There was an error fetching the product", error);
            setError(error);
            setIsLoading(false);
        }
    };

    fetchProduct();
}, [productId]); 

const handleChange = (e, { name, value }) => {
  const updatedProductField = ProductModelService.updateProductField(product, name, value);
  setProduct(updatedProductField);
};

  const handleSubmit = async () => {
    const errors = ProductModelService.validateProduct(product);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors); 
      return;
    }
    setValidationErrors({});
    try {
        const response = await ProductDataService.updateProduct(productId, product);
        alert(response.message);
    } catch (error) {
        console.error("There was an error updating the product", error);
        setError(error);
    }
};

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;

  return (
    <ProductForm
        product={product}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        categoriesOptions={categoriesOptions}
        validationErrors={validationErrors}
      />
  );
};

export default UpdateProduct;
