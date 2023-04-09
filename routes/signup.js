const router = require('express').Router();
const jwt = require('jsonwebtoken');
let UserEmail = require('../models/userEmailModel');

// get all the users registered
router.route('/').get((_, res) => {
  UserEmail.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json({ err }));
});

// add a new user entry
router.route('/v1/register').post((req, res) => {
  const user = { email: req.body.email };

  const accessToken = jwt.sign(user, process.env.NODE_ACCESS_TOKEN_SECRET);

  // const newUserEmail = new UserEmail({ ...user, accessToken });

  // newUserEmail    .save()    .then(() =>
  res.json({ msg: 'User registered!', userInfo: { ...user, accessToken } });
  // )    .catch((err) => res.status(400).json({ err }));
});

// set user password
router.route('/v1/password/set').post((req, res) => {
  const accessToken = req.headers.authorization.split(' ')[1];

  console.log({ accessToken, body: req.body });

  // const newUserEmail = new UserEmail({ ...user, accessToken });

  // newUserEmail    .save()    .then(() =>
  res.json({
    msg: 'User Password registered!',
    userInfo: { accessToken, body: req.body },
  });
  // )    .catch((err) => res.status(400).json({ err }));
});

module.exports = router;
