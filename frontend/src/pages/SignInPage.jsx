import { useContext, useEffect, useState } from 'react';
import * as authService from '../services/authService';
import ToastContext from '../contexts/ToastContext';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

const SignInPage = function () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  // Toast
  const { setToast } = useContext(ToastContext);
  const navigate = useNavigate();

  // Auth
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  // Disable sign in button if missing email or password
  const isDisabled = !email || !password;

  // If user is already logged in, redirect to homepage
  const [justSignedIn, setJustSignedIn] = useState(false);
  useEffect(() => {
    // Don't show this toast if user have just logged in
    if (isLoggedIn && !justSignedIn) {
      setToast({ message: 'You are already signed in', type: 'INFO' });

      // Wait 2s before redirect to homepage
      const timeout = setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isLoggedIn, navigate, setToast, justSignedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    try {
      const res = await authService.signIn({ email, password });

      // Update toast
      setToast({ message: 'Signed in Successfully', type: 'SUCCESS' });
      setIsLoggedIn(true);

      setJustSignedIn(true);

      // Navigate to the page user tried to access
      navigate(location.state?.from?.pathname || '/');
    } catch (error) {
      setError(error.message);
      // Update toast
      setToast({ message: error.message, type: 'ERROR' });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="flex flex-col w-[363px] mx-auto mt-5"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-bold text-center mb-3">Sign in</h2>
      <p className="font-medium">Email address</p>
      <input
        type="email"
        placeholder="Enter your email address"
        className="border rounded p-1.5 mt-1 text-sm font-medium"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Enter your password"
        className="border rounded p-1.5 mt-2 mb-4 text-sm font-medium"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        type="submit"
        className={` text-center font-bold p-3 rounded ${
          isDisabled
            ? 'text-gray-500 bg-gray-200 cursor-not-allowed'
            : 'text-white bg-blue-600 hover:bg-blue-800 cursor-pointer'
        }`}
        disabled={isDisabled || loading}
      >
        {loading ? (
          <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />
        ) : (
          'Log in'
        )}
      </button>
      <div className="flex mt-5 gap-2 justify-center font-medium">
        <div>Don't have an account?</div>
        <Link className="text-blue-600" to="/register">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default SignInPage;
