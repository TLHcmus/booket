import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as hotelService from '../services/hotelService';
import * as userService from '../services/userService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const MyBookingDetailsPage = () => {
  const { bookingId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [booking, setBooking] = useState(null);
  const [hotelOwner, setHotelOwner] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await hotelService.getMyBookingById(bookingId);
        setBooking(res);

        const hotelOwner = await userService.getUserById(res?.hotel?.userId);
        setHotelOwner(hotelOwner);

        setLoading(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <FontAwesomeIcon
          icon={faSpinner}
          className="text-4xl text-blue-600 animate-spin"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Booking Details</h2>
        <p className="text-gray-600">All the details for your reservation</p>
      </div>

      <div className="grid gap-6">
        {/* Hotel Information */}
        <div className="border border-slate-300 rounded-md p-6">
          <h2 className="text-2xl font-bold mb-4">{booking?.hotel?.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Location</p>
              <p className="font-semibold">
                {booking?.hotel?.city}, {booking?.hotel?.country}
              </p>
            </div>
          </div>
        </div>

        {/* Stay Details */}
        <div className="border border-slate-300 rounded-md p-6">
          <h3 className="text-xl font-bold mb-4">Stay Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Check-in</p>
              <p className="font-semibold">
                {new Date(booking?.checkIn).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Check-out</p>
              <p className="font-semibold">
                {new Date(booking?.checkOut).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Guests</p>
              <p className="font-semibold">
                {booking?.adultCount} Adults, {booking?.childCount} Children
              </p>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="border border-slate-300 rounded-md p-6">
          <h3 className="text-xl font-bold mb-4">Payment Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Total Cost</p>
              <p className="text-xl font-bold text-blue-600">
                ${booking?.totalCost?.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Payment Method</p>
              <p className="font-semibold">Credit Card</p>
            </div>
          </div>
        </div>

        {/* Hotel Contact Information */}
        <div className="border border-slate-300 rounded-md p-6">
          <h3 className="text-xl font-bold mb-4">Hotel Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Contact Person</p>
              <p className="font-semibold">
                {hotelOwner?.firstName} {hotelOwner?.lastName}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-semibold">{hotelOwner?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookingDetailsPage;
