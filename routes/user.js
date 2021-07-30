import express from 'express';
import { userController } from '../controllers';
import { authorizationHandler } from '../middlewares';

const router = express.Router();

// User list
router.get('/', authorizationHandler, userController.userList);

// Single User
router.get('/:id', userController.singleUser);

// User Update
router.put('/:id', userController.updateUser);

export default router;