import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SearchContext from '../../contexts/SearchContext';
import { useNavigate, useParams } from 'react-router-dom';
import { createBooking } from '../../services/hotelService';
import ToastContext from '../../contexts/ToastContext';

const ConfirmBookingForm = ({ user, paymentIntent }) => {
  const { search } = useContext(SearchContext);
  const { hotelId } = useParams();
  const { setToast } = useContext(ToastContext);

  const { register, handleSubmit, reset } = useForm();

  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        checkIn: search.checkIn,
        checkOut: search.checkOut,
        adultCount: search.adultCount,
        childCount: search.childCount,
        hotelId: hotelId,
        totalCost: paymentIntent.totalCost,
        paymentIntentId: paymentIntent.id,
      });
    }
  }, [user, reset]);

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      if (!stripe || !elements) {
        setLoading(false);
        return;
      }
      const result = await stripe.confirmCardPayment(
        paymentIntent.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (result.error) {
        throw new Error(result.error.message);
      }

      if (result.paymentIntent?.status !== 'succeeded') {
        throw new Error('Payment was not successful');
      }

      await createBooking({
        ...formData,
        paymentIntentId: result.paymentIntent.id,
      });

      setToast({
        message: 'Booking created successfully',
        type: 'SUCCESS',
      });
      // Navigate to my bookings
      navigate('/my-bookings');
    } catch (error) {
      setToast({
        message: error.message || 'Something went wrong',
        type: 'ERROR',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="border border-slate-300 rounded-md p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-2xl font-bold mb-2">Confirm Your Details</h2>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-600">First name</label>
            <input
              type="text"
              readOnly
              disabled
              {...register('firstName')}
              className="rounded-sm bg-gray-300 px-3 py-2 text-gray-700 font-bold"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-600">Last name</label>
            <input
              type="text"
              readOnly
              disabled
              {...register('lastName')}
              className="rounded-sm bg-gray-300 px-3 py-2 text-gray-700 font-bold"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-600">Email</label>
          <input
            type="text"
            readOnly
            disabled
            {...register('email')}
            className="rounded-sm bg-gray-300 px-3 py-2 text-gray-700 font-bold"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-lg font-semibold">Your Price Summary</span>
          <div className="bg-blue-200 rounded-md p-4 flex flex-col">
            <span className="text-lg font-semibold">{`Total Cost: $${paymentIntent?.totalCost.toFixed(
              2
            )}`}</span>
            <span className="text-sm">Includes taxes and charges</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-lg font-semibold">Payment Details</span>
          <CardElement
            id="payment-element"
            className="border rounded-md p-2"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
              },
              hidePostalCode: true,
              disableLink: true,
            }}
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-500 cursor-pointer disabled:bg-blue-300"
        >
          Confirm Booking
        </button>
      </div>
    </form>
  );
};

export default ConfirmBookingForm;
