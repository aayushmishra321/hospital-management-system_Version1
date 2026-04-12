const express = require('express');
const router = express.Router();
const { getDoctorQueue } = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/authMiddleware');
const User = require('../models/User');

router.get('/queue', protect, authorize('Doctor'), getDoctorQueue);

// Dynamically fetch all doctors
router.get('/', protect, async (req, res) => {
    try {
        const doctors = await User.find({ role: 'Doctor' }).select('-password');
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctors' });
    }
});

module.exports = router;
