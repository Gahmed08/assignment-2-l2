import express from 'express';
import { orderController } from './order.controller';

const router = express.Router();

router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getAllOrder);

export const OrderRoute = router;