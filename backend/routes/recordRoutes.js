const express = require('express');
const router = express.Router();
const { createPatientRecord } = require('../controllers/recordController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/create', protect, authorize('Doctor'), createPatientRecord);

module.exports = router;
