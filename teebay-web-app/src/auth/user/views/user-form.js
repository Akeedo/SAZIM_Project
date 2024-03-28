import React from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { useNavigate } from 'react-router-dom';

const UserForm = ({
  user,
  handleChange,
  handleSubmit,
  handleConfirmPasswordChange,
  confirmPassword,
  validationErrors
}) => {

    const navigate = useNavigate();
  return (
  <Form className="standard-form" onSubmit={handleSubmit}>
    <Form.Field
      error={validationErrors.firstName && { content: validationErrors.firstName, pointing: 'below' }}
      control={Input}
      label='First Name'
      placeholder='First Name'
      name='firstName'
      value={user.firstName || ''}
      onChange={handleChange}
    />
    <Form.Field
      error={validationErrors.lastName && { content: validationErrors.lastName, pointing: 'below' }}
      control={Input}
      label='Last Name'
      placeholder='Last Name'
      name='lastName'
      value={user.lastName || ''}
      onChange={handleChange}
    />
    <Form.Field
      error={validationErrors.address && { content: validationErrors.address, pointing: 'below' }}
      control={Input}
      label='Address'
      placeholder='Address'
      name='address'
      value={user.address || ''}
      onChange={handleChange}
    />
    <Form.Field
      error={validationErrors.phoneNumber && { content: validationErrors.phoneNumber, pointing: 'below' }}
      control={Input}
      label='Phone Number'
      placeholder='Phone Number'
      name='phoneNumber'
      value={user.phoneNumber || ''}
      onChange={handleChange}
    />
    <Form.Field
      error={validationErrors.email && { content: validationErrors.email, pointing: 'below' }}
      control={Input}
      label='Email'
      placeholder='Email'
      type='email'
      name='email'
      value={user.email || ''}
      onChange={handleChange}
    />
    <Form.Field
      error={validationErrors.password && { content: validationErrors.password, pointing: 'below' }}
      control={Input}
      label='Password'
      placeholder='Password'
      type='password'
      name='password'
      value={user.password || ''}
      onChange={handleChange}
    />
    <Form.Field
      error={validationErrors.confirmPassword && { content: validationErrors.confirmPassword, pointing: 'below' }}
      control={Input}
      label='Confirm Password'
      placeholder='Confirm Password'
      type='password'
      name='confirmPassword'
      value={confirmPassword || ''}
      onChange={handleConfirmPasswordChange}
    />
    <Button type='submit'>Submit</Button>
    <Button onClick={() => navigate('/login')} secondary>Back to Products</Button>
  </Form>
  );
};

export default UserForm;
