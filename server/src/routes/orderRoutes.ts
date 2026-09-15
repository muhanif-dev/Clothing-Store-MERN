import express from 'express';
import { placeOrder, getMyOrders } from '../controllers/orderController.ts';
import { protect } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.post('/', protect, placeOrder);
router.get('/', protect, getMyOrders);

export default router;