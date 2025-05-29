import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faMoneyBill,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import * as hotelService from '../services/hotelService';
import { benefits } from '../config/benefits-config';

const HomePage = () => {
  const [latestHotels, setLatestHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestHotels = async () => {
      try {
        const response = await hotelService.getHotels(1, 3);
        setLatestHotels(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestHotels();
  }, []);

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img
          src="https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Hero"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Stay
          </h1>
          <p className="text-xl mb-8">
            Discover and book the best hotels around the world
          </p>
          <Link
            to="/search"
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-bold hover:bg-blue-500 transition-colors"
          >
            Start Your Search
          </Link>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Booket?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <FontAwesomeIcon
                icon={benefit.icon}
                className="text-3xl text-blue-600 mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Hotels Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Latest Additions
          </h2>
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestHotels.map((hotel) => (
                <div
                  key={hotel._id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full min-h-[410px]"
                >
                  <div className="relative h-48">
                    <img
                      src={hotel.imageUrls[0]}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded-md flex items-center">
                      <FontAwesomeIcon icon={faStar} className="mr-1" />
                      {hotel.starRating}
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-4">
                    <h3 className="text-xl font-bold mb-1">{hotel.name}</h3>
                    <p className="text-gray-600 mb-2 flex items-center">
                      <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                      {hotel.city}, {hotel.country}
                    </p>
                    <div className="flex items-center mb-3">
                      <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
                      <span className="font-bold">${hotel.pricePerNight}</span>
                      <span className="text-gray-600 ml-1">per night</span>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center mb-3">
                      {hotel.facilities.slice(0, 3).map((facility, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm flex items-center justify-center"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto">
                      <Link
                        to={`/hotels/${hotel._id}/details`}
                        className="block text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
