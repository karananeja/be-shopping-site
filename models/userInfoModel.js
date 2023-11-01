const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userInfoSchema = new Schema(
  {
    email: { type: String, required: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    birthDate: { type: String, trim: true },
  },
  { timestamps: true }
);

const UserInfo = mongoose.model('userInfo', userInfoSchema);

module.exports = UserInfo;
