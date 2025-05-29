import { hotelFacilities } from '../../config/hotel-options-config.js';

const FacilityFilter = ({ selectedFacilities, onChange }) => {
  return (
    <div className="border-b border-slate-300 py-4">
      <span className="font-medium text-md">Facilities</span>
      <div className="flex flex-col mt-2">
        {hotelFacilities.map((facility) => (
          <label key={facility} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={facility}
              checked={selectedFacilities.includes(facility)}
              onChange={(e) => onChange(e)}
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FacilityFilter;
