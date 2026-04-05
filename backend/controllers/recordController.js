const PatientRecord = require('../models/PatientRecord');

exports.createPatientRecord = async (req, res) => {
    try {
        const { patientId, symptoms, diagnosis, vitals } = req.body;
        const doctorId = req.user.id;

        const record = await PatientRecord.create({
            patient: patientId,
            doctor: doctorId,
            symptoms,
            diagnosis,
            vitals,
        });

        res.status(201).json({ success: true, data: record });
    } catch (error) {
        res.status(500).json({ message: 'Error saving patient record', error: error.message });
    }
};