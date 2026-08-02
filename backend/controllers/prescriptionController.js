const Prescription = require('../models/Prescription');
const Appointment = require('../models/Appointment');

// POST /api/prescriptions — Doctor only
exports.createPrescription = async (req, res) => {
    try {
        const { appointmentId, patientId, medications, diagnosis, notes } = req.body;
        const doctorId = req.user._id;

        if (!patientId || !medications || !diagnosis) {
            return res.status(400).json({ message: 'patientId, medications, and diagnosis are required' });
        }

        const prescription = await Prescription.create({
            appointment: appointmentId,
            patient: patientId,
            doctor: doctorId,
            medications,
            diagnosis,
            notes,
        });

        // Mark appointment as completed
        if (appointmentId) {
            await Appointment.findByIdAndUpdate(appointmentId, { status: 'Completed' });
        }

        res.status(201).json({ success: true, data: prescription });
    } catch (error) {
        res.status(500).json({ message: 'Error creating prescription', error: error.message });
    }
};

// GET /api/prescriptions — Patient sees own; Doctor sees what they wrote; Admin sees all
exports.getPrescriptions = async (req, res) => {
    try {
        const filter = {};
        if (req.user.role === 'Patient') {
            filter.patient = req.user._id;
        } else if (req.user.role === 'Doctor') {
            filter.doctor = req.user._id;
        }

        const prescriptions = await Prescription.find(filter)
            .populate('patient', 'name email')
            .populate('doctor', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: prescriptions.length, data: prescriptions });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching prescriptions', error: error.message });
    }
};
