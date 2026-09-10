import express from 'express';
import { getProducts, getProductById, createProduct, deleteProduct } from '../controllers/productController.ts';
import { uploadProductImages } from '../middleware/uploadMiddleware.ts';

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProductById);

router.post('/', uploadProductImages, createProduct);

router.delete('/:id', deleteProduct);

export default router;