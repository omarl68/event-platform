import Joi from 'joi';
import JoiObjectId from '../../utils/joiObjectId';

export const userId = Joi.object({
  id: JoiObjectId().required()
});

const updateProfile = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().email().optional()
});

const updateProfilePassword = Joi.object({
  oldPassword: Joi.string().min(8).max(20).required(),
  password: Joi.string().min(8).max(20).required(),
  confirmPassword: Joi.ref('password'),
});

const createUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

export default {
  userId,
  updateProfile,
  updateProfilePassword,
  createUser
};
