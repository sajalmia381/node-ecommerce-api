import express from 'express';
import { productController } from '../controllers';
import { superAdmin } from '../middlewares';
import authorizationHandler from '../middlewares/authorizationHandler';

const router = express.Router();

router.get('/', productController.productList);

router.post('/', [authorizationHandler, superAdmin], productController.productCreate);

router.get('/:id', productController.productDetails);

export default router