import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./config/db.ts";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'E-Commerce Backend API is running successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});