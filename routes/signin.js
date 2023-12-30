const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserEmail = require('../models/userEmailModel');
const responseStructure = require('../utils/helpers');
const { environment, errMessages } = require('../utils/constants');
const { isValidEmail } = require('../middlewares/userMiddleware');

// user sign in
router.post(
  '/user/get-token',
  (req, res, next) =>
    isValidEmail(req, res, next, errMessages.INVALID_FORMAT_EMAIL),
  async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(404).send('Please provide proper credentials');

    try {
      const userFound = await UserEmail.findOne({ email });
      if (userFound) {
        const isPasswordCorrect = await bcrypt.compare(
          password,
          userFound.password
        );

        if (isPasswordCorrect) {
          const accessToken = jwt.sign({ email }, environment.JWT_SECRET, {
            expiresIn: 30 * environment.SECS_IN_ONE_DAY,
          });

          responseStructure({
            res,
            data: {
              msg: 'User credentials matched',
              userInfo: { email, accessToken },
            },
          });
        } else {
          responseStructure({
            res,
            statusCode: 401,
            data: errMessages.INVALID_CREDENTIALS,
          });
        }
      } else {
        responseStructure({
          res,
          statusCode: 404,
          data: errMessages.USER_NOT_FOUND,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
