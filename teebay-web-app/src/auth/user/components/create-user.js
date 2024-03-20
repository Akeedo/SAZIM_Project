import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is used appropriately within UserDataService
import UserDataService from '../services/user-data-service';
import UserModelService from '../services/user-model-service';
import UserForm from '../views/user-form'; // Adjust paths as necessary

const CreateUser = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const initialUser = UserModelService.createDefaultUser(); // Assume similar method in UserModelService\
    const [confirmPassword, setConfirmPassword] = useState('');

    const [user, setUser] = useState({
        firstName: initialUser.firstName,
        lastName: initialUser.lastName,
        address: initialUser.address,
        phoneNumber: initialUser.phoneNumber,
        email: initialUser.email,
        password: initialUser.password,
    });

    const handleConfirmPasswordChange = (e, { value }) => {
        setConfirmPassword(value);
    };

    const handleChange = (e, { name, value }) => {
        const updatedUserField = UserModelService.updateUserField(user, name, value);
        setUser(updatedUserField);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            if (user.password !== confirmPassword) {
                alert("Passwords do not match.");
                return; // Stop the submission if passwords don't match
            }
            const response = await UserDataService.addUser(user); 
            console.log(response.data);
            setIsLoading(false);
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
        />
    );
};

export default CreateUser;
