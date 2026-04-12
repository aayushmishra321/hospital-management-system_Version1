const mongoose = require('mongoose');
const prescriptionSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    medications: [{ name: String, dosage: String, frequency: String }],
    instructions: { type: String },
    date: { type: Date, default: Date.now }
}, { timestamps: true });
module.exports = mongoose.model('Prescription', prescriptionSchema);