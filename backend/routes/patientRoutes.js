const express = require('express');
const router = express.Router();
const { registerPatient } = require('../controllers/patientController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/register', protect, authorize('Receptionist', 'Admin'), registerPatient);

module.exports = router;