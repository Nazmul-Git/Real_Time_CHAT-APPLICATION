// EXTERNAL IMPORT
const express = require('express');

// INTERNAL IMPORT
const { getLogin, login, logout } = require('../controller/loginController');
const setPageTitle = require('../middleware/common/setPageTitle');
const { checkLoginValidatior, loginValidationHandler } = require('../middleware/login/loginValidator');


const router = express.Router();
// PAGE TITLE
const pageTitle='Login';

// login router page
router.get('/', setPageTitle(pageTitle), getLogin);

// PROCESS LOGIN
router.post('/',setPageTitle(pageTitle), checkLoginValidatior, loginValidationHandler, login);

// logout
router.delete('/', logout);


module.exports = router;