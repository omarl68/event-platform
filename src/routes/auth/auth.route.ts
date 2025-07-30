import express from 'express';
import AuthController from '../../controllers/auth.controller';
import AuthValidator from './auth.validator';
import validator from '../../core/middleware/validator';
import limiter from '../../core/middleware/limiter';

const router = express.Router();

router.post('/login', validator(AuthValidator.loginSchema), AuthController.login);

router.post('/register', limiter, validator(AuthValidator.registerSchema), AuthController.register);

export default router;
