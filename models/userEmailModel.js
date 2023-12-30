const { model, Schema } = require('mongoose');
const { environment } = require('../utils/constants');

const userEmailSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: (email) => environment.EMAIL_REGEX.test(email),
        message: 'Please enter a valid email',
      },
      required: [true, 'Email required'],
    },
    password: String,
  },
  { timestamps: true }
);

const UserEmail = model('userEmail', userEmailSchema);

module.exports = UserEmail;
