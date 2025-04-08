const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'subscriber'],
    default: 'subscriber',
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  unique_id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  is_security_qxn_added: {
    type: Boolean,
    default: false,
  },
  securityData: {
    questions: {
      type: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true } // hashed
        }
      ],
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length === 3;
        },
        message: '3 security questions and answers are required.'
      }
    },
    expirydate: {
      type: Date,
      required: function () {
        return this.is_security_qxn_added;
      }
    }
  },
  resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordExpires: {
    type: Date,
    default: null
  }
}, { timestamps: true });


userSchema.pre("save", function (next) {
  if (this.is_security_qxn_added) {
    if (
      !this.securityData ||
      !this.securityData.questions ||
      this.securityData.questions.length !== 3
    ) {
      return next(new Error("3 security questions must be provided."));
    }
    if (!this.securityData.expirydate) {
      return next(new Error("Security question expiry date is required."));
    }
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
