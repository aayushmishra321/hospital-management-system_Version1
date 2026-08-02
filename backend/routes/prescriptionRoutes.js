const express = require('express');
const router = express.Router();
const { createPrescription, getPrescriptions } = require('../controllers/prescriptionController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Doctor writes prescription
router.post('/create', protect, authorize('Doctor'), createPrescription);

// Get prescriptions — role-filtered in controller
router.get('/', protect, authorize('Doctor', 'Patient', 'Admin'), getPrescriptions);

module.exports = router;