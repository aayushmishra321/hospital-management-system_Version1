const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Send an email notification.
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} html - HTML body of the email
 */
const sendEmail = async (to, subject, html) => {
    if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your_email@gmail.com') {
        console.log(`[Email Skipped] EMAIL_USER not configured. Would send to: ${to}`);
        console.log(`[Email Subject]: ${subject}`);
        return;
    }
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            to,
            subject,
            html,
        });
        console.log(`✅ Email sent to ${to}: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error(`❌ Email failed to ${to}:`, error.message);
    }
};

const appointmentConfirmationEmail = (patientName, doctorName, date, timeSlot, department) => `
<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; background: #f4f7f9; padding: 20px;">
  <div style="max-width: 600px; margin: auto; background: white; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
    <div style="background: #0ea5e9; padding: 24px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 22px;">HMS Enterprise</h1>
      <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0;">Appointment Confirmation</p>
    </div>
    <div style="padding: 32px;">
      <h2 style="color: #1e293b; margin-top: 0;">Hello, ${patientName}!</h2>
      <p style="color: #64748b;">Your appointment has been successfully booked. Here are your details:</p>
      <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Doctor</td><td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${doctorName}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Department</td><td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${department}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Date</td><td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${new Date(date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Time</td><td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${timeSlot}</td></tr>
        </table>
      </div>
      <p style="color: #64748b; font-size: 14px;">Please arrive 15 minutes early. Bring your ID and any previous medical records.</p>
    </div>
    <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="color: #94a3b8; font-size: 12px; margin: 0;">HMS Enterprise Hospital Management System</p>
    </div>
  </div>
</body>
</html>
`;

module.exports = { sendEmail, appointmentConfirmationEmail };
