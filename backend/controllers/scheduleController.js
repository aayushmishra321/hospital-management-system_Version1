const DoctorSchedule = require('../models/DoctorSchedule');

exports.updateSchedule = async (req, res) => {
    try {
        const { dayOfWeek, startTime, endTime, isAvailable } = req.body;
        const doctorId = req.user.id;

        const schedule = await DoctorSchedule.findOneAndUpdate(
            { doctor: doctorId, dayOfWeek },
            { startTime, endTime, isAvailable },
            { new: true, upsert: true }
        );

        res.status(200).json({ success: true, data: schedule });
    } catch (error) {
        res.status(500).json({ message: 'Error updating doctor schedule', error: error.message });
    }
};