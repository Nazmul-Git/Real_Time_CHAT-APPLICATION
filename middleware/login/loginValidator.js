const { check, validationResult } = require('express-validator');

const checkLoginValidatior = [
    check('username')
        .isLength({
            min: 1
        })
        .withMessage('Mobile number or email is required!'),

    check('password')
        .isLength({
            min: 1
        })
        .withMessage('Password is rerquired!')
];

const loginValidationHandler = function(req, res, next){
    const errors = validationResult(req);
    const mappedErrors= errors.mapped();
    if(Object.keys(mappedErrors).length === 0){
        next();
    }else{
        res.render('index', {
            data: {
                username: req.body.username
            },
            errors: {
                username: mappedErrors.username || null,
                password: mappedErrors.password || null,
                common: { message: err.message }
            }
        });
    }
}


module.exports = {
    checkLoginValidatior,
    loginValidationHandler,
}