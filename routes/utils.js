const router = require('express').Router();
const responseStructure = require('../utils/helpers');
const { countryList } = require('../utils/constants');

router.get('/country-list', (_, res) => {
  responseStructure({
    res,
    data: { countryList, msg: 'Country List fetched successfully' },
  });
});

module.exports = router;
