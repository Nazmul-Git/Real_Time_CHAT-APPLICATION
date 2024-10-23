const createHttpError = require('http-errors');
const User = require('../SchemaModel/Peoples');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// GET LOGIN PAGE
function getLogin(req, res, next) {
    res.render('index', {
        title: 'Login - Chat Application'
    })
}

// LOGIN
async function login(req, res, next) {
    try {
        const user = await User.findOne({
            $or: [{ email: req.body.username }, { mobile: req.body.username }]
        });

        if (user && user._id) {
            const isValidPass = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (isValidPass) {
                const userObject = {
                    username: user.name,
                    mobile: user.mobile,
                    email: user.email,
                    role: 'user'
                }

                // GENERATE TOKEN
                const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY
                })

                // SET COOKIE
                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXPIRY,
                    httpOnly: true,
                    signed: true
                })

                res.locals.loggedInUser = userObject;
                res.render('inbox');
            } else {
                throw createHttpError('Login failed! Please Try again.');
            }
        } else {
            throw createHttpError('Login failed! Please Try again.');
        }
    } catch (err) {
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
    getLogin,
    login,
}