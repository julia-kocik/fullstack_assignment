const express = require('express');
const router = express.Router();
const { getEvents, postEvent } = require('../controllers/events');

router.route('/').get(getEvents);
router.route('/').post(postEvent);

module.exports = router;