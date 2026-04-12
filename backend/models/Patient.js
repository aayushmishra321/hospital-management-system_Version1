const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    age: { type: Number },
    gender: { type: String },
    bloodGroup: { type: String },
    address: { type: String },
    history: [{ type: String }]
}, { timestamps: true });
module.exports = mongoose.model('Patient', patientSchema);