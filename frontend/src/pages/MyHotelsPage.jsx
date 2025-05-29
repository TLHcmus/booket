import { Link } from 'react-router-dom';
import * as hotelService from '../services/hotelService';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import ToastContext from '../contexts/ToastContext';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faMoneyBill,
  faBed,
  faPlus,
  faEdit,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { faBuilding, faStar } from '@fortawesome/free-regular-svg-icons';
import Pagination from '../components/Pagination';

const MyHotelsPage = () => {
  const [hotelsData, setHotelsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const { setToast } = useContext(ToastContext);

  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: '1' });
    }
  }, []);

  useEffect(() => {
    async function fetchHotels() {
      setLoading(true);
      setError(null);

      try {
        const res = await hotelService.getMyHotels(page);
        setHotelsData(res);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
        setToast({ message: error.message, type: 'ERROR' });
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
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
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Hotels</h1>
            <p className="text-gray-600 mt-1">Manage your hotels</p>
          </div>
          <Link
            to="/my-hotels/add"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-500 transition-colors"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Hotel
          </Link>
        </div>

        {/* Hotels List */}
        <div className="grid gap-8">
          {hotelsData?.data?.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Hotels Found
              </h3>
              <p className="text-gray-600 mb-4">
                Start by adding your first hotel listing
              </p>
              <Link
                to="/my-hotels/add"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-500 transition-colors"
              >
                <FontAwesomeIcon icon={faPlus} />
                Add Your First Hotel
              </Link>
            </div>
          ) : (
            hotelsData?.data?.map((hotel) => (
              <div
                key={hotel._id}
                className="bg-white rounded-lg border-2 border-gray-200"
              >
                <div className="p-6">
                  {/* Hotel Header */}
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {hotel.name}
                      </h2>
                      <p className="text-gray-600 line-clamp-2">
                        {hotel.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <Link
                        to={`/my-hotels/${hotel._id}/edit`}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-500"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                        View Details
                      </Link>
                    </div>
                  </div>

                  {/* Hotel Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="text-blue-600"
                      />
                      <span className="text-gray-700">
                        {hotel.city}, {hotel.country}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                      <FontAwesomeIcon
                        icon={faBuilding}
                        className="text-blue-600"
                      />
                      <span className="text-gray-700">{hotel.type}</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                      <FontAwesomeIcon
                        icon={faMoneyBill}
                        className="text-blue-600"
                      />
                      <span className="text-gray-700">
                        ${hotel.pricePerNight} per night
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                      <FontAwesomeIcon icon={faBed} className="text-blue-600" />
                      <span className="text-gray-700">
                        {hotel.adultCount} adults, {hotel.childCount} children
                      </span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-blue-600"
                      />
                      <span className="text-gray-700">
                        {hotel.starRating} Star rating
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Pagination */}
      {hotelsData?.data?.length > 0 && (
        <div className="mt-8">
          <Pagination
            currentPage={page}
            totalPages={hotelsData?.pagination?.totalPages}
            onPageChange={(newPage) => setSearchParams({ page: newPage })}
          />
        </div>
      )}
    </>
  );
};

export default MyHotelsPage;
