import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addMyHotel = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/my-hotels`,
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occured';
    throw new Error(errorMessage);
  }
};

export const getMyHotels = async (page) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/my-hotels`, {
      withCredentials: true,
      params: { page },
    });

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occured';
    throw new Error(errorMessage);
  }
};

export const getMyHotelById = async (hotelId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/my-hotels/${hotelId}`,
      {
        withCredentials: true,
      }
    );

    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occured';
    throw new Error(errorMessage);
  }
};

export const updateMyHotelById = async (hotelId, formData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/my-hotels/${hotelId}`,
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occured';
    throw new Error(errorMessage);
  }
};

export const getHotels = async (page, size) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/hotels`, {
      withCredentials: true,
      params: { page, size },
    });

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occured';
    throw new Error(errorMessage);
  }
};

export const searchHotels = async (searchParams) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/hotels/search`, {
      withCredentials: true,
      params: searchParams,
    });

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occured';
    throw new Error(errorMessage);
  }
};

export const getHotelById = async (hotelId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/hotels/${hotelId}`, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occured';
    throw new Error(errorMessage);
  }
};

export const createPaymentIntent = async (hotelId, numberOfNights) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
      {
        numberOfNights,
      },
      {
        withCredentials: true,
      }
    );

    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occured';
    throw new Error(errorMessage);
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/hotels/${bookingData.hotelId}/bookings`,
      bookingData,
      {
        withCredentials: true,
      }
    );

    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occured';
    throw new Error(errorMessage);
  }
};

export const getMyBookings = async (page) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/my-bookings`, {
      withCredentials: true,
      params: { page },
    });

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occured';
    throw new Error(errorMessage);
  }
};

export const getMyBookingById = async (bookingId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/my-bookings/${bookingId}`,
      {
        withCredentials: true,
      }
    );

    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occured';
    throw new Error(errorMessage);
  }
};

export const deleteMyHotelById = async (hotelId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/my-hotels/${hotelId}`,
      {
        withCredentials: true,
      }
    );

    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occured';
    throw new Error(errorMessage);
  }
};
