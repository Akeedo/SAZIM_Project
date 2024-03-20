import React from 'react';
import { Form, Input, Dropdown, TextArea, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'; // Ensure the Semantic UI CSS is imported

const ProductForm = ({ product, handleChange, handleSubmit, categoriesOptions }) => (
  <Form className="standard-form" onSubmit={handleSubmit}>
    <Form.Field
        control={Input}
        label='Title'
        placeholder='Title'
        name='title'
        value={product.title || ''}
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
        value={product.category || ''}
        onChange={handleChange}
    />
    <Form.Field
        control={TextArea}
        label='Description'
        placeholder='Description'
        name='description'
        value={product.description || ''}
        onChange={handleChange}
    />
    <Form.Field
        control={Input}
        label='Price'
        placeholder='Price'
        name='price'
        value={product.price || ''}
        type='number'
        onChange={handleChange}
    />
    <Button type='submit'>Submit</Button>
  </Form>
);

export default ProductForm;
