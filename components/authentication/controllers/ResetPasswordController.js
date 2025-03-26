const bcrypt = require("bcryptjs");
const User = require("../../users/models/User");
const { resetPasswordValidation } = require("../helper/resetPasswordValidator");

const resetPassword = async (req, res) => {
  try {
    // Validate input
    const { error, value } = resetPasswordValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { resetToken, newPassword } = value;

    // Find user by token and check expiry
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() }, // token must not be expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password and clear token fields
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successfully." });

  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error during password reset." });
  }
};

module.exports = resetPassword;
