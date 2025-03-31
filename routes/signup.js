const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserEmail = require('../models/userEmailModel');
const responseStructure = require('../utils/helpers');
const { environment, errMessages } = require('../utils/constants');
const {
  isEmailRegistered,
  isValidEmail,
} = require('../middlewares/userMiddleware');

// register a new user
router.post(
  '/user/register',
  (req, res, next) =>
    isValidEmail(req, res, next, errMessages.INVALID_FORMAT_EMAIL),
  (req, res, next) =>
    isEmailRegistered(req, res, next, errMessages.EMAIL_ID_NOT_UNIQUE),
  async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(404).send('Please provide proper credentials');

    const emailInLowerCase = email.toLowerCase();

    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const accessToken = jwt.sign(
        { email: emailInLowerCase },
        environment.JWT_SECRET,
        { expiresIn: 30 * environment.SECS_IN_ONE_DAY }
      );

      await UserEmail.create({
        email: emailInLowerCase,
        password: hashedPassword,
      });
      responseStructure({
        res,
        statusCode: 201,
        data: {
          msg: 'User registered!',
          userInfo: { email: emailInLowerCase, accessToken },
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
