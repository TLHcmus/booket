import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as hotelService from '../services/hotelService';
import ToastContext from '../contexts/ToastContext';
import { faStar, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GuestInfoForm from '../components/booking/GuestInfoForm';

const HotelDetailPage = () => {
  const { hotelId } = useParams();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setToast } = useContext(ToastContext);

  useEffect(() => {
    const fetchHotel = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await hotelService.getHotelById(hotelId);
        setHotel(res);
      } catch (error) {
        setError(error.message);
        setToast({ message: error.message, type: 'ERROR' });
      } finally {
        setLoading(false);
      }
    };
    fetchHotel();
  }, [hotelId]);

  if (!hotel) {
    return <></>;
  }

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
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="flex items-center gap-2">
          <span className="flex">
            {Array.from({ length: hotel?.starRating }, (_, i) => (
              <FontAwesomeIcon
                icon={faStar}
                key={i}
                className="text-yellow-500"
              />
            ))}
          </span>
          <span>{hotel.type}</span>
        </div>
        <h2 className="text-3xl font-bold">{hotel?.name}</h2>
        <span className="text-gray-600">{`${hotel?.city}, ${hotel?.country}`}</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {hotel?.imageUrls.map((url, index) => (
          <div key={index} className="h-[300px]">
            <img
              src={url}
              className="w-full h-full object-cover object-center rounded-sm"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {hotel?.facilities.map((facility, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-md border border-gray-200 p-3"
          >
            {facility}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
        <span>{hotel?.description}</span>
        <GuestInfoForm pricePerNight={hotel?.pricePerNight} hotel={hotel} />
      </div>
    </div>
  );
};

export default HotelDetailPage;
