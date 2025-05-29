import { Router } from 'express';
import verifyToken from '../middlewares/auth.middleware.js';
import { getMyBookingById, getMyBookings } from '../controllers/my-bookings.controller.js';
const myBookingsRouter = Router();

// api/my-bookings

myBookingsRouter.get('/', verifyToken, getMyBookings);

myBookingsRouter.get('/:bookingId', verifyToken, getMyBookingById);

export default myBookingsRouter;
