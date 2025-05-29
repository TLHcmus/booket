import mongoose from 'mongoose';

const hotelSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'Hotel User ID is required'],
    },
    name: {
      type: String,
      required: [true, 'Hotel Name is required'],
    },
    city: {
      type: String,
      required: [true, 'Hotel City is required'],
    },
    country: {
      type: String,
      required: [true, 'Hotel Country is required'],
    },
    description: {
      type: String,
      required: [true, 'Hotel Description is required'],
      validate: {
        validator: function (v) {
          return v.length >= 80;
        },
        message: 'Description must be at least 80 words',
      },
    },
    type: {
      type: String,
      required: [true, 'Hotel Type is required'],
    },
    adultCount: {
      type: Number,
      required: [true, 'Hotel Adult Count is required'],
    },
    childCount: {
      type: Number,
      required: [true, 'Hotel Child Count is required'],
    },
    facilities: {
      type: [String],
      required: [true, 'Hotel Facilities is required'],
    },
    pricePerNight: {
      type: Number,
      required: [true, 'Hotel Price Per Night is required'],
    },
    starRating: {
      type: Number,
      required: [true, 'Hotel Star Rating is required'],
      min: [1, 'Star Rating must be at least 1'],
      max: [5, "Star Rating can't be higher than 5"],
    },
    imageUrls: {
      type: [String],
      required: [true, 'Hotel Image Urls is required'],
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],
  },
  { timestamps: true }
);

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;
