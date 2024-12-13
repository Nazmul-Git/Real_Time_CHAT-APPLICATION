const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    // console.log(req.signedCookies);
    let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if (cookies && cookies[process.env.COOKIE_NAME]) {
        try {
            token = cookies[process.env.COOKIE_NAME];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // Pass user info to response locals if HTML response
            if (res.locals.html) {
                res.locals.loggedInUser = decoded;
            }
            next();
        } catch (err) {
            if (res.locals.html) {
                res.redirect('/');
            } else {
                res.status(401).json({
                    errors: {
                        common: {
                            message: 'Authentication failure!'
                        }
                    }
                });
            }
        }
    } else {
        if (res.locals.html) {
            res.redirect('/');
        } else {
            res.status(401).json({
                errors: {
                    common: {
                        message: 'Authentication failure!'
                    }
                }
            });
        }
    }
};

module.exports = {
    checkLogin,
};
