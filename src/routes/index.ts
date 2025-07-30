import { Router } from 'express';
import authRoutes from './auth/auth.route';
import userRoutes from './user/user.route';
import eventRoutes from './event/event.route';

const router = Router();

router.use('/', userRoutes);
router.use('/', authRoutes);
router.use('/',eventRoutes)

export default router;
