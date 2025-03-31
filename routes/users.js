const router = require('express').Router();
const UserInfo = require('../models/userInfoModel');
const responseStructure = require('../utils/helpers');
const { verifyAccessToken } = require('../middlewares/userMiddleware');
const { errMessages } = require('../utils/constants');

router.post(
  '/user/update-info',
  (req, res, next) =>
    verifyAccessToken(req, res, next, errMessages.INVALID_TOKEN),
  async (req, res, next) => {
    const { body, email } = req;

    try {
      const userDetails = await UserInfo.findOne({ email });

      const userInfo = {
        firstName: body.firstName ?? userDetails.firstName,
        lastName: body.lastName ?? userDetails.lastName,
        birthDate: +new Date(body.birthDate) ?? userDetails.birthDate,
        phoneNumber: body.phoneNumber ?? userDetails.phoneNumber,
        email: body.updatedEmail ?? userDetails.email,
      };

      let created = false;

      if (userDetails) {
        await UserInfo.updateOne({ email }, { $set: userInfo });
      } else {
        await UserInfo.create({ email, ...userInfo });
        created = true;
      }

      responseStructure({
        res,
        data: {
          msg: `User Info ${created ? 'Created' : 'Updated'}!`,
          userInfo,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/user/add-address',
  (req, res, next) =>
    verifyAccessToken(req, res, next, errMessages.INVALID_TOKEN),
  async (req, res, next) => {
    const { body, email } = req;

    try {
      // const

      responseStructure({
        res,
        data: {},
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/user/get-info',
  (req, res, next) =>
    verifyAccessToken(req, res, next, errMessages.INVALID_TOKEN),
  async (req, res, next) => {
    const { email } = req;

    try {
      const userDetails = await UserInfo.findOne({ email });

      const userInfo = {
        email,
        firstName: userDetails?.firstName ?? '',
        lastName: userDetails?.lastName ?? '',
        birthDate: userDetails?.birthDate ?? '',
        phoneNumber: userDetails?.phoneNumber ?? '',
      };

      responseStructure({
        res,
        data: { msg: 'Found User Info!', userInfo },
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
