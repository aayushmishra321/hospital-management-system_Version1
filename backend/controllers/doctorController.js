const Appointment = require('../models/Appointment');

exports.getDoctorQueue = async (req, res) => {
    try {
        const doctorId = req.user.id;
        const today = new Date().toISOString().split('T')[0];

        // Fetch appointments scheduled for today for this doctor
        const queue = await Appointment.find({
            doctor: doctorId,
            date: today,
        }).populate('patient', 'name metadata');

        res.status(200).json({
            success: true,
            count: queue.length,
            data: queue,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctor queue', error: error.message });
    }
};