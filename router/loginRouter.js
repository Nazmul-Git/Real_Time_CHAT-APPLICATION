// EXTERNAL IMPORT
const express = require('express');

// INTERNAL IMPORT
const { getLogin } = require('../controller/loginController');
const setPageTitle = require('../middleware/common/setPageTitle');


const router = express.Router();


// login router
router.get('/', setPageTitle('Login'), getLogin);

module.exports = router;