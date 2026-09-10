import express from 'express';
import { registerUser, loginUser, getUserProfile  } from '../controllers/userController.ts';
import {protect } from '../middleware/authMiddleware.ts';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

export default router;