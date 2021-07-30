import express from 'express';

import productRouter from './product';
import authRouter from './auth';
import userRouter from './user';
const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);

export default router