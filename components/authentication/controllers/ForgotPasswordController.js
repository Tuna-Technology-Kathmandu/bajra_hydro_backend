const crypto = require("crypto");
const User = require("../../users/models/User");
const { forgotPasswordValidation } = require("../helper/forgotPasswordValidator");
const sendResetEmail = require("../helper/sendEmail");


// Forgot Password Controller
const forgotPassword = async (req, res) => {
  try {
    // Validate email input
    const { error, value } = forgotPasswordValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email } = value;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User with this email not found." });
    }

    // Generate secure token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Set token and expiry (15 minutes)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();
    
    sendResetEmail(email, resetToken);

    // Respond via email)
      res.status(200).json({
        message: "Password reset token generated successfully.",
        resetToken,
      });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error during password reset." });
  }
};

module.exports = forgotPassword;
