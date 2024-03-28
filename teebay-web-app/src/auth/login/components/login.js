import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import AuthDataService from '../services/auth-data-service';
import UserModelService from '../../user/services/user-model-service';


const Login = () => {

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: ''
  });

  const [validationErrors, setValidationErrors] = useState({});

  // Handle the change in inputs for both email and password in a unified function
  const handleChange = (e, { name, value }) => {
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validation logic here
    const errors = UserModelService.validateUser(loginDetails);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
  
    setValidationErrors({}); // Clear previous errors
  
    AuthDataService.authenticateUser(loginDetails)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        alert(response.data.message);
        navigate('/'); // Navigate after successful login
      })
      .catch((error) => {
        setError('Login failed. Please check your credentials and try again.');
        alert('Login failed. Please check your credentials and try again.');
        console.error('Login failed:', error);
      });
  };
  
  const handleSignupClick = () => {
    navigate('/create-user');
  };

  return (
    <Form className="standard-form">
      <Form.Field
        control={Input}
        label="Email"
        placeholder="email"
        name="email"
        value={loginDetails.email}
        onChange={handleChange}
        error={validationErrors.email ? { content: validationErrors.email, pointing: 'below' } : null}
      />
      <Form.Field
        control={Input}
        label="Password"
        placeholder="Password"
        type="password"
        name="password"
        value={loginDetails.password}
        onChange={handleChange}
        error={validationErrors.password ? { content: validationErrors.password, pointing: 'below' } : null}
      />
    <Button onClick={handleSubmit} secondary>Login</Button>
    <Button onClick={handleSignupClick}>Sign Up</Button>
  </Form>

  );
}

export default Login;
