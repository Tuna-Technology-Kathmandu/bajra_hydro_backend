const Popup = require("../models/popup_models");
const popupValidation = require("../helper/popup_validator");

const updatPopup = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = popupValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const popup = await Popup.findById(id);
    if (!popup) {
      return res.status(404).json({ message: "Popup not found" });
    }

    const updatedData = {};

    if (value && value.title) {
      updatedData.title = value.title;
    }

    const image = req.file?.path; 

    if (image) {
      updatedData.image = image; 
    }

    Object.assign(popup, updatedData);

    await popup.save();

    return res.status(200).json({
      message: "Popup updated successfully",
      gallery,
    });
  } catch (err) {
    console.error("Update Popup Error:", err.message);
    return res.status(500).json({
      message: "Server error while updating popup",
    });
  }
};

module.exports = { updatPopup };
