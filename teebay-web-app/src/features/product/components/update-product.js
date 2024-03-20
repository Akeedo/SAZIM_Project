import React, { useState, useEffect } from 'react';
import { Button, Form, Input, TextArea, Dropdown } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductDataService from '../services/product-data-service';
import ProductModelService from '../services/product-model-service';
import ProductForm from '../views/product-form';

const UpdateProduct = () => {
  const { productId } = useParams(); 
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const initialProduct = ProductModelService.setDefaultProduct();

  const [product, setProduct] = useState({
    title: initialProduct.title,
    category: initialProduct.category,
    description: initialProduct.description,
    price: initialProduct.price
  });

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
    try {
        const updatedProduct = await ProductDataService.updateProduct(productId, product);
        console.log(updatedProduct);
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
      />
  );
};

export default UpdateProduct;
