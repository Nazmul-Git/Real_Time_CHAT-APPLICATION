// EXTERNAL IMPORT
const express = require('express');

// INTERNAL IMPORT
const { getLogin } = require('../controller/loginController')


const router = express.Router();


// login router
router.get('/', getLogin);

module.exports = router;