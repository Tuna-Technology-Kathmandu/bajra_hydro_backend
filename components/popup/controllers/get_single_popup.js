const Popup = require("../models/popup_models");

const getSinglePopup = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Popup.findById(id).lean();

    if (!gallery) {
      return res.status(404).json({ message: "Popup not found" });
    }

    return res.status(200).json({
      message: "Popup fetched successfully",
      gallery,
    });
  } catch (error) {
    console.error("Get Single Gallery Error:", error.message);
    return res.status(500).json({ message: "Failed to fetch popup" });
  }
};

module.exports = getSinglePopup;
