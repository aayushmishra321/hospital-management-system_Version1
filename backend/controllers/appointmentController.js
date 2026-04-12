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

exports.getAppointments = async (req, res) => {
    try {
        const filter = {};
        if (req.user.role === 'Patient') {
            filter.patient = req.user.id;
        } else if (req.user.role === 'Doctor') {
            filter.doctor = req.user.id;
        }

        const appointments = await Appointment.find(filter)
            .populate('patient', 'name email phone')
            .populate('doctor', 'name email metadata')
            .sort({ date: 1 });

        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error: error.message });
    }
};

exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId, status } = req.body;

        const appointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Appointment status updated',
            data: appointment,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating appointment status', error: error.message });
    }
};

exports.cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        const appointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status: 'Cancelled' },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Appointment cancelled successfully',
            data: appointment,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling appointment', error: error.message });
    }
};