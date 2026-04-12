require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas using the modular configuration, then start the server listener
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 HMS Enterprise Server running securely on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Failed to start server due to database connection error:', err);
        process.exit(1);
    });