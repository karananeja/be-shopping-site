const { model, Schema } = require('mongoose');
const { PHONE_NO_REGEX } = require('../utils/constants');

const userAddressSchema = new Schema(
  {
    email: { type: String, required: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    phone: {
      type: Number,
      required: true,
      match: [PHONE_NO_REGEX, 'Please enter a valid 10 digit phone number'],
    },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: Number, required: true, min: 100000, max: 999999 },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserAddress = model('userAddress', userAddressSchema);

module.exports = UserAddress;
