 const createError= require('http-errors');
 
 function notFoundMiddleware(req, res, next){
    next(createError(404, 'Your requested content was not found.'));
 }

//  default error handler
 function errorHandler(err, req, res, next){
    // res.locals.title="Error Page!";
    // res.render("error");

    // or
    
    res.render('error', {
        title: 'Error Page!'
    });
 }

 module.exports = {
    notFoundMiddleware,
    errorHandler,
 }