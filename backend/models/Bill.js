const mongoose = require('mongoose');
const billSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Paid', 'Overdue'], default: 'Pending' },
    dueDate: { type: Date }
}, { timestamps: true });
module.exports = mongoose.model('Bill', billSchema);