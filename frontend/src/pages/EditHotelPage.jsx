import { useNavigate, useParams } from 'react-router-dom';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import ToastContext from '../contexts/ToastContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import * as hotelService from '../services/hotelService';

const EditHotelPage = () => {
  const [hotel, setHotel] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  // Toast
  const { setToast } = useContext(ToastContext);

  // Fetch hotel data
  const hotelId = useParams().hotelId;

  useEffect(() => {
    async function fetchHotel() {
      setLoading(true);
      setError(null);

      try {
        const res = await hotelService.getMyHotelById(hotelId);

        // Set hotel data to form
        setHotel(res);
      } catch (e) {
        console.error(e.message);

        setError(e.message);
        // Update toast
        setToast({ message: e.message, type: 'ERROR' });
      } finally {
        setLoading(false);
      }
    }
    fetchHotel();
  }, []);

  const handleEditHotel = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      // Call API to update hotel
      const res = await hotelService.updateMyHotelById(hotelId, formData);

      setHotel(res);
      // Update toast
      setToast({ message: 'Hotel edited successfully', type: 'SUCCESS' });
    } catch (error) {
      console.error(error.message);
      setError(error.message);

      // Update toast
      setToast({ message: error.message, type: 'ERROR' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHotel = async () => {
    setLoading(true);
    setError(null);
    try {
      await hotelService.deleteMyHotelById(hotelId);

      setToast({ message: 'Hotel deleted successfully', type: 'SUCCESS' });
      navigate('/my-hotels');
    } catch (error) {
      setError(error.message);
      setToast({ message: error.message, type: 'ERROR' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center border-b border-gray-200 pb-6 mb-6">
        <div className="">
          <h2 className="text-3xl font-bold mb-2">Edit Hotel</h2>
          <p className="text-gray-600">Edit the details of your hotel</p>
        </div>
        <button
          onClick={handleDeleteHotel}
          disabled={loading}
          className="flex items-center gap-2 bg-red-600 text-white px-2 py-3 rounded-md font-semibold cursor-pointer hover:bg-red-500 disabled:bg-red-300"
        >
          <FontAwesomeIcon icon={faTrash} />
          Delete Hotel
        </button>
      </div>
      <div>
        <ManageHotelForm
          onSave={handleEditHotel}
          hotel={hotel}
          loading={loading}
          buttonLabel={'Edit hotel'}
        />
      </div>
    </>
  );
};

export default EditHotelPage;
