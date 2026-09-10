import type { Request, Response } from 'express';
import Product from '../models/productModel.ts';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};