const { body, validationResult } = require('express-validator');

const createUserValidationRules = () => [
    body('firstName').trim().escape(),
    body('lastName').trim().escape(),
    body('address').trim().escape(),
    body('phoneNumber').trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').trim().escape(),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  createUserValidationRules,
  validate,
};
