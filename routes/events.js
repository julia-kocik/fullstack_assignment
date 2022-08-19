const express = require('express');
const router = express.Router();
const { getEvents, postEvent } = require('../controllers/events');

router.route('/getEvents').get(getEvents);
router.route('/postEvent').post(postEvent);

module.exports = router;