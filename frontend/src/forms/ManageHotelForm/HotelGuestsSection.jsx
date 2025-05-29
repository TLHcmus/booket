import { useFormContext } from 'react-hook-form';

const HotelGuestsSection = function () {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">Guest Capacity</h3>
        <p className="text-sm text-gray-600 mt-1">
          Set the maximum number of guests your hotel can accommodate
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <div>
              <label className="font-medium text-gray-700">Adults</label>
              <p className="text-xs text-gray-500">Ages 13 or above</p>
            </div>
          </div>
          <input
            type="number"
            min={1}
            {...register('adultCount', {
              required: 'Adult count is required',
              min: {
                value: 1,
                message: 'Minimum 1 adult required',
              },
            })}
            className="border rounded-md p-2 text-sm font-medium w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            placeholder="Enter number of adults"
          />
          {errors.adultCount && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.adultCount.message}
            </span>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <label className="font-medium text-gray-700">Children</label>
              <p className="text-xs text-gray-500">Ages 0-12</p>
            </div>
          </div>
          <input
            type="number"
            min={0}
            {...register('childCount', {
              required: 'Child count is required',
              min: {
                value: 0,
                message: 'Child count cannot be negative',
              },
            })}
            className="border rounded-md p-2 text-sm font-medium w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            placeholder="Enter number of children"
          />
          {errors.childCount && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.childCount.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelGuestsSection;
