import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useContext, useState } from 'react';
import SearchContext from '../../contexts/SearchContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = function () {
  const navigate = useNavigate();

  const { search, setSearch } = useContext(SearchContext);

  // Search params states
  const [destination, setDestination] = useState(
    search.destination ? search.destination : ''
  );
  const [adultCount, setAdultCount] = useState(
    search.adultCount ? search.adultCount : 1
  );
  const [childCount, setChildCount] = useState(
    search.childCount ? search.childCount : 0
  );
  const [checkIn, setCheckIn] = useState(
    search.checkIn ? new Date(search.checkIn) : new Date()
  );
  const [checkOut, setCheckOut] = useState(
    search.checkOut ? new Date(search.checkOut) : new Date()
  );

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(minDate.getFullYear() + 1);

  const handleSearch = (e) => {
    e.preventDefault();

    setSearch((prev) => ({
      ...prev,
      destination,
      adultCount,
      childCount,
      checkIn,
      checkOut,
    }));
    navigate('/search');
  };

  const handleClear = (e) => {
    e.preventDefault();

    setDestination('');
    setAdultCount(1);
    setChildCount(0);
    setCheckIn(new Date());
    setCheckOut(new Date());

    setSearch((prev) => ({
      ...prev,
      destination: '',
      adultCount: 1,
      childCount: 0,
      checkIn: new Date(),
      checkOut: new Date(),
    }));
  };
  return (
    <form className="-mt-8 p-3 bg-orange-500 rounded grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center gap-4">
      <div className="flex items-center bg-white p-2">
        <FontAwesomeIcon icon={faMapLocationDot} className="mr-2" />
        <input
          type="text"
          placeholder="Where are you going?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="focus:outline-none w-full"
        />
      </div>
      <div className="flex items-center bg-white p-2">
        <label className="flex-1 flex items-center">
          Adults:
          <input
            type="number"
            className="w-8 font-bold pl-1 focus:outline-none"
            min={1}
            max={5}
            value={adultCount}
            onChange={(e) => setAdultCount(e.target.value)}
          />
        </label>
        <label className="flex-1 flex items-center">
          Children:
          <input
            type="number"
            className="w-8 font-bold pl-1 focus:outline-none"
            min={0}
            max={10}
            value={childCount}
            onChange={(e) => setChildCount(e.target.value)}
          />
        </label>
      </div>
      <div className="min-w-full bg-white p-2">
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholder="Check-in date"
          dateFormat="dd/MM/yyyy"
          className="focus:outline-none"
        />
      </div>
      <div className="min-w-full bg-white p-2">
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholder="Check-out date"
          dateFormat="dd/MM/yyyy"
          className="focus:outline-none"
        />
      </div>
      <div className="flex text-white font-bold gap-2 col-span-2 lg:col-span-1 h-10 md:h-full">
        <button
          className="flex-2/3 bg-blue-600 hover:bg-blue-500"
          onClick={(e) => handleSearch(e)}
        >
          Search
        </button>
        <button
          className="flex-1/3 bg-red-600 hover:bg-red-500"
          onClick={(e) => handleClear(e)}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
