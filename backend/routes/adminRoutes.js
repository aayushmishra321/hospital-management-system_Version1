const express = require('express');
const router = express.Router();
const { getAdminStats, getAllUsers, deleteUser, getAllAppointments, getHospitalsList } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All admin routes require authentication + Admin role
router.use(protect, authorize('Admin'));

router.get('/stats', getAdminStats);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.get('/appointments', getAllAppointments);
router.get('/hospitals', getHospitalsList);

module.exports = router;
