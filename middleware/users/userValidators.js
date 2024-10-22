
const { check, validationResult } = require('express-validator');

const User = require('../../SchemaModel/Peoples');
const createHttpError = require('http-errors');
const path = require('path');
const { unlink } = require('fs');


// array of middleware
const addUserValidator = [
    check('name')
        .isLength({ min: 1 })
        .withMessage('Name is required!')
        .isAlpha('en-US', { ignore: ' -' })
        .withMessage('Allow alphabet only!')
        .trim(),

    check('email')
        .isEmail()
        .withMessage('Invalid email address!')
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw createHttpError('Email already is use!');
                }
            } catch (err) {
                throw createHttpError(err.message);
            }
        }),

    check('mobile')
        .isMobilePhone('bn-BD', {
            strictMode: true
        })
        .withMessage('Mobile number must be a valid bangladeshi mobile number')
        .custom(async (value) => {
            try {
                const user = await User.findOne({ mobile: value });
                if (user) {
                    throw createHttpError('Mobile number already used!');
                }
            } catch (err) {
                throw createHttpError(err.message);
            }
        }),

    check('password')
        .isStrongPassword()
        .withMessage('Password must be at least 8 charecters long & should contain at least 1 lowercase, 1 uppercase, 1 number and 1 symble!')
];


const addUserValidationHandler = function (req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        //remove if uploaded file have
        if (req.files.length > 0) {
            const { filename } = req.files[0];
            unlink(
                path.join(__dirname, `/../public/uploads/avatar/${filename}`),
                (err)=>{
                    if(err) console.log(err.message);
                }
            )
        }

        // response the error
        res.status(500).json({
            errors: mappedErrors
        })
    }
}

module.exports = {
    addUserValidator,
    addUserValidationHandler,
}