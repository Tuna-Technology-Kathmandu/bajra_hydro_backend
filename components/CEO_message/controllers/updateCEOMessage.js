const CEOMessage = require("../models/ceoMessageModel");
const ceoMessageValidation = require("../helper/ceoMessageValidator");

const updateCEOMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = ceoMessageValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const ceoMessage = await CEOMessage.findById(id);
    if (!ceoMessage) {
      return res.status(404).json({ message: "CEO Message not found" });
    }

    ceoMessage.name = value.name || ceoMessage.name;
    ceoMessage.description = value.description || ceoMessage.description;
    ceoMessage.status = value.status || ceoMessage.status;
    
    if (req.file) {
      ceoMessage.photo = req.file?.path;
    }

    await ceoMessage.save();

    return res.status(200).json({
      message: "CEO Message updated successfully.",
      ceoMessage,
    });
  } catch (error) {
    console.error("Update CEO Message Error:", error);
    return res.status(500).json({ message: "Server error while updating CEO message" });
  }
};
module.exports = updateCEOMessage;
