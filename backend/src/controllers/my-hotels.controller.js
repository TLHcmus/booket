import { v2 as cloudinary } from 'cloudinary';
import Hotel from '../models/hotel.model.js';

export const createMyHotel = async (req, res, next) => {
  try {
    const imageFiles = req.files;
    const newHotel = req.body;

    // 1. upload the images to cloudinary
    const imageUrls = await uploadImages(imageFiles);

    newHotel.imageUrls = imageUrls;
    newHotel.userId = req.userId;

    // 3. save to new hotle to database
    const hotel = new Hotel(newHotel);
    await hotel.save();

    // 4. return a 201 status
    res
      .status(201)
      .json({ message: 'Hotel created successfully', data: hotel });
  } catch (error) {
    next(error);
  }
};

// Get my hotels
export const getMyHotels = async (req, res, next) => {
  try {
    const userId = req.userId;
    const page = parseInt(req.query.page ? req.query.page.toString() : '1');
    const size = 5; // 5 items per page

    const hotels = await Hotel.find({ userId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * size)
      .limit(size);

    const totalItems = await Hotel.countDocuments({ userId });
    const totalPages = Math.ceil(totalItems / size);

    res.status(200).json({
      message: 'Successfully fetched my hotels',
      data: hotels,
      pagination: {
        totalItems,
        totalPages,
        pageSize: size,
        currentPage: page,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get hotel by id
export const getHotelById = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;

    const userId = req.userId;

    // Find  hotel by id of the user
    const hotel = await Hotel.findOne({ _id: hotelId, userId });

    // Check if hotel exists
    if (!hotel) {
      const error = new Error('Hotel not found');
      error.statusCode = 400;
      next(error);
    }

    res.status(200).json({
      message: 'Successfully fetched hotel',
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
};

// Update hotel by id
export const updateMyHotelById = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    const userId = req.userId;

    // Update hotel
    const updatedHotelInfo = req.body;

    const hotel = await Hotel.findOneAndUpdate(
      { _id: hotelId, userId },
      updatedHotelInfo,
      {
        new: true,
      }
    );

    if (!hotel) {
      const error = new Error('Hotel not found');
      error.statusCode = 400;
      next(error);
    }

    const imageFiles = req.files;
    if (imageFiles && imageFiles.length > 0) {
      // Upload new images to cloudinary
      const newImageUrls = await uploadImages(imageFiles);
      // Merge new Urls with existing Urls
      hotel.imageUrls = [...(hotel.imageUrls || []), ...newImageUrls];
    }

    await hotel.save();

    res.status(200).json({
      message: 'Successfully updated hotel',
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
};

async function uploadImages(imageFiles) {
  const uploadPromises = imageFiles.map(async (imageFile) => {
    // convert image buffer to base64 string
    const b64 = Buffer.from(imageFile.buffer).toString('base64');

    let dataURI = 'data:' + imageFile.mimetype + ';base64,' + b64;

    const res = await cloudinary.uploader.upload(dataURI);
    return res.url;
  });

  // if upload succes, add the URLs to the new hotel
  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export const deleteMyHotelById = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId;
    const userId = req.userId;

    const hotel = await Hotel.findOneAndDelete({ _id: hotelId, userId });

    if (!hotel) {
      const error = new Error('Hotel not found');
      error.statusCode = 400;
      next(error);
    }

    res.status(200).json({
      message: 'Successfully deleted hotel',
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
};
