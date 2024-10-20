// EXTERNAL IMPORT
const express = require('express');

// INTERNAL IMPORT
const { getUsers } = require('../controller/usersController');
const setPageTitle = require('../common/setPageTitle');

const router = express.Router();

router.get('/', setPageTitle('Users'), getUsers);

module.exports = router;