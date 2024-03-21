const { body, validationResult } = require('express-validator');

const loginValidationRules = () => [
    body('email').isEmail().normalizeEmail(),
    body('password').trim(),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    loginValidationRules,
    validate,
};
