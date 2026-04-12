const mongoose = require('mongoose');

const patientRecordSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    symptoms: { type: String, required: true },
    diagnosis: { type: String },
    vitals: {
        bp: String,
        temperature: String,
        pulse: String,
    },
    notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('PatientRecord', patientRecordSchema);
