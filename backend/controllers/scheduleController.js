const DoctorSchedule = require('../models/DoctorSchedule');

// GET /api/schedules
exports.getSchedule = async (req, res) => {
    try {
        const doctorId = req.user._id;
        let schedule = await DoctorSchedule.find({ doctor: doctorId });
        
        // If empty, return a default week schedule
        if (schedule.length === 0) {
            const defaultDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            const newSchedules = defaultDays.map(day => ({
                doctor: doctorId,
                dayOfWeek: day,
                startTime: '10:00 AM',
                endTime: '04:00 PM',
                isAvailable: day !== 'Sunday' && day !== 'Saturday'
            }));
            
            schedule = await DoctorSchedule.insertMany(newSchedules);
        }

        // Sort days correctly
        const dayOrder = { 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6, 'Sunday': 7 };
        schedule.sort((a, b) => dayOrder[a.dayOfWeek] - dayOrder[b.dayOfWeek]);

        res.status(200).json({ success: true, data: schedule });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schedule', error: error.message });
    }
};

// PUT /api/schedules/update
exports.updateSchedule = async (req, res) => {
    try {
        const { schedules } = req.body; // Expects an array of schedules
        const doctorId = req.user._id;

        if (!Array.isArray(schedules)) {
            return res.status(400).json({ message: 'Schedules must be an array' });
        }

        const updatedSchedules = [];
        for (const sch of schedules) {
            const updated = await DoctorSchedule.findOneAndUpdate(
                { doctor: doctorId, dayOfWeek: sch.dayOfWeek },
                { startTime: sch.startTime, endTime: sch.endTime, isAvailable: sch.isAvailable },
                { new: true, upsert: true }
            );
            updatedSchedules.push(updated);
        }

        res.status(200).json({ success: true, data: updatedSchedules });
    } catch (error) {
        res.status(500).json({ message: 'Error updating doctor schedule', error: error.message });
    }
};