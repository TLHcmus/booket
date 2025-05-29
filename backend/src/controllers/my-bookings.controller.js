import Booking from '../models/booking.model.js';

export const getMyBookings = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const size = 5;
    const skip = (page - 1) * size;

    const bookings = await Booking.find({ userId: req.userId })
      .populate({
        path: 'hotel',
        select: 'name city country imageUrls',
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(size);

    const totalItems = await Booking.countDocuments({ userId: req.userId });

    const totalPages = Math.ceil(totalItems / size);

    res.status(200).json({
      message: 'Successfully fetched all bookings',
      data: bookings,
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

export const getMyBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.bookingId,
      userId: req.userId,
    }).populate({
      path: 'hotel',
      select: 'name city country imageUrls userId',
    });

    if (!booking) {
      return res.status(400).json({
        message: 'Booking not found',
      });
    }

    res
      .status(200)
      .json({ message: 'Successfully fetched booking', data: booking });
  } catch (error) {
    next(error);
  }
};
