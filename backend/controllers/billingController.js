const Bill = require('../models/Bill');

exports.createBill = async (req, res) => {
    try {
        const { patientId, items, totalAmount } = req.body;

        const bill = await Bill.create({
            patient: patientId,
            items,
            totalAmount,
            status: 'Pending',
        });

        res.status(201).json({
            success: true,
            message: 'Invoice generated successfully',
            data: bill,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error generating bill', error: error.message });
    }
};