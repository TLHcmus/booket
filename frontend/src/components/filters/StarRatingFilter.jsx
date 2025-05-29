const StarRatingFilter = ({ selectedStars, onChange }) => {
  return (
    <div className="border-b border-slate-300 py-4">
      <span className="font-medium text-md">Property Rating</span>
      <div className="flex flex-col mt-2">
        {[5, 4, 3, 2, 1].map((star) => (
          <label key={star} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={star}
              checked={selectedStars.includes(star)}
              onChange={(e) => onChange(e)}
            />
            <span>{star} Stars</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default StarRatingFilter;
