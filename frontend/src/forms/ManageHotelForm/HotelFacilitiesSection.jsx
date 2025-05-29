import { useFormContext } from 'react-hook-form';
import { hotelFacilities } from '../../config/hotel-options-config';

const HotelFacilitiesSection = function () {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">Facilities</h3>
        <p className="text-sm text-gray-600 mt-2">
          Select the facilities available at your hotel
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {hotelFacilities.map((facility) => (
          <label
            key={facility}
            className="flex items-center space-x-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <input
              type="checkbox"
              value={facility}
              {...register('facilities', {
                required: 'At least one facility is required',
              })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">
              {facility}
            </span>
          </label>
        ))}
      </div>

      {errors.facilities && (
        <p className="mt-2 text-sm text-red-600">{errors.facilities.message}</p>
      )}
    </div>
  );
};

export default HotelFacilitiesSection;
