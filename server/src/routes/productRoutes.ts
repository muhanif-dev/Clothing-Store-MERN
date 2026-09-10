import  express, { type Request, type Response } from 'express';

const router = express.Router();

// Placeholder route for getting all products (will be implemented in Step 4)
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Get all products route placeholder' });
});

// Placeholder route for creating a product (will be implemented in Step 3)
router.post('/', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Create product route placeholder' });
});

export default router;