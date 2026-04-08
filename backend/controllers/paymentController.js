const Payment = require('../models/Payment');
const Bill = require('../models/Bill');

exports.processPayment = async (req, res) => {
    try {
        const { billId, patientId, amount, method, stripeTransactionId, status } = req.body;
        const staffId = req.user.id; // Receptionist or Admin processing the payment

        const payment = await Payment.create({
            bill: billId,
            patient: patientId,
            amount,
            method,
            stripeTransactionId: stripeTransactionId || null,
            status: status || 'Success',
            receivedBy: staffId,
        });

        if (status === 'Success' || !status) {
            await Bill.findByIdAndUpdate(billId, { status: 'Paid' });
        }

        res.status(201).json({
            success: true,
            message: 'Payment recorded and bill updated successfully',
            data: payment
        });
    } catch (error) {
        res.status(500).json({ message: 'Error processing payment', error: error.message });
    }
};