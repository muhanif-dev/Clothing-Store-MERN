import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/db.ts";
import userRoutes from "./routes/userRoutes.ts";
import productRoutes from "./routes/productRoutes.ts";
import adminRoutes from "./routes/adminRoutes.ts";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'E-Commerce Backend API is running successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});