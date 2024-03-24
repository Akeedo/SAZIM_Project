import React, { useState } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import AuthDataService from '../services/auth-data-service';


const Login = () => {
  // State hooks for email and password
  const [error, setError] = useState(null);
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: ''
  });

  // Handle the change in inputs for both email and password in a unified function
  const handleChange = (e, { name, value }) => {
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async () => {
 
    AuthDataService.authenticateUser(loginDetails)
  .then((response) => {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  })
  .catch((error) => {
    // Handle any errors that occurred during authenticateUser
    console.error('Login failed:', error);
  });

  };

  return (
    <Form className="standard-form" onSubmit={handleSubmit}>
      <Form.Field
        control={Input}
        label='email'
        placeholder='email'
        name='email'
        value={loginDetails.email}
        onChange={handleChange}
      />
      <Form.Field
        control={Input}
        label='Password'
        placeholder='Password'
        type='password'
        name='password'
        value={loginDetails.password}
        onChange={handleChange}
      />
      <Button type='submit'>Login</Button>
    </Form>
  );
}

export default Login;
