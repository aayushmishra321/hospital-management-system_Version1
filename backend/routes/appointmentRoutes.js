const express = require('express');
const router = express.Router();
const {
    createAppointment,
    updateAppointmentStatus,
    getAppointments,
    getTodaysAppointments,
    cancelAppointment
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Patient books an appointment
router.post('/book', protect, authorize('Patient'), createAppointment);

// Get appointments (filtered by role in controller)
router.get('/', protect, getAppointments);

// Today's queue — for Staff and Doctor
router.get('/today', protect, authorize('Admin', 'Receptionist', 'Doctor'), getTodaysAppointments);

// Update status — Staff actions only
router.put('/status', protect, authorize('Doctor', 'Receptionist', 'Admin'), updateAppointmentStatus);

// Cancel — Patient cancels own, Admin can cancel any
router.delete('/:id', protect, authorize('Patient', 'Admin'), cancelAppointment);

module.exports = router;