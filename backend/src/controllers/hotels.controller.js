import Hotel from '../models/hotel.model.js';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '../../config/env.js';
import Booking from '../models/booking.model.js';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const getHotels = async (req, res, next) => {
  try {
    // Get all hotels with pagination
    const size = parseInt(req.query.size) || 5;
    const page = parseInt(req.query.page ? req.query.page.toString() : 1);

    const hotels = await Hotel.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * size)
      .limit(size);

    const totalItems = await Hotel.countDocuments();
    const totalPages = Math.ceil(totalItems / size);

    res.status(200).json({
      message: 'Successfully fetched hotels',
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

export const searchHotels = async (req, res, next) => {
  try {
    const size = parseInt(req.query.size) || 5;
    const page = parseInt(req.query.page ? req.query.page.toString() : 1);

    const query = buildContructedQuery(req.query);

    // Sort options
    let sortOptions = {};

    switch (req.query.sortOption) {
      case 'starRating':
        sortOptions.starRating = -1;
        break;
      case 'priceAsc':
        sortOptions.pricePerNight = 1;
        break;
      case 'priceDesc':
        sortOptions.pricePerNight = -1;
        break;
    }

    // Always add createdAt as secondary sort
    if (!sortOptions.createdAt) {
      sortOptions.createdAt = -1;
    }

    // Search by hotel name with pagination
    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .skip((page - 1) * size)
      .limit(size);

    const totalItems = await Hotel.countDocuments(query);

    const totalPages = Math.ceil(totalItems / size);

    res.status(200).json({
      message: 'Successfully fetched hotels',
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

// Build constructed query
const buildContructedQuery = (queryParams) => {
  let constructedQuery = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { name: { $regex: queryParams.destination, $options: 'i' } },
      { city: { $regex: queryParams.destination, $options: 'i' } },
      { country: { $regex: queryParams.destination, $options: 'i' } },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = { $gte: parseInt(queryParams.adultCount) };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = { $gte: parseInt(queryParams.childCount) };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.types) {
    constructedQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }

  if (queryParams.stars) {
    const starRatings = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star) => parseInt(star))
      : [parseInt(queryParams.stars)];

    constructedQuery.starRating = {
      $in: starRatings,
    };
  }

  if (queryParams.maxPrice) {
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice),
    };
  }

  return constructedQuery;
};

export const getHotelById = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
    if (!hotel) {
      return res.status(400).json({
        message: 'Hotel not found',
      });
    }
    res.status(200).json({
      message: 'Successfully fetched hotel',
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
};

export const createPaymentIntent = async (req, res, next) => {
  try {
    const { numberOfNights } = req.body;
    const hotelId = req.params.hotelId;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(400).json({
        message: 'Hotel not found',
      });
    }

    const totalCost = hotel.pricePerNight * numberOfNights;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCost * 100,
      currency: 'usd',
      metadata: {
        hotelId,
        userId: req.userId,
      },
    });

    if (!paymentIntent.client_secret) {
      const error = new Error('Failed to create payment intent');
      error.statusCode = 500;
      throw error;
    }

    const response = {
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      totalCost,
    };

    res.status(201).json({
      message: 'Payment intent created successfully',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    const { paymentIntentId } = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (!paymentIntent) {
      return res.status(400).json({
        message: 'Payment intent not found',
      });
    }

    if (
      paymentIntent.metadata.hotelId !== req.params.hotelId ||
      paymentIntent.metadata.userId !== req.userId
    ) {
      return res.status(400).json({
        message: 'Payment intent does not match',
      });
    }

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        message: `Payment intent failed. Status: ${paymentIntent.status}`,
      });
    }

    // Create new booking
    const booking = new Booking({
      ...req.body,
      userId: req.userId,
      hotel: req.params.hotelId,
    });

    // Save the booking
    await booking.save();

    // Update hotel with the new booking reference
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.hotelId,
      {
        $push: { bookings: booking._id },
      },
      { new: true }
    );

    if (!hotel) {
      return res.status(400).json({
        message: 'Hotel not found',
      });
    }

    res.status(201).json({
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};
