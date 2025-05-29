import { createContext, useState, useEffect } from 'react';

const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [search, setSearch] = useState({
    destination: sessionStorage.getItem('destination') || '',
    adultCount: sessionStorage.getItem('adultCount')
      ? parseInt(sessionStorage.getItem('adultCount'))
      : 1,
    childCount: sessionStorage.getItem('childCount')
      ? parseInt(sessionStorage.getItem('childCount'))
      : 0,
    checkIn: sessionStorage.getItem('checkIn')
      ? new Date(sessionStorage.getItem('checkIn'))
      : new Date(),
    checkOut: sessionStorage.getItem('checkOut')
      ? new Date(sessionStorage.getItem('checkOut'))
      : new Date(),
  });

  useEffect(() => {
    sessionStorage.setItem('destination', search.destination);
    sessionStorage.setItem('adultCount', search.adultCount);
    sessionStorage.setItem('childCount', search.childCount);
    sessionStorage.setItem('checkIn', search.checkIn);
    sessionStorage.setItem('checkOut', search.checkOut);
  }, [search]);

  const value = { search, setSearch };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchContext;
