import React from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'; // Make sure Semantic UI CSS is imported for styling

const UserForm = ({ user, handleChange, handleSubmit, handleConfirmPasswordChange, confirmPassword  }) => (
  <Form className="standard-form" onSubmit={handleSubmit}>
    <Form.Field
        control={Input}
        label='First Name'
        placeholder='First Name'
        name='firstName'
        value={user.firstName || ''}
        onChange={handleChange}
    />
    <Form.Field
        control={Input}
        label='Last Name'
        placeholder='Last Name'
        name='lastName'
        value={user.lastName || ''}
        onChange={handleChange}
    />
    <Form.Field
        control={Input}
        label='Address'
        placeholder='Address'
        name='address'
        value={user.address || ''}
        onChange={handleChange}
    />
    <Form.Field
        control={Input}
        label='Phone Number'
        placeholder='Phone Number'
        name='phoneNumber'
        value={user.phoneNumber || ''}
        onChange={handleChange}
    />
    <Form.Field
        control={Input}
        label='Email'
        placeholder='Email'
        type='email'
        name='email'
        value={user.email || ''}
        onChange={handleChange}
    />
    <Form.Field
        control={Input}
        label='Password'
        placeholder='Password'
        type='password'
        name='password'
        value={user.password || ''}
        onChange={handleChange}
    />
    <Form.Field
        control={Input}
        label='Confirm Password'
        placeholder='Confirm Password'
        type='password'
        name='confirmPassword'
        value={confirmPassword || ''}
        onChange={handleConfirmPasswordChange} // Handle confirm password change
    />
    <Button type='submit'>Submit</Button>
  </Form>
);

export default UserForm;
