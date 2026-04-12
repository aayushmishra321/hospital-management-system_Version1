const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
    bill: { type: mongoose.Schema.Types.ObjectId, ref: 'Bill', required: true },
    amountPaid: { type: Number, required: true },
    method: { type: String, enum: ['Cash', 'Card', 'Online'], required: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true });
module.exports = mongoose.model('Payment', paymentSchema);