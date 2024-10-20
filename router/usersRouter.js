// EXTERNAL IMPORT
const express = require('express');

// INTERNAL IMPORT
const { getUsers } = require('../controller/usersController');

const router = express.Router();

router.get('/', getUsers);

module.exports = router;