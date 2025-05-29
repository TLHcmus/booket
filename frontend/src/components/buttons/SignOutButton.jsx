import { useContext } from 'react';
import { signOut } from '../../services/authService';
import AuthContext from '../../contexts/AuthContext';
import ToastContext from '../../contexts/ToastContext';

const SignOutButton = function () {
  const { setToast } = useContext(ToastContext);
  const { setIsLoggedIn } = useContext(AuthContext);
  const handleClick = async () => {
    try {
      await signOut();

      setIsLoggedIn(false);
      // update toast
      setToast({ message: 'Signed out', type: 'SUCCESS' });
    } catch (error) {
      // update toast
      setToast({ message: error.message, type: 'ERROR' });
    }
  };
  return (
    <button
      className="bg-white rounded-xs text-blue-600 px-3 font-bold cursor-pointer hover:bg-gray-100"
      onClick={handleClick}
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
