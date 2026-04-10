const express = require('express');
const router = express.Router();
const {
    createAppointment,
    updateAppointmentStatus,
    getAppointments,
    cancelAppointment
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/book', protect, createAppointment);
router.get('/', protect, getAppointments);
router.put('/status', protect, authorize('Doctor', 'Receptionist', 'Admin'), updateAppointmentStatus);
router.put('/cancel/:appointmentId', protect, cancelAppointment);

module.exports = router;