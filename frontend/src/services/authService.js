import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const register = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/register`,
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data.message;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occured';
    throw new Error(errorMessage);
  }
};

const signIn = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
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

const signOut = async () => {
  try {
    await axios.post(
      `${API_BASE_URL}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occured';
    throw new Error(errorMessage);
  }
};

const validateToken = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/auth/validate-token`,
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

export { register, signIn, signOut, validateToken };
