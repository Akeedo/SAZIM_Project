// UserModelService.js
import User from "../models/user";

const UserModelService = () => {
    const user = User;

    const validateField = (name, value) => {
        let errors = {};
      
        if (name === 'email') {
          // Email regex validation
          errors.email = /\S+@\S+\.\S+/.test(value) ? null : 'Email is not valid';
        } else if (name === 'password') {
          // Password length validation
          errors.password = value.length >= 6 ? null : 'Password must be at least 6 characters long';
        }
      
        return errors;
      };

      

      const validateFieldForUserCreate = (name, value) => {
        let errors = {};
        
        switch (name) {
          case 'firstName':
            if (!value.trim()) {
              errors.firstName = 'First name is required';
            }
            break;
          case 'lastName':
            if (!value.trim()) {
              errors.lastName = 'Last name is required';
            }
            break;
          case 'email':
            if (!/\S+@\S+\.\S+/.test(value)) {
              errors.email = 'Email is not valid';
            }
            break;
          case 'password':
            if (value.length < 6) {
              errors.password = 'Password must be at least 6 characters long';
            }
            break;
          
        }
      
        return errors;
      };

      const validateUser = (userData) => {
        let validationErrors = {};
      
        Object.keys(userData).forEach(key => {
          const fieldErrors = validateField(key, userData[key]);
          // Only add to validationErrors if there's an error
          if (fieldErrors[key] !== null) {
            validationErrors[key] = fieldErrors[key];
          }
        });
      
        return validationErrors;
      };

      const validateCreateUser = (userData) => {
        let validationErrors = {};
      
        Object.keys(userData).forEach(key => {
          const fieldErrors = validateFieldForUserCreate(key, userData[key]);
          // Since `validateField` can return an empty object or an object with a single key, we can directly merge it
          validationErrors = { ...validationErrors, ...fieldErrors };
        });
      
        return validationErrors;
      };
      
      

    const createDefaultUser = (userSetup) => {
        userSetup = user;
        return userSetup;
    };

    const updateUserField = (user, fieldName, fieldValue) => {
        return { ...user, [fieldName]: fieldValue };
    };

    return {
        createDefaultUser,
        updateUserField,
        validateUser, 
        validateCreateUser
    };
};

export default UserModelService();
