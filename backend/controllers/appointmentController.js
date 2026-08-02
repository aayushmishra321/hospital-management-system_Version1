const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { sendEmail, appointmentConfirmationEmail } = require('../services/emailService');
const { sendSMS, appointmentSMS } = require('../services/smsService');

// POST /api/appointments/book  — Patient only
exports.createAppointment = async (req, res) => {
    try {
        const { doctorId, department, date, timeSlot } = req.body;
        const patientId = req.user._id;

        if (!doctorId || !department || !date || !timeSlot) {
            return res.status(400).json({ message: 'All fields are required: doctorId, department, date, timeSlot' });
        }

        // Verify the doctor actually exists and has Doctor role
        const doctor = await User.findOne({ _id: doctorId, role: 'Doctor' });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found or invalid' });
        }

        const appointment = await Appointment.create({
            patient: patientId,
            doctor: doctorId,
            department,
            date,
            timeSlot,
            status: 'Scheduled',
        });

        // Send email & SMS notifications (non-blocking)
        const patient = req.user;
        sendEmail(
            patient.email,
            'Appointment Confirmed – HMS Enterprise',
            appointmentConfirmationEmail(patient.name, doctor.name, date, timeSlot, department)
        ).catch(() => {});

        if (patient.phone) {
            sendSMS(patient.phone, appointmentSMS(patient.name, doctor.name, date, timeSlot)).catch(() => {});
        }

        res.status(201).json({
            success: true,
            message: 'Appointment booked successfully',
            data: appointment,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error booking appointment', error: error.message });
    }
};

// GET /api/appointments  — Patient sees own; Doctor sees assigned; Admin sees all
exports.getAppointments = async (req, res) => {
    try {
        const filter = {};
        if (req.user.role === 'Patient') {
            filter.patient = req.user._id;
        } else if (req.user.role === 'Doctor') {
            filter.doctor = req.user._id;
        }
        // Admin/Receptionist gets everything

        const appointments = await Appointment.find(filter)
            .populate('patient', 'name email phone')
            .populate('doctor', 'name email')
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

// GET /api/appointments/today  — For queue board (Admin/Receptionist/Doctor)
exports.getTodaysAppointments = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const filter = { date: { $gte: startOfDay, $lte: endOfDay } };
        if (req.user.role === 'Doctor') {
            filter.doctor = req.user._id;
        }

        const appointments = await Appointment.find(filter)
            .populate('patient', 'name phone')
            .populate('doctor', 'name')
            .sort({ timeSlot: 1 });

        res.status(200).json({ success: true, count: appointments.length, data: appointments });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error: error.message });
    }
};

// PUT /api/appointments/status  — Doctor / Admin / Receptionist only
exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId, status } = req.body;
        const validStatuses = ['Scheduled', 'In-Progress', 'Completed', 'Cancelled'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status },
            { new: true }
        ).populate('patient', 'name email phone');

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

// DELETE /api/appointments/:id  — Patient can cancel own; Admin can cancel any
exports.cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findById(id).populate('patient', 'name email phone');

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // A patient can only cancel their OWN appointment
        if (req.user.role === 'Patient' && appointment.patient._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You can only cancel your own appointments' });
        }

        appointment.status = 'Cancelled';
        await appointment.save();

        res.status(200).json({
            success: true,
            message: 'Appointment cancelled successfully',
            data: appointment,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling appointment', error: error.message });
    }
};