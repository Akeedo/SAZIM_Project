import React, { useState, useRef } from 'react';
import { Button, Form, Input, TextArea, Dropdown } from 'semantic-ui-react';
import axios from 'axios';

const CreateProduct = () => {
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

  const handleChange = (e, { name, value }) => setProduct({ ...product, [name]: value });

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`https://65f88c14df151452460fa890.mockapi.io/api/v1/products`, product);
      console.log(response.data);
      // Handle response or success side effects here
    } catch (error) {
      console.error("There was an error posting the data", error);
    }
  };

  return (
    <Form className="create-form" onSubmit={handleSubmit}>
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
      <Button type='submit'>Submit</Button>
    </Form>
  );
};

export default CreateProduct;
