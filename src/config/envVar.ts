import dotenv from 'dotenv';
dotenv.config();
export const AppConfig = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '3001',
  baseUrl: process.env.API_URL || '',
  apiPrefix: process.env.API_PREFIX || 'api',
  corsUrl: process.env.CORS_ORIGIN || '*',
  logDirectory: process.env.LOG_DIR || './logs',
};

const host = process.env.MONGO_HOST || 'localhost';
const port = process.env.MONGO_PORT || '27017';
const dbName = process.env.DB_NAME || 'event-platform';

const uri =
  process.env.MONGO_URI || `mongodb://${host}:${port}/${dbName}`;
export const DatabaseConfig = {
  uri,
  dbName,
  host,
  port,
  testDbName: process.env.DB_NAME_TEST || `${dbName}-test`,
};

export const corsUrl = process.env.CORS_ORIGIN || '*';

export const JwtConfig = {
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN!,
  accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES_TIME || '30d',

  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN!,
  refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_TIME || '30d',

  resetPasswordTokenSecret: process.env.JWT_RESET_PASSWORD_TOKEN!,
  resetPasswordExpiresIn: process.env.RESET_PASSWORD_EXPIRES_TIME || '30d',

  generalSecret: process.env.JWT_SECRET || '',
  generalExpiresIn: process.env.JWT_EXPIRES_TIME || '30d',

  issuer: 'event-platform',
  audience: 'users',
  passwordSalt: process.env.PASSWORD_SALT || '10',
};

export const RateLimiterConfig = {
  blockTimeMinutes: Number(process.env.LIMITER_BLOCK_TIME_MINUTE || 15),
  maxRequests: Number(process.env.LIMITER_MAX_REQUESTS || 100),
};

