// GET LOGIN PAGE
function getLogin(req, res, next){
    res.render('index', {
        title: 'Login - Chat Application'
    })
}


module.exports = {
    getLogin,
}