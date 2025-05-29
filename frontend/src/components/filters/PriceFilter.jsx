const PriceFilter = ({ selectedPrice, onChange }) => {
  return (
    <div className="border-b border-slate-300 py-4">
      <span className="font-medium text-md">Max Price</span>
      <div className="flex flex-col mt-2">
        <select
          className="border border-slate-300 rounded-md p-2 w-full"
          value={selectedPrice}
          onChange={(e) => {
            if (e.target.value !== '') {
              onChange(parseInt(e.target.value));
            } else {
              onChange(undefined);
            }
          }}
        >
          <option value="">Select Max Price</option>
          {[50, 100, 200, 300, 500].map((price) => (
            <option value={price} key={price}>
              ${price}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PriceFilter;
