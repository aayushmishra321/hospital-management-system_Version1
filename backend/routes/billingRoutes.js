const express = require('express');
const router = express.Router();
const { createBill } = require('../controllers/billingController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/create', protect, authorize('Receptionist', 'Admin'), createBill);

module.exports = router;