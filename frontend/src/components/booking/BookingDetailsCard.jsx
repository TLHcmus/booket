

const BookingDetailsCard = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  hotel,
  days,
}) => {
  return (
    <div className="border border-slate-300 rounded-md p-4">
      <h3 className="text-lg font-bold mb-2">Your Booking Details</h3>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col border-b border-slate-300 pb-4 pt-2">
          <span className="text-gray-600">Location:</span>
          <span className="font-semibold">{`${hotel?.name}, ${hotel?.city}, ${hotel?.country}`}</span>
        </div>
        <div className="grid grid-cols-2 border-b border-slate-300 pb-4 pt-2">
          <div className="flex flex-col">
            <span className="text-gray-600">Check-in</span>
            <span className="font-semibold">{checkIn.toDateString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600">Check-out</span>
            <span className="font-semibold">{checkOut.toDateString()}</span>
          </div>
        </div>
        <div className="flex flex-col border-b border-slate-300 pb-4 pt-2">
          <span className="text-gray-600">Total length of stay</span>
          <span className="font-semibold">{`${days} days`}</span>
        </div>
        <div className="flex flex-col pb-4 pt-2">
          <span className="text-gray-600">Guest:</span>
          <span className="font-semibold">
            {`${adultCount} adults, ${childCount} children`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsCard;
