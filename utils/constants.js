require('dotenv').config();

const countryList = [
  { countryCode: 'IND', dialCode: '+91', countryName: 'India' },
];

const environment = {
  DB_PASSWORD: process.env.NODE_DB_PASSWORD,
  DB_NAME: process.env.NODE_DB_NAME,
  APP_PORT: process.env.NODE_APP_PORT,
  JWT_SECRET: process.env.NODE_JWT_SECRET,
  SECS_IN_ONE_DAY: 24 * 60 * 60,
};

const errMessages = {
  EMAIL_ID_NOT_UNIQUE: {
    err: 'EMAIL_ID_NOT_UNIQUE',
    errMessage: 'This email address has already been registered.',
  },
  INVALID_FORMAT_EMAIL: {
    err: 'INVALID_FORMAT_EMAIL',
    errMessage: 'The email address provided is Invalid.',
  },
  USER_NOT_FOUND: {
    err: 'USER_NOT_FOUND',
    errMessage: `User has not registered or doesn't exists`,
  },
  INVALID_CREDENTIALS: {
    err: 'INVALID_CREDENTIALS',
    errMessage: 'Invalid credentials',
  },
  INTERNAL_SERVER_ERROR: {
    err: 'INTERNAL_SERVER_ERROR',
    errMessage: 'Exception has occurred',
  },
  INVALID_TOKEN: {
    err: 'INVALID_TOKEN',
    errMessage: `There's an issue with the token provided`,
  },
  ADDRESS_NOT_FOUND: {
    err: 'ADDRESS_NOT_FOUND',
    errMessage: `User Address is not added or doesn't exists`,
  },
};

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const PHONE_NO_REGEX = /^\d{10}$/;

module.exports = {
  countryList,
  EMAIL_REGEX,
  environment,
  errMessages,
  PHONE_NO_REGEX,
};
