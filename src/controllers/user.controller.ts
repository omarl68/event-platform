
import AsyncHandler from 'express-async-handler';
import { Request, Response, RequestHandler } from 'express';
import { Types } from "mongoose";
import { DEFAULT_CURRENT_PAGE, DEFAULT_PAGE_SIZE } from "../constants/constants";
import { HttpCode } from "../utils/httpCode";
import UserService from '../services/user.service';

// @access  Private
const getProfile: RequestHandler = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await UserService.getUserProfile(req?.user?.id);
    res.status(HttpCode.OK).json({ success: true, message: '', data: result });
  },
);

// @desc    Update user profile
// @route   PUT /api/profile-update
// @access  Private
const updateProfile: RequestHandler = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await UserService.updateProfile(req?.user?.id, req.body);
    res.status(HttpCode.OK).json({ success: true, message: '', data: result });
  },
);

// @desc    Update user profile
// @route   PUT /api/profile-password-update
// @access  Private
const updateUserPassword: RequestHandler = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { oldPassword, password, confirmPassword } = req?.body;
    const result = await UserService.updateUserPassword(
      req?.user?.id,
      oldPassword,
      password,
      confirmPassword,
    );
    res.status(HttpCode.OK).json({ success: true, message: '', data: result });
  },
);


// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getAllUsers: RequestHandler = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { page, pageSize } = req?.query;
    const result = await UserService.getAllUsers(
      Number(page || DEFAULT_CURRENT_PAGE),
      Number(pageSize || DEFAULT_PAGE_SIZE),
      req?.query
    );
    res.status(HttpCode.OK).json({ success: true, message: '', data: result });
  },
);

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
const getUserById: RequestHandler = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req?.params;
    const result = await UserService.getUserById(new Types.ObjectId(id));
    res.status(HttpCode.OK).json({ success: true, message: '', data: result });
  },
);


// @desc    Create user
// @route   POST /api/users
// @access  Private
const createUser: RequestHandler = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await UserService.createUser(req?.body);
    res
      .status(HttpCode.CREATED)
      .json({ success: true, message: 'User created successfully', data: result });
  },
);

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser: RequestHandler = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req?.params;
    const result = await UserService.updateUser(new Types.ObjectId(id), req?.body);
    res
      .status(HttpCode.OK)
      .json({ success: true, message: 'User updated successfully', data: result });
  },
);

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser: RequestHandler = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req?.params;
    const result = await UserService.deleteUser(new Types.ObjectId(id));
    res
      .status(HttpCode.OK)
      .json({ success: true, message: 'User deleted successfully', data: result });
  },
);


export default {
  getProfile,
  updateProfile,
  updateUserPassword,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
