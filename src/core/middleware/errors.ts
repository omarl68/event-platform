import { NextFunction, Request, Response } from 'express';

import { EnvironmentEnum } from '../../constants/constants';
import { AppConfig } from '../../config/envVar';
import { ErrorHandler } from '../../utils/errorHandler';
import { HttpCode } from '../../utils/httpCode';


const errors = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err?.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    success: false,
    statusCode: err?.statusCode,
    message: err?.message,
    stack: AppConfig.environment === EnvironmentEnum.dev ? err?.stack : undefined,
  });
};

export default errors;
