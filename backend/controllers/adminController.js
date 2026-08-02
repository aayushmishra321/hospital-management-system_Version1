const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Bill = require('../models/Bill');
const { getHospitals } = require('../services/apiNinjasService');

// GET /api/admin/stats — Dashboard metrics
exports.getAdminStats = async (req, res) => {
    try {
        const [
            totalDoctors,
            totalPatients,
            totalAppointments,
            pendingAppointments,
            paidBills
        ] = await Promise.all([
            User.countDocuments({ role: 'Doctor' }),
            User.countDocuments({ role: 'Patient' }),
            Appointment.countDocuments(),
            Appointment.countDocuments({ status: 'Scheduled' }),
            Bill.aggregate([{ $match: { status: 'Paid' } }, { $group: { _id: null, total: { $sum: '$amount' } } }])
        ]);

        res.json({
            success: true,
            data: {
                totalDoctors,
                totalPatients,
                totalAppointments,
                pendingAppointments,
                totalRevenue: paidBills[0]?.total || 0,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin stats', error: error.message });
    }
};

// GET /api/admin/users — List all users (Admin only)
exports.getAllUsers = async (req, res) => {
    try {
        const { role } = req.query;
        const filter = role ? { role } : {};
        const users = await User.find(filter).select('-password').sort({ createdAt: -1 });
        res.json({ success: true, count: users.length, data: users });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// DELETE /api/admin/users/:id — Admin removes a user
exports.deleteUser = async (req, res) => {
    try {
        if (req.params.id === req.user._id.toString()) {
            return res.status(400).json({ message: 'You cannot delete your own account' });
        }
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ success: true, message: `User ${user.name} deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

// GET /api/admin/appointments — All appointments with full population
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate('patient', 'name email phone')
            .populate('doctor', 'name email')
            .sort({ date: -1 });
        res.json({ success: true, count: appointments.length, data: appointments });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error: error.message });
    }
};

// GET /api/admin/hospitals — Fetch from API Ninjas
exports.getHospitalsList = async (req, res) => {
    try {
        const { city = 'Mumbai', country = 'IN' } = req.query;
        const hospitals = await getHospitals(city, country);
        res.json({ success: true, count: hospitals.length, data: hospitals });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hospitals', error: error.message });
    }
};
