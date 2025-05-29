import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import {
  MONGODB_CONNECTION_STRING,
  FRONTEND_URL,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from '../config/env.js';
import authRouter from './routes/auth.routes.js';
import myHotelRouter from './routes/my-hotels.routes.js';
import hotelsRouter from './routes/hotels.routes.js';
import userRouter from './routes/user.routes.js';
import myBookingsRouter from './routes/my-bookings.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
import { v2 as cloudinary } from 'cloudinary';

// Connect to Cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Connect to Mongoose
mongoose.connect(MONGODB_CONNECTION_STRING);

const app = express();
const port = 6969;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use('/api/auth/', authRouter);
app.use('/api/my-hotels', myHotelRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/users', userRouter);
app.use('/api/my-bookings', myBookingsRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
