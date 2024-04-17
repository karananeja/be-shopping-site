const { model, Schema } = require('mongoose');

const userInfoSchema = new Schema(
  {
    email: { type: String, required: true },
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    birthDate: { type: Number, trim: true },
  },
  { timestamps: true }
);

const UserInfo = model('userInfo', userInfoSchema);

module.exports = UserInfo;
