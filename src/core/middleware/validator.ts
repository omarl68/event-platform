import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { ErrorHandler } from '../../utils/errorHandler';
import { HttpCode } from '../../utils/httpCode';
import logger from '../../core/logger';
import { ValidationSource } from '../../constants/constants';

const validator = (schema: Schema, source: ValidationSource = ValidationSource.BODY) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            const { error } = schema.validate(req[source]);
            if (!error) return next();
            const { details } = error;
            const message = details
                .map((i) => i.message.replace(/['"]+/g, ''))
                .join(',');
            logger.error(message);
            return next(new ErrorHandler(message, HttpCode.BAD_REQUEST));
        } catch (error) {
            next(error);
        }
    };
};

export default validator;