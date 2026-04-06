const express = require('express');
const cors = require('cors');
const { apiLimiter } = require('./middleware/securityMiddleware');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const billingRoutes = require('./routes/billingRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const recordRoutes = require('./routes/recordRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/', apiLimiter);
app.use('/api/records', recordRoutes);
app.use('/api/schedules', scheduleRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/prescriptions', prescriptionRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ status: 'Hospital Management System API is running successfully' });
});

module.exports = app;