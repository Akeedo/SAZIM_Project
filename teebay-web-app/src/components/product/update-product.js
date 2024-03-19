import React, { useState, useEffect } from 'react';
import { Button, Form, Input, TextArea, Dropdown } from 'semantic-ui-react';
import axios from 'axios';

const UpdateProduct = ({ productId }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({
    title: '',
    category: '',
    description: '',
    price: ''
  });

  const categoriesOptions = [
    { key: 'electronics', value: 'electronics', text: 'Electronics' },
    { key: 'furniture', value: 'furniture', text: 'Furniture' },
    { key: 'home_appliances', value: 'home_appliances', text: 'Home Appliances' },
    { key: 'sporting_goods', value: 'sporting_goods', text: 'Sporting Goods' },
    { key: 'outdoor', value: 'outdoor', text: 'Outdoor' },
    { key: 'toys', value: 'toys', text: 'Toys' },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://65f88c14df151452460fa890.mockapi.io/api/v1/products/${productId}`);
        setProduct(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("There was an error fetching the product", error);
        setError(error);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e, { name, value }) => setProduct({ ...product, [name]: value });

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`https://65f88c14df151452460fa890.mockapi.io/api/v1/products/${productId}`, product);
      console.log(response.data);
      // Handle response or success side effects here
    } catch (error) {
      console.error("There was an error updating the product", error);
      setError(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;

  return (
    <Form className="update-form" onSubmit={handleSubmit}>
      <Form.Field
        control={Input}
        label='Title'
        placeholder='Title'
        name='title'
        value={product.title}
        onChange={handleChange}
      />
      <Form.Field
        control={Dropdown}
        label='Category'
        placeholder='Category'
        fluid
        selection
        options={categoriesOptions}
        name='category'
        value={product.category}
        onChange={handleChange}
      />
      <Form.Field
        control={TextArea}
        label='Description'
        placeholder='Description'
        name='description'
        value={product.description}
        onChange={handleChange}
      />
      <Form.Field
        control={Input}
        label='Price'
        placeholder='Price'
        name='price'
        value={product.price}
        type='number'
        onChange={handleChange}
      />
      <Button type='submit' loading={isLoading}>Update</Button>
    </Form>
  );
};

export default UpdateProduct;
