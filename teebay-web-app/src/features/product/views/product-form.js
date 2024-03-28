import React from 'react';
import { Form, Input, Dropdown, TextArea, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'; 
import { useNavigate } from 'react-router-dom';

const ProductForm = ({ product, handleChange, handleSubmit, categoriesOptions, validationErrors }) => { 

  const navigate = useNavigate();

  return (
    <Form className="standard-form" onSubmit={handleSubmit}>
      <Form.Field
          error={!!validationErrors.title} 
          control={Input}
          label='Title'
          placeholder='Title'
          name='title'
          value={product.title || ''}
          onChange={handleChange}
      />
      {validationErrors.title && <p className="error-message">{validationErrors.title}</p>}
      
      <Form.Field
          error={!!validationErrors.category} 
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
      {validationErrors.category && <p className="error-message">{validationErrors.category}</p>}

      <Form.Field
          error={!!validationErrors.description} 
          control={TextArea}
          label='Description'
          placeholder='Description'
          name='description'
          value={product.description || ''}
          onChange={handleChange}
      />
      {validationErrors.description && <p className="error-message">{validationErrors.description}</p>}

      <Form.Field
          error={!!validationErrors.price}
          control={Input}
          label='Price'
          placeholder='Price'
          name='price'
          type='number'
          value={product.price || ''}
          onChange={handleChange}
      />
      {validationErrors.price && <p className="error-message">{validationErrors.price}</p>}

      <Button type='submit'>Submit</Button>
      <Button onClick={() => navigate('/')} secondary>Back to Products</Button>
    </Form>
  );
};

export default ProductForm;
