const express = require('express');
const router = express.Router();
const { createBill, getBills, markBillPaid, getBillingStats } = require('../controllers/billingController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Admin/Receptionist creates a bill
router.post('/create', protect, authorize('Receptionist', 'Admin'), createBill);

// Get bills — role-filtered in controller (Patient sees own; staff sees all)
router.get('/', protect, authorize('Admin', 'Receptionist', 'Patient'), getBills);

// Mark a bill as paid — Staff only
router.put('/:id/pay', protect, authorize('Admin', 'Receptionist'), markBillPaid);

// Billing statistics — Admin only
router.get('/stats', protect, authorize('Admin'), getBillingStats);

module.exports = router;