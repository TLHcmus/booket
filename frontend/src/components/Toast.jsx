import { useEffect } from 'react';

const Toast = function ({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const styles = `fixed top-5 right-5 p-3 text-white z-50 ${
    type === 'SUCCESS'
      ? 'bg-green-500'
      : type === 'ERROR'
      ? 'bg-red-500'
      : type === 'INFO'
      ? 'bg-blue-500'
      : 'bg-gray-500'
  }`;

  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-base font-semibold">{message}</span>
      </div>
    </div>
  );
};
export default Toast;
