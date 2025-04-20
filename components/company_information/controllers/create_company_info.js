const CompanyInfo = require("../models/company_info_model");
const companyInformationValidation = require("../helper/company_info_validator");

const createCompanyInfo = async (req, res) => {
  try {
    const { error, value } = companyInformationValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newEntry = new CompanyInfo({ ...value });
    await newEntry.save();

    return res.status(201).json({
      message: "Company Information created successfully",
      company_information: newEntry,
    });
  } catch (err) {
    console.error("Create Company Information Error:", err);
    return res.status(500).json({
      message: "Server error while creating Company Information",
    });
  }
};

module.exports = createCompanyInfo;
