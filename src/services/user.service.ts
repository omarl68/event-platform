import mongoose, { Types } from 'mongoose';
import userRepository from '../repositories/user.repository';
import { ErrorHandler } from '../utils/errorHandler';
import { HttpCode } from '../utils/httpCode';
import jwtHelper from '../utils/jwtHelper';

class UserService {
  static async getUserProfile(userId: string) {
    return await userRepository.getById(new mongoose.Types.ObjectId(userId));
  }

  static async updateProfile(userId: string, data: any) {
    return await userRepository.edit(new mongoose.Types.ObjectId(userId), data);
  }

  static async updateUserPassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    if (newPassword !== confirmPassword) {
      throw new ErrorHandler('Passwords do not match', HttpCode.BAD_REQUEST);
    }

    const user = await userRepository.getById(new mongoose.Types.ObjectId(userId), '+password');
    if (!user) {
      throw new ErrorHandler('User not found', HttpCode.NOT_FOUND);
    }

    const isPasswordValid = await jwtHelper.PasswordCompare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new ErrorHandler('Current password is incorrect', HttpCode.BAD_REQUEST);
    }

    user.password = newPassword;
    await user.save();

    return { message: 'Password updated successfully' };
  }

  static async getAllUsers(page: number, pageSize: number, query: object) {
    const options = {
      page: page,
      limit: pageSize,
    };
    return await userRepository.getAll({}, options, query);
  }

  static async getUserById(id: Types.ObjectId) {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new ErrorHandler('User not found', HttpCode.NOT_FOUND);
    }
    return user;
  }

  static async createUser(userData: any) {
    const existingUser = await userRepository.getOneByQuery({ email: userData.email });
    if (existingUser) {
      throw new ErrorHandler('User with this email already exists', HttpCode.CONFLICT);
    }
    const user = await userRepository.create(userData);
    return {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  static async updateUser(id: Types.ObjectId, data: any) {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new ErrorHandler('User not found', HttpCode.NOT_FOUND);
    }
    return await userRepository.edit(id, data);
  }

  static async deleteUser(id: Types.ObjectId) {
    const user = await userRepository.getById(id);

    if (!user) {
      throw new ErrorHandler('User not found', HttpCode.NOT_FOUND);
    }
    return await userRepository.remove(id);
  }
}

export default UserService;
