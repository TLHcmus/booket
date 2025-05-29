import { useContext, useEffect, useState } from 'react';
import * as userService from '../services/userService';
import * as hotelService from '../services/hotelService';
import { useParams } from 'react-router-dom';
import BookingDetailsCard from '../components/booking/BookingDetailsCard';
import ConfirmBookingForm from '../components/booking/ConfirmBookingForm';
import SearchContext from '../contexts/SearchContext';
import AppContext from '../contexts/AppContext';
import { Elements } from '@stripe/react-stripe-js';

const BookingPage = () => {
  const { search } = useContext(SearchContext);
  const { stripePromise } = useContext(AppContext);

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [hotel, setHotel] = useState(null);
  const { hotelId } = useParams();

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError(null);

      try {
        const res = await userService.getCurrentUser();
        setUser(res);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchHotel() {
      setLoading(true);
      setError(null);

      try {
        const res = await hotelService.getHotelById(hotelId);
        setHotel(res);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchHotel();
  }, [hotelId]);

  const [paymentIntent, setPaymentIntent] = useState(null);
  useEffect(() => {
    async function createPaymentIntent() {
      setLoading(true);
      setError(null);

      try {
        const res = await hotelService.createPaymentIntent(hotelId, days);
        setPaymentIntent(res);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    createPaymentIntent();
  }, [hotelId]);

  const days = Math.ceil(
    (search?.checkOut - search?.checkIn) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 items-start">
      <BookingDetailsCard
        checkIn={search?.checkIn}
        checkOut={search?.checkOut}
        adultCount={search?.adultCount}
        childCount={search?.childCount}
        hotel={hotel}
        days={days}
      />
      {paymentIntent && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntent.clientSecret,
          }}
        >
          <ConfirmBookingForm user={user} paymentIntent={paymentIntent} />
        </Elements>
      )}
    </div>
  );
};

export default BookingPage;
