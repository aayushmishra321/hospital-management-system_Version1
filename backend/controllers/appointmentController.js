const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
    try {
        const { doctorId, department, date, timeSlot } = req.body;
        const patientId = req.user.id;

        const appointment = await Appointment.create({
            patient: patientId,
            doctor: doctorId,
            department,
            date,
            timeSlot,
            status: 'Scheduled',
        });

        res.status(201).json({
            success: true,
            message: 'Appointment booked successfully',
            data: appointment,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error booking appointment', error: error.message });
    }
};