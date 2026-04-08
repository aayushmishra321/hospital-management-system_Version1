const express = require('express');
const router = express.Router();
const { processPayment, getPaymentHistory } = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/process', protect, authorize('Receptionist', 'Admin', 'Patient'), processPayment);
router.get('/history', protect, authorize('Admin', 'Receptionist'), getPaymentHistory);

module.exports = router;