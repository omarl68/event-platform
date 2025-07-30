import express, { Express } from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import hpp from 'hpp';import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './docs/config';
import routes from './routes';
import notFound from './core/middleware/notFound';
import errors from './core/middleware/errors';
import limiter from './core/middleware/limiter';
import { AppConfig } from './config/envVar';
import dotenv from 'dotenv';

const app: Express = express(); 
dotenv.config();

const corsOptions = {
  origin: AppConfig.corsUrl,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(hpp());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(limiter)

app.use('/api', routes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use(notFound);
app.use(errors);

export default app;
