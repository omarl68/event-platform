import { Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { Types } from 'mongoose';
import { TokenEnum } from '../../constants/constants';
import userRepository from '../../repositories/user.repository';
import { ErrorHandler } from '../../utils/errorHandler';
import { HttpCode } from '../../utils/httpCode';
import jwtHelper from '../../utils/jwtHelper';


const Authenticated = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req?.headers?.authorization;
  const token = authToken && authToken.split(' ')[1];
  if (!token) {
    return next(new ErrorHandler('Login first to access this resource.', HttpCode.UNAUTHORIZED));
  }

  const decoded = await jwtHelper.ExtractToken(token, TokenEnum.access);
  if (!decoded) {
    return next(new ErrorHandler('Invalid Token!', HttpCode.UNAUTHORIZED));
  }

  req.user = await userRepository.getById(new Types.ObjectId(decoded?.id));
  next();
});

export default { Authenticated };
