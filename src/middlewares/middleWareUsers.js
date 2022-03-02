const validator = require('express-validator');
const passwordConfirm = require('./validationPasswordConfirm');
exports.middleWareUsers = 
{
    email:
    validator.body('email').isEmail().withMessage('Please use a valid email format'),
    password:
    validator.body('password').isLength({ min:8, max:16 }).withMessage('Your Password must be min:8 max:16 characters'),
    confirm:
    validator.body('confirmPassword').custom(passwordConfirm),
};
