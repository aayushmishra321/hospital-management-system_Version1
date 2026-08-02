const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

/**
 * Send an SMS notification via Twilio.
 * @param {string} to - Recipient phone number (E.164 format, e.g. +91XXXXXXXXXX)
 * @param {string} message - SMS body text
 */
const sendSMS = async (to, message) => {
    if (!accountSid || accountSid === 'YOUR_TWILIO_SID') {
        console.log(`[SMS Skipped] Twilio not configured. Would send to: ${to}`);
        console.log(`[SMS Body]: ${message}`);
        return;
    }
    try {
        const client = twilio(accountSid, authToken);
        const result = await client.messages.create({
            body: message,
            from: fromNumber,
            to,
        });
        console.log(`✅ SMS sent to ${to}: SID ${result.sid}`);
        return result;
    } catch (error) {
        console.error(`❌ SMS failed to ${to}:`, error.message);
    }
};

const appointmentSMS = (patientName, doctorName, date, timeSlot) =>
    `HMS Enterprise: Hi ${patientName}, your appointment with ${doctorName} on ${new Date(date).toLocaleDateString('en-IN')} at ${timeSlot} is confirmed. Please arrive 15 mins early.`;

module.exports = { sendSMS, appointmentSMS };
