import express from 'express';
import { placeOrder, allOrders, userOrders, updateStatus } from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.ts';


const orderRouter = express.Router();

// Admin features
orderRouter.post('/list', adminOnly, allOrders);
orderRouter.post('/status', adminOnly, updateStatus);

// Payment features
orderRouter.post('/place', protect, placeOrder); // Placed from Checkout

// User features
orderRouter.post('/userorders', protect, userOrders);

export default orderRouter;