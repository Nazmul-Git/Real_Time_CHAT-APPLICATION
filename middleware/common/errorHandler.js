const createError = require('http-errors');

function notFoundMiddleware(req, res, next) {
    next(createError(404, 'Your requested content was not found.'));
}

//  default error handler
function errorHandler(err, req, res, next) {
    res.locals.error = process.env.NODE_ENV === 'development' ? err : { message: err.message };
    res.status(err.status || 500);
    if (res.locals.html) {
        // html response
        res.render('error', {
            title: 'Error Page!',
        })
    } else {
        // json response
        res.json(res.locals.error);
    }
}

module.exports = {
    notFoundMiddleware,
    errorHandler,
}