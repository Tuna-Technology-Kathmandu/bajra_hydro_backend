const express = require("express");
const router = express.Router();
const registerUser = require("../controllers/SignUpController");
const loginUser = require("../controllers/SignInController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
