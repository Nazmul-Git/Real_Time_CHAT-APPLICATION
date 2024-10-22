const express = require('express');
const { getInbox } = require('../controller/inboxController');
const setPageTitle = require('../middleware/common/setPageTitle');

const router = express.Router();

router.get('/', setPageTitle('Inbox'), getInbox);

module.exports = router;