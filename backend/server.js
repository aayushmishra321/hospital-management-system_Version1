const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors()); // Allows your React frontend to communicate with this backend
app.use(express.json()); // Parses incoming JSON data

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(' MongoDB Connected Successfully'))
    .catch((err) => console.error(' MongoDB Connection Error:', err));

app.use('/api/auth', authRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'Server is healthy and running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});