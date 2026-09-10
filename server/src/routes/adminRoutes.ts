import express from 'express';
import { adminLogin } from '../controllers/userController.ts';

const router = express.Router();

// POST /api/admin/login - Separate admin login route
router.post('/login', adminLogin);

export default router;