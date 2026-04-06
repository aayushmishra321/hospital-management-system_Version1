const express = require('express');
const router = express.Router();
const { updateSchedule } = require('../controllers/scheduleController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/update', protect, authorize('Doctor', 'Admin'), updateSchedule);

module.exports = router;