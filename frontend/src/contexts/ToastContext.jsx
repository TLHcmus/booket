import { createContext, useState } from 'react';
import Toast from '../components/Toast';

const ToastContext = createContext();

export const ToastContextProvider = function ({ children }) {
  const [toast, setToast] = useState(undefined);

  const value = {
    toast,
    setToast,
  };
  return (
    <ToastContext.Provider value={value}>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
