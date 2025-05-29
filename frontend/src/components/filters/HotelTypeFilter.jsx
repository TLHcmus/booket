import { hotelTypes } from '../../config/hotel-options-config.js';

const HotelTypeFilter = ({ selectedHotelTypes, onChange }) => {
  return (
    <div className="border-b border-slate-300 py-4">
      <span className="font-medium text-md">Hotel Type</span>
      <div className="flex flex-col mt-2">
        {hotelTypes.map((hotelType) => (
          <label key={hotelType} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={hotelType}
              checked={selectedHotelTypes.includes(hotelType)}
              onChange={(e) => onChange(e)}
            />
            <span>{hotelType}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default HotelTypeFilter;
