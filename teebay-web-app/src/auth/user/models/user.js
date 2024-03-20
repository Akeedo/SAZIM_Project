const User = ({ firstName = "", lastName="", address="", phoneNumber="", email = "", password = "", id = "" } = {}) => ({
    firstName,
    lastName,
    address,
    phoneNumber,
    email,
    password,
    id,
});

export default User;
