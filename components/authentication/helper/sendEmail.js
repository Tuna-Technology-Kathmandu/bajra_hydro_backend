const nodemailer = require("nodemailer");

const sendResetEmail = (to, resetToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Password Reset Request",
    text: `You requested a password reset. Click the link to reset your password:\n\n${resetURL}\n\nThis link will expire in 15 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("❌ Email sending failed:", error.message);
    } else {
      console.log("✅ Email sent:", info.response);
    }
  });
};

module.exports = sendResetEmail;
