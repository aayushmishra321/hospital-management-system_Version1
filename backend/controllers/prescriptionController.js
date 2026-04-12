const Prescription = require('../models/Prescription');

exports.createPrescription = async (req, res) => {
    try {
        const { appointmentId, patientId, medicines, diagnosis, notes } = req.body;
        const doctorId = req.user._id;

        const prescription = await Prescription.create({
            appointment: appointmentId,
            patient: patientId,
            doctor: doctorId,
            medicines,
            diagnosis,
            notes,
        });

        res.status(201).json({ success: true, data: prescription });
    } catch (error) {
        res.status(500).json({ message: 'Error creating prescription', error: error.message });
    }
};
