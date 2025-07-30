import Joi from 'joi';


const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});


export default {
  loginSchema,
  registerSchema
};
