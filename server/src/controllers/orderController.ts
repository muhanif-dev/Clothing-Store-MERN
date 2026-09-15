import type { Request, Response } from 'express';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';

// Extend Express Request to include authenticated user payload
interface AuthRequest extends Request {
  user?: {
    _id: string;
    [key: string]: any;
  };
}

// Placing orders using Cash on Delivery / Mobile Wallets
export const placeOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { items, amount, address, paymentMethod } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized user' });
      return;
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod,
      payment: false, // Will toggle to true once paid/verified
      date: Date.now(),
      status: 'Order Placed',
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    // Clear user's cart data in DB
    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({ success: true, message: 'Order Placed Successfully' });
  } catch (error: any) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// All orders data for Admin Panel
export const allOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({});
    res.status(200).json({ success: true, orders });
  } catch (error: any) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// User Orders data for Frontend /orders page
export const userOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      res.status(401).json({ success: false, message: 'Unauthorized user' });
      return;
    }

    const orders = await Order.find({ userId });
    res.status(200).json({ success: true, orders });
  } catch (error: any) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status from Admin Panel
export const updateStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, message: 'Status Updated' });
  } catch (error: any) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};