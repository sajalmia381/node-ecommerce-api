import express from 'express';
import { productController } from '../controllers';

const router = express.Router();

router.get('/', productController.productList);
router.post('/', productController.productCreate);

router.get('/:id', productController.productDetails);

export default router