const express = require('express');
const router = express.Router();
const { getEvents, postEvent, deleteEvents } = require('../controllers/events');

router.route('/').get(getEvents);
router.route('/').post(postEvent);
router.route('/').delete(deleteEvents);

module.exports = router;