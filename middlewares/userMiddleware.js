const jwt = require('jsonwebtoken');
const UserEmail = require('../models/userEmailModel');
const { EMAIL_REGEX, environment } = require('../utils/constants');
const responseStructure = require('../utils/helpers');

async function isEmailRegistered(req, res, next, data) {
  const { email } = req.body;

  const emailInLowerCase = email.toLowerCase();

  const isEmailPresent = await UserEmail.findOne({ email: emailInLowerCase });

  if (!isEmailPresent) {
    next();
  } else {
    responseStructure({ res, statusCode: 409, data });
  }
}

function isValidEmail(req, res, next, data) {
  const { email } = req.body;

  const emailInLowerCase = email.toLowerCase();

  if (EMAIL_REGEX.test(emailInLowerCase)) {
    next();
  } else {
    responseStructure({ res, statusCode: 422, data });
  }
}

function verifyAccessToken(req, res, next, data) {
  const accessToken = req.headers.authorization?.split(' ')[1];

  try {
    const decodedData = jwt.verify(accessToken, environment.JWT_SECRET);
    req.email = decodedData.email;
    next();
  } catch (err) {
    responseStructure({ res, statusCode: 401, data });
  }
}

module.exports = { isEmailRegistered, isValidEmail, verifyAccessToken };
