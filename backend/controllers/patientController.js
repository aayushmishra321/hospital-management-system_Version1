const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.registerPatient = async (req, res) => {
    try {
        const { name, email, phone, password, age, gender, bloodGroup, dpdpConsent } = req.body;

        if (!dpdpConsent) {
            return res.status(400).json({ message: 'Explicit DPDP consent is required for registration' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Patient with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newPatient = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role: 'Patient',
            metadata: { age, gender, bloodGroup, dpdpConsent }
        });

        res.status(201).json({
            success: true,
            message: 'Patient registered successfully with DPDP compliance',
            patientId: newPatient._id
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during patient registration', error: error.message });
    }
};