const Bill = require('../models/Bill');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

// POST /api/billing/create — Admin/Receptionist only
exports.createBill = async (req, res) => {
    try {
        const { patientId, items, totalAmount, dueDate } = req.body;

        if (!patientId || !items || !totalAmount) {
            return res.status(400).json({ message: 'patientId, items, and totalAmount are required' });
        }

        const patient = await User.findOne({ _id: patientId, role: 'Patient' });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const bill = await Bill.create({
            patient: patientId,
            items,
            amount: totalAmount,
            dueDate,
            status: 'Pending',
        });

        res.status(201).json({ success: true, message: 'Invoice generated successfully', data: bill });
    } catch (error) {
        res.status(500).json({ message: 'Error generating bill', error: error.message });
    }
};

// GET /api/billing — Admin/Receptionist sees all; Patient sees own bills
exports.getBills = async (req, res) => {
    try {
        const filter = {};
        if (req.user.role === 'Patient') {
            filter.patient = req.user._id;
        }

        const bills = await Bill.find(filter)
            .populate('patient', 'name email phone')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: bills.length, data: bills });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bills', error: error.message });
    }
};

// PUT /api/billing/:id/pay — Admin/Receptionist marks a bill as Paid
exports.markBillPaid = async (req, res) => {
    try {
        const bill = await Bill.findByIdAndUpdate(
            req.params.id,
            { status: 'Paid' },
            { new: true }
        ).populate('patient', 'name email');

        if (!bill) return res.status(404).json({ message: 'Bill not found' });

        res.status(200).json({ success: true, message: 'Bill marked as paid', data: bill });
    } catch (error) {
        res.status(500).json({ message: 'Error updating bill', error: error.message });
    }
};

// GET /api/billing/stats — Admin only
exports.getBillingStats = async (req, res) => {
    try {
        const total = await Bill.aggregate([
            { $match: { status: 'Paid' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const pending = await Bill.countDocuments({ status: 'Pending' });
        const paid = await Bill.countDocuments({ status: 'Paid' });

        res.json({
            success: true,
            data: {
                totalRevenue: total[0]?.total || 0,
                pendingCount: pending,
                paidCount: paid,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
};