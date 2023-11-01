const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let UserEmail = require('../models/userEmailModel');
const responseStructure = require('../utils/helpers');

// user signin
router.route('/user/get-token').post((req, res) => {
  const { body: user } = req;

  UserEmail.findOne({ email: user.email })
    .then(async (userFound) => {
      if (userFound) {
        const isValid = await bcrypt.compare(user.password, userFound.password);

        if (isValid) {
          const accessToken = jwt.sign(
            { email: userFound.email },
            process.env.NODE_ACCESS_TOKEN_SECRET,
            { expiresIn: 24 * 60 * 60 * 30 }
          );

          userFound.accessToken = accessToken;

          userFound
            .save()
            .then(() =>
              responseStructure({
                res,
                data: {
                  msg: 'User credentials matched',
                  userInfo: {
                    email: user.email,
                    accessToken: userFound.accessToken,
                  },
                },
              })
            )
            .catch(() =>
              responseStructure({
                res,
                statusCode: 400,
                data: {
                  err: 'USER_NOT_FOUND',
                  errMessage: 'User has not registered',
                },
              })
            );
        } else {
          return responseStructure({
            res,
            statusCode: 401,
            data: {
              err: 'INVALID_CREDENTIALS',
              errMessage: 'Invalid credentials',
            },
          });
        }
      } else {
        return responseStructure({
          res,
          statusCode: 400,
          data: {
            err: 'USER_NOT_FOUND',
            errMessage: `User has not registered or doesn't exists`,
          },
        });
      }
    })
    .catch(() =>
      responseStructure({
        res,
        statusCode: 400,
        data: {
          err: 'INVALID_REQUEST',
          errMessage: 'Please contact support for assistance',
        },
      })
    );
});

module.exports = router;
