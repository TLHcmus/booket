import { useFormContext } from 'react-hook-form';

const HotelDetailsSection = function () {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          Hotel Details
        </h3>
        <p className="text-gray-600">
          Provide the basic information about your hotel
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">Hotel Name</label>
          <input
            {...register('name', {
              required: 'Name is required',
            })}
            className="border rounded-md p-2 mt-1 text-sm font-medium w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter hotel name"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">City</label>
          <input
            {...register('city', { required: 'Hotel city is required' })}
            className="border rounded-md p-2 mt-1 text-sm font-medium w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter hotel city"
          />
          {errors.city && (
            <span className="text-red-500 text-sm">{errors.city.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">Country</label>
          <input
            {...register('country', { required: 'Hotel country is required' })}
            className="border rounded-md p-2 mt-1 text-sm font-medium w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter hotel country"
          />
          {errors.country && (
            <span className="text-red-500 text-sm">
              {errors.country.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">
            Price per Night ($)
          </label>
          <input
            {...register('pricePerNight', {
              required: 'Hotel Price is required',
            })}
            type="number"
            min={0}
            className="border rounded-md p-2 mt-1 text-sm font-medium w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter hotel price"
          />
          {errors.pricePerNight && (
            <span className="text-red-500 text-sm">
              {errors.pricePerNight.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700">Star Rating</label>
          <select
            {...register('starRating', {
              required: 'Hotel Rating is required',
            })}
            className="border rounded-md p-2 mt-1 text-sm font-medium w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="" className="text-sm font-medium">
              Select as Rating
            </option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option
                className="text-sm font-medium"
                value={rating}
                key={rating}
              >
                {rating}
              </option>
            ))}
          </select>
          {errors.starRating && (
            <span className="text-red-500 text-sm">
              {errors.starRating.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium text-gray-700">Description</label>
        <textarea
          {...register('description', {
            required: 'Hotel description is required',
            validate: (value) => {
              const wordCount = value.trim().split(/\s+/).length;
              return wordCount >= 80 || 'Description must be at least 80 words';
            },
          })}
          rows={10}
          className="border rounded-md p-2 mt-1 text-sm font-medium w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter hotel description (minimum 80 words)"
        />
        {errors.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default HotelDetailsSection;
