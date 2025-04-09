const express = require("express");
const router = express.Router();

const registerUser = require("../controllers/SignUpController");
const loginUser = require("../controllers/SignInController");
const forgotPassword = require("../controllers/ForgotPasswordController");
const resetPassword = require("../controllers/ResetPasswordController");
const { getSecurityQuestions, setSecurityQuestions } = require("../controllers/SecurityQuestion");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword); 
router.post("/reset-password", resetPassword);
router.get("/security-questions", getSecurityQuestions);
router.post("/set-security-questions", setSecurityQuestions);

module.exports = router;
