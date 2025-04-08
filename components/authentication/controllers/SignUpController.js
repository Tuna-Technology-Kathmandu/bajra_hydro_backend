const User = require("../../users/models/User");
const { registerValidation } = require("../helper/authValidator");
const { predefinedSecurityQuestions } = require("./SecurityQuestion");
const bcrypt = require("bcryptjs");


const registerUser = async (req, res) => {
  try {
    const { error, value } = registerValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { fullname, email, password, role, securityData } = value;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User with this email already exists." });
    }

    const areAllQuestionsValid = securityData.questions.every(q =>
      predefinedSecurityQuestions.includes(q.question)
    );
    if (!areAllQuestionsValid) {
      return res.status(400).json({ message: "One or more selected security questions are invalid." });
    }

    const plainTextQuestions = securityData.questions.map(({ question, answer }) => {
      return { question, answer: answer.trim() }; 
    });

    const expirydate = new Date();
    expirydate.setMonth(expirydate.getMonth() + 1);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      role: role || "subscriber",
      is_security_qxn_added: true,
      securityData: {
        questions: plainTextQuestions, 
        expirydate
      }
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered successfully." });

  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({ message: "Internal server error during registration." });
  }
};

module.exports = registerUser;
