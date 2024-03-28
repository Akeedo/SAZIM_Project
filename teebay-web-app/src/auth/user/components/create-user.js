import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is used appropriately within UserDataService
import UserDataService from '../services/user-data-service';
import UserModelService from '../services/user-model-service';
import UserForm from '../views/user-form'; // Adjust paths as necessary

const CreateUser = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const initialUser = UserModelService.createDefaultUser(); // Assume similar method in UserModelService\
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    const navigate = useNavigate();

    const [user, setUser] = useState({
     ...initialUser
    });

    const handleConfirmPasswordChange = (e, { value }) => {
        setConfirmPassword(value);
    };

    const handleChange = (e, { name, value }) => {
        const updatedUserField = UserModelService.updateUserField(user, name, value);
        setUser(updatedUserField);
    };

    const handleSubmit = async () => {
            const errors = UserModelService.validateCreateUser(user);
                if (Object.keys(errors).length > 0) {
                    setValidationErrors(errors); 
                    return;
        }
        setValidationErrors({});

        setIsLoading(true);
        try {
            if (user.password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }
            const response = await UserDataService.addUser(user); 
           
            setIsLoading(false);
            if(!response.error){
                alert(response.message);
                navigate('/login');
            }
        } catch (error) {
            console.error("There was an error posting the data", error);
            setError(error);
            setIsLoading(false);
        }
    };

    return (
        <UserForm
            user={user}
            handleChange={handleChange}
            handleConfirmPasswordChange={handleConfirmPasswordChange}
            confirmPassword={confirmPassword}
            handleSubmit={handleSubmit}
            validationErrors={validationErrors}
        />
    );
};

export default CreateUser;
