import { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import * as authService from '../services/authService';
import ToastContext from '../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

const RegisterPage = function () {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // toast
  const { setToast } = useContext(ToastContext);

  // Auth
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  // If user is already logged in, redirect to homepage
  const [justSignedUp, setJustSignedUp] = useState(false);
  useEffect(() => {
    // Don't show this toast if user have just signed up
    if (isLoggedIn && !justSignedUp) {
      setToast({ message: 'You are already signed in', type: 'INFO' });

      // Wait 2s before redirect to homepage
      const timeout = setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isLoggedIn, navigate, setToast, justSignedUp]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.register(data);

      setIsLoggedIn(true);
      setJustSignedUp(true);
      // Update toast
      setToast({ message: 'Signed up Successfully', type: 'SUCCESS' });
      // Navigate to home page
      navigate('/');
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
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-3xl font-bold text-center mb-3">Create an Account</h2>
      <div className="flex flex-col md:flex-row mb-2 md:gap-2">
        <label className="text-sm font-medium flex-1">
          First Name
          <input
            {...register('firstName', { required: 'First Name is required' })}
            className="border rounded p-1.5 mt-1 text-sm font-medium w-full"
            placeholder="Enter your first name"
          ></input>
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-sm font-medium flex-1">
          Last Name
          <input
            {...register('lastName', { required: 'Last Name is required' })}
            className="border rounded p-1.5 mt-1 text-sm font-medium w-full"
            placeholder="Enter your last name"
          ></input>
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="text-sm font-medium flex-1 mb-2">
        Email
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Invalid email format',
            },
          })}
          type="email"
          className="border rounded p-1.5 mt-1 text-sm font-medium w-full"
          placeholder="Enter your email"
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-sm font-medium flex-1 mb-2">
        Password
        <input
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          type="password"
          className="border rounded p-1.5 mt-1 text-sm font-medium w-full"
          placeholder="Enter your password"
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="text-sm font-medium flex-1">
        Confirm Password
        <input
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value, formValues) =>
              value === formValues.password || 'Password do not match',
          })}
          type="password"
          className="border rounded p-1.5 mt-1 text-sm font-medium w-full mb-4"
          placeholder="Confirm your password"
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>

      <button
        type="submit"
        className=" text-center font-bold p-3 rounded 
          
          text-white bg-blue-600 hover:bg-blue-500 cursor-pointer
        "
        disabled={loading}
      >
        {loading ? (
          <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />
        ) : (
          'Sign up'
        )}
      </button>
      <div className="flex mt-5 gap-2 justify-center font-medium">
        <div>Already have an account?</div>
        <Link className="text-blue-600" to="/sign-in">
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default RegisterPage;
