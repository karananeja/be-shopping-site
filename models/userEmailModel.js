const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userEmailSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: (email) => {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: 'Please enter a valid email',
      },
      required: [true, 'Email required'],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('userEmail', userEmailSchema);

module.exports = User;
