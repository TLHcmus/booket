import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

import SignOutButton from '../buttons/SignOutButton';

const Header = function () {
  const { isLoggedIn } = useContext(AuthContext);

  // Check if at auth page or not
  const location = useLocation();
  const isAuthPage =
    location.pathname.toLowerCase() === '/sign-in' ||
    location.pathname.toLowerCase() === '/register';

  return (
    <div className="bg-blue-900">
      <div className="container px-2 flex justify-between mx-auto py-6">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Booket</Link>
        </span>
        {!isAuthPage && (
          <span className="flex space-x-2">
            {isLoggedIn ? (
              <>
                <Link
                  to="/my-bookings"
                  className="flex items-center justify-center text-white font-medium px-2 hover:bg-blue-700"
                >
                  My Bookings
                </Link>
                <Link
                  to="/my-hotels"
                  className="flex items-center justify-center text-white font-medium px-2 hover:bg-blue-700"
                >
                  My Hotels
                </Link>
                <SignOutButton />
              </>
            ) : (
              <Link
                to="/sign-in"
                className="flex items-center bg-white rounded-xs text-blue-600 px-3 font-bold hover:bg-gray-100 "
              >
                Sign In
              </Link>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
