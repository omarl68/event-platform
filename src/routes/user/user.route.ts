import express from 'express';
import UserValidator from './user.validator';
import Authorization from '../../core/middleware/auth';
import validator from '../../core/middleware/validator';
import UserController from '../../controllers/user.controller';
import { ValidationSource } from '../../constants/constants';

const router = express.Router();


router.get('/profile', Authorization.Authenticated, UserController.getProfile);

router.put('/profile-update', Authorization.Authenticated, validator(UserValidator.updateProfile), UserController.updateProfile);

router.put('/profile-password-update', Authorization.Authenticated, validator(UserValidator.updateProfilePassword), UserController.updateUserPassword);

router.route('/users')
  .get(Authorization.Authenticated, UserController.getAllUsers)
  .post(Authorization.Authenticated, validator(UserValidator.createUser), UserController.createUser);

router.route('/users/:id')
  .get(Authorization.Authenticated, validator(UserValidator.userId, ValidationSource.PARAM), UserController.getUserById)
  .put(Authorization.Authenticated, validator(UserValidator.userId, ValidationSource.PARAM), UserController.updateUser)
  .delete(Authorization.Authenticated, validator(UserValidator.userId, ValidationSource.PARAM), UserController.deleteUser);

export default router;
