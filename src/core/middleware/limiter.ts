import rateLimit from 'express-rate-limit';
import { MINUTE_ON_MILLISECOND } from '../../constants/constants';
import { RateLimiterConfig } from '../../config/envVar';

const limiter = rateLimit({
  windowMs: Number(RateLimiterConfig.blockTimeMinutes) * MINUTE_ON_MILLISECOND,
  max: Number(RateLimiterConfig.maxRequests),
  message: `You have exceeded the ${RateLimiterConfig.maxRequests} requests in ${RateLimiterConfig.blockTimeMinutes} minutes limit!`,
  standardHeaders: true,
  legacyHeaders: false,
});

export default limiter;
