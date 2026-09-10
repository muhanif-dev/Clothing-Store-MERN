import express from 'express';
import { getProducts, getProductById, createProduct, deleteProduct } from '../controllers/productController.ts';
import { uploadProductImages } from '../middleware/uploadMiddleware.ts';
import { protect, adminOnly } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProductById);

router.post('/', protect, adminOnly, uploadProductImages, createProduct);

router.delete('/:id', protect, adminOnly, deleteProduct);

export default router;