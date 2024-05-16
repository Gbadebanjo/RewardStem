import express, { json } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import connectDB from './config.js';
import cookieParser from "cookie-parser";
import "./models/users.js";
import "./models/transactions.js";
import "./models/rewards.js";
import userRouter from './routes/user.js';
import transactionRouter from './routes/transaction.js';
import { errorHandler, notFound } from './utility/middlewares.js';

config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://oba-soles.vercel.app"],
  credentials: true,
}));


app.use(morgan('dev'));
app.use(helmet());
app.use(json());
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/transactions', transactionRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'Success',
  });
});

// app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);

app.use('/api/users', userRouter);
app.use('/api/transactions', transactionRouter);

const listen = async (port = 3000, callback = () => { }) => {
  await connectDB(); // Connect to the database
  app.listen(port, callback);
};

export { listen };
export default app;
