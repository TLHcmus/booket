import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    adultCount: {
      type: Number,
      required: [true, 'Adult Count is required'],
    },
    childCount: {
      type: Number,
      required: [true, 'Child Count is required'],
    },
    checkIn: {
      type: Date,
      required: [true, 'Check In Date is required'],
    },
    checkOut: {
      type: Date,
      required: [true, 'Check Out Date is required'],
    },
    userId: {
      type: String,
      required: [true, 'User ID is required'],
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: [true, 'Hotel ID is required'],
    },
    totalCost: {
      type: Number,
      required: [true, 'Total Cost is required'],
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
