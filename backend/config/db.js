const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.warn(`⚠️ Warning: Server is running but database is disconnected. API calls will fail until MongoDB is fixed.`);
        // Removed process.exit(1) so the server can still bind to the port and return CORS headers/errors
    }
};

module.exports = connectDB;
