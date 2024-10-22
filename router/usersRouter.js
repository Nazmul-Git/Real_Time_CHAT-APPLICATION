// EXTERNAL IMPORT
const express = require('express');

// INTERNAL IMPORT
const { getUsers, addUser, removeUser } = require('../controller/usersController');
const setPageTitle = require('../middleware/common/setPageTitle');
const avatarUpload = require('../middleware/users/avatarUpload');
const { addUserValidator, addUserValidationHandler } = require('../middleware/users/userValidators');

const router = express.Router();

// USERS PAGE
router.get('/', setPageTitle('Users'), getUsers);

// ADD USER
router.post('/', avatarUpload, addUserValidator, addUserValidationHandler, addUser); 

// DELETE USER
router.delete('/:id', removeUser);



module.exports = router;