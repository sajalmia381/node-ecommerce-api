import express from 'express';
import { registerController, loginController, refreshController, authController } from '../controllers';
import authorizationHandler from '../middlewares/authorizationHandler';

const router = express.Router();

router.post('/register', registerController.register);

router.post('/login', loginController.login);

router.post('/logout', authorizationHandler, authController.logout)

router.post('/refresh', refreshController);


export default router