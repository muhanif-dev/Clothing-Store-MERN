import express from 'express';
import { getProducts, getProductById, createProduct } from '../controllers/productController.ts';
import { uploadProductImages } from '../middleware/uploadMiddleware.ts';

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProductById);

router.post('/', uploadProductImages, createProduct);

export default router;