import type { Response } from 'express';
import mongoose from 'mongoose';
import type { AuthRequest } from '../middleware/authMiddleware.ts';
import Order from '../models/orderModel.ts';

const paymentMethodMap: Record<string, 'EasyPaisa' | 'JazzCash' | 'Cash on Delivery'> = {
  easypaisa: 'EasyPaisa',
  jazzcash: 'JazzCash',
  cod: 'Cash on Delivery',
};

export const placeOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { items, amount, address, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      res.status(400).json({ message: 'No items in the order' });
      return;
    }

    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    const normalizedPaymentMethod = paymentMethodMap[String(paymentMethod).toLowerCase()];
    if (!normalizedPaymentMethod) {
      res.status(400).json({ message: 'Invalid payment method' });
      return;
    }

    const formattedAddress = {
      name: `${address.firstName} ${address.lastName}`,
      address: `${address.street}, ${address.city}, ${address.state}, ${address.zipcode}, ${address.country}`,
      phone: address.phone,
      city: address.city,
      email: address.email,
    };

    const newOrder = new Order({
      userId: new mongoose.Types.ObjectId(userId),
      items,
      amount,
      address: formattedAddress,
      paymentMethod: normalizedPaymentMethod,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: 'Order placed successfully',
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    const orders = await Order.find({ userId: new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};