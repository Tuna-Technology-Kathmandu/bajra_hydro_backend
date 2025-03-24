const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("API is running...");
});

const authRoutes = require("../components/authentication/routers/authRoutes");
router.use("/auth", authRoutes);

module.exports = router;
