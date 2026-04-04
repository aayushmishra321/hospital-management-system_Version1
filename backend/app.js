const express = require('express');
const cors = require('cors');
const { apiLimiter } = require('./middleware/securityMiddleware');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const billingRoutes = require('./routes/billingRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/', apiLimiter);

// Mount Domain Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/prescriptions', prescriptionRoutes);

// Root Route
app.get('/', (req, res) => {
    res.status(200).json({ status: 'Hospital Management System API is running successfully' });
});

module.exports = app;