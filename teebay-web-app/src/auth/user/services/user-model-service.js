// UserModelService.js
import User from "../models/user";

const UserModelService = () => {
    
    const user = User; 

    const createDefaultUser = () => {
        return user; 
    };

    const updateUserField = (user, fieldName, fieldValue) => {
        return { ...user, [fieldName]: fieldValue };
    };

    return {
        createDefaultUser,
        updateUserField,
    };
};

export default UserModelService();
