const router = require('express').Router();
const bcrypt = require('bcrypt');
const UserInfo = require('../models/userInfoModel');
const UserEmail = require('../models/userEmailModel');
const UserAddress = require('../models/addressModel');
const responseStructure = require('../utils/helpers');
const {
  verifyAccessToken,
  userExists,
} = require('../middlewares/userMiddleware');
const { errMessages } = require('../utils/constants');

router.post(
  '/user/update-info',
  (req, res, next) =>
    verifyAccessToken(req, res, next, errMessages.INVALID_TOKEN),
  (req, res, next) => userExists(req, res, next, errMessages.USER_NOT_FOUND),
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

router.get(
  '/user/get-info',
  (req, res, next) =>
    verifyAccessToken(req, res, next, errMessages.INVALID_TOKEN),
  (req, res, next) => userExists(req, res, next, errMessages.USER_NOT_FOUND),
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

router.put(
  '/user/reset-password',
  (req, res, next) =>
    verifyAccessToken(req, res, next, errMessages.INVALID_TOKEN),
  (req, res, next) => userExists(req, res, next, errMessages.USER_NOT_FOUND),
  async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    const { email } = req;

    if (!currentPassword || !newPassword)
      return res.status(404).send('Please provide current and new password');

    try {
      const userEmail = await UserEmail.findOne({ email });

      if (!userEmail)
        return responseStructure({
          res,
          statusCode: 404,
          data: errMessages.USER_NOT_FOUND,
        });

      const isPasswordCorrect = await bcrypt.compare(
        currentPassword,
        userEmail.password
      );

      if (!isPasswordCorrect)
        return responseStructure({
          res,
          statusCode: 401,
          data: errMessages.INVALID_CREDENTIALS,
        });

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      await UserEmail.updateOne(
        { email },
        { $set: { password: hashedPassword } }
      );

      responseStructure({
        res,
        data: { msg: 'Password reset successfully' },
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
  (req, res, next) => userExists(req, res, next, errMessages.USER_NOT_FOUND),
  async (req, res, next) => {
    const { body, email } = req;

    try {
      const userAddressBody = {
        addressLine1: body.addressLine1 ?? '',
        addressLine2: body.addressLine2 ?? '',
        type: body.type ?? '',
        name: body.name ?? '',
        phone: body.phone ?? 0,
        city: body.city ?? '',
        state: body.state ?? '',
        pincode: body.pincode ?? 0,
        isDefault: body.isDefault ?? false,
      };

      const userAddress = await UserAddress.create({
        email,
        ...userAddressBody,
      });

      responseStructure({
        res,
        data: { msg: 'User Address added successfully', userAddress },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/user/list-address',
  (req, res, next) =>
    verifyAccessToken(req, res, next, errMessages.INVALID_TOKEN),
  (req, res, next) => userExists(req, res, next, errMessages.USER_NOT_FOUND),
  async (req, res, next) => {
    const { email } = req;

    try {
      const userAddresses = await UserAddress.find({ email });

      responseStructure({
        res,
        data: { msg: 'User Addresses fetched successfully', userAddresses },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/user/delete-address',
  (req, res, next) =>
    verifyAccessToken(req, res, next, errMessages.INVALID_TOKEN),
  (req, res, next) => userExists(req, res, next, errMessages.USER_NOT_FOUND),
  async (req, res, next) => {
    const { id: _id } = req.body;

    try {
      const userAddress = await UserAddress.deleteOne({ _id });

      if (userAddress.deletedCount === 0)
        return responseStructure({
          res,
          statusCode: 404,
          data: errMessages.ADDRESS_NOT_FOUND,
        });

      responseStructure({
        res,
        data: { msg: 'User Address deleted successfully', userAddress },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/user/update-address',
  (req, res, next) =>
    verifyAccessToken(req, res, next, errMessages.INVALID_TOKEN),
  (req, res, next) => userExists(req, res, next, errMessages.USER_NOT_FOUND),
  async (req, res, next) => {
    const { id: _id, ...body } = req.body;
    const { email } = req;

    try {
      const existingAddress = await UserAddress.findOne({ _id, email });

      if (!existingAddress)
        return responseStructure({
          res,
          statusCode: 404,
          data: errMessages.ADDRESS_NOT_FOUND,
        });

      const updatedAddressData = {
        addressLine1: body.addressLine1 ?? existingAddress.addressLine1,
        addressLine2: body.addressLine2 ?? existingAddress.addressLine2,
        type: body.type ?? existingAddress.type,
        name: body.name ?? existingAddress.name,
        phone: body.phone ?? existingAddress.phone,
        city: body.city ?? existingAddress.city,
        state: body.state ?? existingAddress.state,
        pincode: body.pincode ?? existingAddress.pincode,
        isDefault: body.isDefault ?? existingAddress.isDefault,
      };

      const updatedAddress = await UserAddress.findOneAndUpdate(
        { _id, email },
        { $set: updatedAddressData },
        { new: true }
      );

      responseStructure({
        res,
        data: {
          msg: 'User Address updated successfully',
          userAddress: updatedAddress,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
