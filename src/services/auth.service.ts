import { ErrorHandler } from '../utils/errorHandler';
import { HttpCode } from '../utils/httpCode';
import userRepository from '../repositories/user.repository';
import jwtHelper from '../utils/jwtHelper';
import { TokenEnum } from '../constants/constants';

class AuthService {
  static async login(email: string, password: string) {
    const user = await userRepository.getOneByQuery({ email }, '+password');
    if (!user) {
      throw new ErrorHandler('User not registered', HttpCode.NOT_FOUND);
    }

    const isPasswordValid = await jwtHelper.PasswordCompare(password, user.password);
    if (!isPasswordValid) {
      throw new ErrorHandler('Invalid credentials', HttpCode.UNAUTHORIZED);
    }

    const token = await jwtHelper.GenerateToken({ id: user._id }, TokenEnum.access)

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    };
  }

  static async register(firstName: string, lastName: string, email: string, password: string) {
    const userExists = await userRepository.getOneByQuery({ email });
    if (userExists) {
      throw new ErrorHandler('Email already registered', HttpCode.BAD_REQUEST);
    }
    const user = await userRepository.create({
      firstName,
      lastName,
      email,
      password
    });
    if (!user) {
      throw new ErrorHandler('User registration failed', HttpCode.BAD_REQUEST);
    }
    return {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}

export default AuthService;
