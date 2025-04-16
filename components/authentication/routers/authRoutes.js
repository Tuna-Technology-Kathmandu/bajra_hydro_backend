const express = require("express");
const router = express.Router();

const registerUser = require("../controllers/SignUpController");
const loginUser = require("../controllers/SignInController");
const forgotPassword = require("../controllers/ForgotPasswordController");
const resetPassword = require("../controllers/ResetPasswordController");
const { getSecurityQuestions, setSecurityQuestions } = require("../controllers/SecurityQuestion");
const refreshToken = require("../controllers/refreshTokenController")

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword); 
router.post("/reset-password", resetPassword);
router.get("/security-questions", getSecurityQuestions);
router.post("/set-security-questions", setSecurityQuestions);
router.post("/refresh-token", refreshToken)

module.exports = router;
