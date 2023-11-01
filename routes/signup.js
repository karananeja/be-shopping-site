const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let UserEmail = require('../models/userEmailModel');
const responseStructure = require('../utils/helpers');

// add a new user entry
router.route('/user/register').post(async (req, res) => {
  const { body: user } = req;
  let { email, password } = user;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  password = hashedPassword;

  const accessToken = jwt.sign(
    { email },
    process.env.NODE_ACCESS_TOKEN_SECRET,
    { expiresIn: 24 * 60 * 60 * 30 }
  );

  user.accessToken = accessToken;

  const newUserEmail = new UserEmail({ email, password, accessToken });

  newUserEmail
    .save()
    .then(() =>
      responseStructure({
        res,
        data: { msg: 'User registered!', userInfo: { email, accessToken } },
      })
    )
    .catch(() =>
      responseStructure({
        res,
        statusCode: 400,
        data: {
          err: 'EMAIL_ID_NOT_UNIQUE',
          errMessage: 'User has already registered',
        },
      })
    );
});

module.exports = router;
