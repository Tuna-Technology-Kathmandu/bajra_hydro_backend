const CompanyInformation = require("../models/company_info_model");
const companyInformationValidation = require("../helper/company_info_validator");

const updateCompanyInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const { error, value } = companyInformationValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const companyInfo = await CompanyInformation.findById(id);
    if (!companyInfo) {
      return res.status(404).json({ message: "Company Information not found" });
    }

    companyInfo.company_info_title = value.company_info_title;
    companyInfo.company_info = value.company_info;
    companyInfo.history_title = value.history_title;
    companyInfo.history_description = value.history_description;

    await companyInfo.save();

    return res.status(200).json({
      message: "Company Information updated successfully",
      company_information: companyInfo,
    });
  } catch (err) {
    console.error("Update Company Information Error:", err);
    return res.status(500).json({
      message: "Server error while updating Company Information",
    });
  }
};

module.exports = updateCompanyInfo;
