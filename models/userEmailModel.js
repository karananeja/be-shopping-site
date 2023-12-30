const { model, Schema } = require('mongoose');

const userEmailSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: (email) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
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
