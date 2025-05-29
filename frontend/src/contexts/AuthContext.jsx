import { createContext, useEffect, useState } from 'react';
import { validateToken } from '../services/authService';

const AuthContext = createContext();

export const AuthContextProvider = function ({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await validateToken();
        setIsLoggedIn(true);
      } catch (error) {
        setError(error.message);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    !loading && (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    )
  );
};

export default AuthContext;
