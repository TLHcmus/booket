import { useContext } from 'react';
import SearchContext from '../../contexts/SearchContext';
import DatePicker from 'react-datepicker';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthContext from '../../contexts/AuthContext';

const GuestInfoForm = ({ pricePerNight, hotel }) => {
  const { search, setSearch } = useContext(SearchContext);

  const { isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      adultCount: search.adultCount ? search.adultCount : 1,
      childCount: search.childCount ? search.childCount : 0,
      checkIn: search.checkIn ? search.checkIn : new Date(),
      checkOut: search.checkOut ? search.checkOut : new Date(),
    },
  });

  // watch and set default values
  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(minDate.getFullYear() + 1);

  const handleCheckInChange = (date) => {
    setValue('checkIn', date);

    if (date > checkOut) {
      setValue('checkOut', date);
    }
  };

  const handleCheckOutChange = (date) => {
    setValue('checkOut', date);

    if (date < checkIn) {
      setValue('checkIn', date);
    }
  };

  const onSubmit = (data) => {
    setSearch((prev) => ({
      ...prev,
      adultCount: data.adultCount,
      childCount: data.childCount,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
    }));

    if (!isLoggedIn) {
      navigate('/sign-in', { state: { from: location } });
    } else {
      navigate(`/hotels/${hotel._id}/booking`);
    }
  };

  return (
    <form
      className="bg-blue-300 p-4 rounded-sm flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="text-lg font-bold">${pricePerNight} per night</span>
      <div className="flex flex-row lg:flex-col gap-3">
        <div className="flex-1 bg-white p-2">
          <DatePicker
            selected={checkIn}
            required
            onChange={(date) => handleCheckInChange(date)}
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
        <div className="flex-1 bg-white p-2">
          <DatePicker
            selected={checkOut}
            required
            onChange={(date) => handleCheckOutChange(date)}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            placeholder="Check-out date"
            dateFormat="dd/MM/yyyy"
            className="focus:outline-none"
          />
        </div>
      </div>
      <div className="flex items-center bg-white p-2">
        <label className="flex-1 flex items-center">
          <span>Adults:</span>
          <input
            type="number"
            min={1}
            max={5}
            className="w-12 font-bold pl-1 focus:outline-none"
            {...register('adultCount', {
              required: 'Adult count is required',
              min: {
                value: 1,
                message: 'Atleast 1 adult is required',
              },
              max: {
                value: hotel?.adultCount,
                message: `Max ${hotel?.adultCount} adults allowed for this hotel`,
              },
              valueAsNumber: true,
            })}
          />
        </label>
        <label className="flex-1 flex items-center">
          <span>Children:</span>
          <input
            type="number"
            min={0}
            max={10}
            className="w-12 font-bold pl-1 focus:outline-none"
            {...register('childCount', {
              valueAsNumber: true,
              max: {
                value: hotel?.childCount,
                message: `Max ${hotel?.childCount} children allowed for this hotel`,
              },
            })}
          />
        </label>
      </div>
      {errors.adultCount && (
        <span className="text-red-500 text-sm">
          {errors.adultCount.message}
        </span>
      )}
      {errors.childCount && (
        <span className="text-red-500 text-sm">
          {errors.childCount.message}
        </span>
      )}
      <button className="font-bold text-lg text-white p-2 bg-blue-600 hover:bg-blue-500 cursor-pointer">
        {isLoggedIn ? 'Book now' : 'Sign in to book'}
      </button>
    </form>
  );
};

export default GuestInfoForm;
