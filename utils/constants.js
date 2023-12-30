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

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
