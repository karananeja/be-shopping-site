const router = require('express').Router();
let UserEmail = require('../models/userEmailModel');
const responseStructure = require('../utils/helpers');
const countryList = require('../utils/constants');

router.route('/country-list').get((req, res) => {
  const accessToken = req.headers.authorization?.split(' ')[1];

  UserEmail.findOne({ accessToken: accessToken }).then((userFound) => {
    if (!userFound || userFound === null) {
      responseStructure({
        res,
        statusCode: 400,
        data: {
          err: 'USER_NOT_FOUND',
          errMessage: `There's an issue with the token provided`,
        },
      });
    } else {
      responseStructure({
        res,
        data: {
          countryList,
          msg: 'Country List fetched successfully',
        },
      });
    }
  });
});

module.exports = router;
