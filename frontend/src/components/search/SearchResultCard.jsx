import { faStar, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const SearchResultCard = ({ hotel }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] border border-slate-300 rounded-md p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex">
              {Array.from({ length: hotel.starRating }, (_, i) => (
                <FontAwesomeIcon
                  icon={faStar}
                  key={i}
                  className="text-yellow-500"
                />
              ))}
            </span>
            <span>{hotel.type}</span>
          </div>
          <Link
            to={`/hotels/${hotel._id}/details`}
            className="text-xl font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>
          <p className="text-gray-600">{`${hotel?.city}, ${hotel?.country}`}</p>
        </div>
        <span className="line-clamp-6 mt-2">{hotel.description}</span>
        <div className="grid grid-cols-2 items-end gap-2">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility, index) => (
              <span
                className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-sm whitespace-nowrap"
                key={index}
              >
                {facility}
              </span>
            ))}
            {hotel.facilities.length > 3 && (
              <span className="font-semibold text-xs">{`+${
                hotel.facilities.length - 3
              } more`}</span>
            )}
          </div>
          <div className="flex flex-col gap-2 items-end">
            <span className="font-bold">${hotel.pricePerNight} per night</span>
            <Link
              to={`/hotels/${hotel._id}/details`}
              className="flex items-center gap-2 rounded-md bg-blue-600 hover:bg-blue-500 font-semibold text-white px-4 py-2"
            >
              View More
              <FontAwesomeIcon icon={faExternalLink} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
