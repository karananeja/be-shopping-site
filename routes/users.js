const router = require('express').Router();
const jwt = require('jsonwebtoken');
let User = require('../models/userEmailModel');

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const email = req.body.email;

  const newUser = new User({ email });

  newUser
    .save()
    .then(() => res.json('User registered!'))
    .catch((err) => res.status(400).json('Error:  ' + err));
});

module.exports = router;
