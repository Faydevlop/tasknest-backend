import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.ts';
import taskRoutes from './routes/taskRoutes.ts';
import dotenv from "dotenv";
dotenv.config();
const frontendUrl = process.env.FRONTEND_URL;
const app = express();
app.use(cors({
    origin: frontendUrl,
    credentials: true,
}));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/task', taskRoutes);
export default app;
