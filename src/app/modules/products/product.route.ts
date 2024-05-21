import express from 'express';
import { ProductControler } from './product.controller';

const router = express.Router();

router.post('/products', ProductControler.createProduct);

router.get('/products', ProductControler.getAllProduct);

router.get('/products/:productId', ProductControler.getSingleProduct);

router.put('/products/:productId', ProductControler.updateSingleProduct);

router.delete('/products/:productId', ProductControler.deleteSingleProduct);

export const ProductRoute = router;
