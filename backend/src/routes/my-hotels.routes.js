import Router from 'express';
import {
  createMyHotel,
  getMyHotels,
  getHotelById,
  updateMyHotelById,
  deleteMyHotelById
} from '../controllers/my-hotels.controller.js';
import multer from 'multer';
import verifyToken from '../middlewares/auth.middleware.js';

// config multer
const storage = multer.memoryStorage();
// init multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

const myHotelRouter = Router();

// api/my-hotels
myHotelRouter.post(
  '/',
  verifyToken,
  upload.array('imageFiles', 6),
  createMyHotel
);

myHotelRouter.get('/', verifyToken, getMyHotels);

myHotelRouter.get('/:hotelId', verifyToken, getHotelById);

myHotelRouter.put(
  '/:hotelId',
  verifyToken,
  upload.array('imageFiles'),
  updateMyHotelById
);

myHotelRouter.delete('/:hotelId', verifyToken, deleteMyHotelById);

export default myHotelRouter;
