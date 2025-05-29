import { useEffect, useState } from 'react';
import * as hotelService from '../services/hotelService';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink, faSpinner } from '@fortawesome/free-solid-svg-icons';

const MyBookingsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [bookingsData, setBookingsData] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;

  // Update search params
  // Set search params
  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: '1' });
    }
  }, []);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        const res = await hotelService.getMyBookings(page);
        setBookingsData(res);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, [page]);

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
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="text-gray-600 mt-1">
          View details and track your reservations
        </p>
      </div>

      <div className="grid gap-6">
        {bookingsData?.data?.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Bookings Found
            </h3>
            <p className="text-gray-600 mb-4">Start by booking a hotel</p>
            <Link
              to="/search"
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-500 transition-colors"
            >
              Book a Hotel
            </Link>
          </div>
        ) : (
          bookingsData?.data?.map((booking) => (
            <div
              key={booking._id}
              className="border border-slate-300 rounded-md p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
                {/* Hotel Image */}
                <div className="h-[200px] md:h-[250px]">
                  <img
                    src={booking?.hotel?.imageUrls[0]}
                    alt={booking?.hotel?.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                {/* Booking Details */}
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Link
                        to={`/hotels/${booking?.hotel?._id}/details`}
                        className="text-xl font-bold"
                      >
                        {booking?.hotel?.name}
                      </Link>
                      <p className="text-gray-600">{`${booking?.hotel?.city}, ${booking?.hotel?.country}`}</p>
                    </div>
                    <Link
                      to={`/my-bookings/${booking?._id}`}
                      className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-500"
                    >
                      View Details
                      <FontAwesomeIcon icon={faExternalLink} />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Check-in</p>
                      <p className="font-semibold">
                        {new Date(booking?.checkIn).toLocaleDateString(
                          'en-GB',
                          {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Check-out</p>
                      <p className="font-semibold">
                        {new Date(booking?.checkOut).toLocaleDateString(
                          'en-GB',
                          {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Guests</p>
                      <p className="font-semibold">
                        {booking?.adultCount} Adults, {booking?.childCount}{' '}
                        Children
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {bookingsData?.data?.length > 0 &&
        bookingsData?.pagination?.totalPages > 0 && (
          <Pagination
            currentPage={page}
            totalPages={bookingsData?.pagination?.totalPages}
            onPageChange={(newPage) => setSearchParams({ page: newPage })}
          />
        )}
    </>
  );
};

export default MyBookingsPage;
