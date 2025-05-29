import Router from 'express';
import {
  getHotels,
  searchHotels,
  getHotelById,
  createPaymentIntent,
  createBooking,
} from '../controllers/hotels.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';
const hotelsRouter = Router();

hotelsRouter.get('/', getHotels);

hotelsRouter.get('/search', searchHotels);

hotelsRouter.get('/:hotelId', getHotelById);

hotelsRouter.post(
  '/:hotelId/bookings/payment-intent',
  verifyToken,
  createPaymentIntent
);

hotelsRouter.post('/:hotelId/bookings', verifyToken, createBooking);

export default hotelsRouter;
