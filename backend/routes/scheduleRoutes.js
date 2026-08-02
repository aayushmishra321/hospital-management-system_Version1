const express = require('express');
const router = express.Router();
const { updateSchedule, getSchedule } = require('../controllers/scheduleController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', protect, authorize('Doctor'), getSchedule);
router.put('/update', protect, authorize('Doctor', 'Admin'), updateSchedule);

module.exports = router;