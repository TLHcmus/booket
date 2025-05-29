import { useContext, useState } from 'react';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import ToastContext from '../contexts/ToastContext';

import * as hotelService from '../services/hotelService';
import { useNavigate } from 'react-router-dom';
const AddHotelPage = function () {
  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  // Toast
  const { setToast } = useContext(ToastContext);

  // Handle Add hotel
  const handleAddHotel = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await hotelService.addMyHotel(formData);

      setToast({ message: 'Hotel added successfully', type: 'SUCCESS' });
      navigate('/my-hotels');
    } catch (error) {
      console.error(error.message);
      setError(error.message);

      // Update toast
      setToast({ message: error.message, type: 'ERROR' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-3xl font-bold mb-2">Add Hotel</h2>
        <p className="text-gray-600">
          Please provide the following information about your hotel
        </p>
      </div>
      <div>
        <ManageHotelForm
          onSave={handleAddHotel}
          loading={loading}
          buttonLabel={'Add hotel'}
        />
      </div>
    </>
  );
};

export default AddHotelPage;
