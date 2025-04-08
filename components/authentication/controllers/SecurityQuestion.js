
const predefinedSecurityQuestions = [
    "What was your favorite movie as a teenager?",
    "What was the name of your first school",
    "What is your father’s middle name?",
    "What was your favorite childhood cartoon?",
    "In what city were you born?",
    "What is the name of your childhood best friend?",
    "What was your first job?",
    "What was your childhood nickname?",
    "Who was your favorite teacher in high school?",
    "What was your favorite food growing up?"
  ];
  
  exports.getSecurityQuestions = (req, res) => {
    res.status(200).json({ questions: predefinedSecurityQuestions });
  };

  exports.predefinedSecurityQuestions = predefinedSecurityQuestions;
  