import { Request, Response, RequestHandler } from 'express';
import AsyncHandler from 'express-async-handler';
import { HttpCode } from '../utils/httpCode';
import AuthService from '../services/auth.service';

// @desc    Auth user & get token
// @route   POST /api/login
// @access  Public
const login: RequestHandler = AsyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req?.body;
  let result = await AuthService.login(email.trim().toLowerCase(), password);
  res.status(HttpCode.OK).json({ success: true, message: 'Login Success', data: result });
});

// @desc    Register a new user
// @route   POST /api/register
// @access  Public
const register: RequestHandler = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, email, password } = req?.body;
    const result = await AuthService.register(firstName, lastName, email.trim().toLowerCase(), password);
    res.status(HttpCode.CREATED).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  },
);

export default {
  login,
  register
};
