import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/me`, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occured';
    throw new Error(errorMessage);
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/${userId}`, {
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occured';
    throw new Error(errorMessage);
  }
};
