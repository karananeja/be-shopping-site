const router = require('express').Router();
let UserInfo = require('../models/userInfoModel');
let UserEmail = require('../models/userEmailModel');
const responseStructure = require('../utils/helpers');

router.route('/user/update-info').post((req, res) => {
  const accessToken = req.headers.authorization?.split(' ')[1];

  UserEmail.findOne({ accessToken }).then((userFound) => {
    if (!userFound || userFound === null) {
      return responseStructure({
        res,
        statusCode: 400,
        data: {
          err: 'USER_NOT_FOUND',
          errMessage: `There's an issue with the token provided`,
        },
      });
    } else {
      const { body } = req;

      UserInfo.findOne({ email: userFound.email })
        .then((userDetails) => {
          if (!userDetails || userDetails === null) {
            const userInfo = new UserInfo({ ...body, email: userFound.email });

            userInfo
              .save()
              .then(() =>
                responseStructure({
                  res,
                  data: { msg: 'User Info Updated!', userInfo: body },
                })
              )
              .catch(() =>
                responseStructure({
                  res,
                  statusCode: 400,
                  data: {
                    err: 'INVALID_CREDENTIALS',
                    errMessage: 'Something is wrong with the user credentials',
                  },
                })
              );
          }

          UserInfo.updateOne({ email: userDetails.email }, { $set: body })
            .then(() =>
              responseStructure({
                res,
                data: { msg: 'User Info Updated!', userInfo: body },
              })
            )
            .catch(() =>
              responseStructure({
                res,
                statusCode: 400,
                data: {
                  err: 'INVALID_CREDENTIALS',
                  errMessage: 'Something is wrong with the user credentials',
                },
              })
            );
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
    }
  });
});

router.route('/user/get-info').get((req, res) => {
  const accessToken = req.headers.authorization?.split(' ')[1];

  UserEmail.findOne({ accessToken }).then((userFound) => {
    if (!userFound || userFound === null) {
      return responseStructure({
        res,
        statusCode: 400,
        data: {
          err: 'USER_NOT_FOUND',
          errMessage: `There's an issue with the token provided`,
        },
      });
    } else {
      UserInfo.findOne({ email: userFound.email })
        .then((userDetails) => {
          if (!userDetails && userDetails === null) {
            return responseStructure({
              res,
              statusCode: 400,
              data: {
                err: 'USER_NOT_FOUND',
                errMessage: `User doesn't exist`,
              },
            });
          }

          const { firstName, lastName, birthDate, phoneNumber } = userDetails;

          return responseStructure({
            res,
            data: {
              msg: 'User Details found!',
              userInfo: { firstName, lastName, birthDate, phoneNumber },
            },
          });
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
    }
  });
});

module.exports = router;
