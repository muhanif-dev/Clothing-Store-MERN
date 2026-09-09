import Router from 'express';
import { registerUser } from '../controllers/userController.ts';

const router = Router();

router.post('/signup', registerUser);

export default router;