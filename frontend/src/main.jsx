import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ToastContextProvider } from './contexts/ToastContext.jsx';
import { AuthContextProvider } from './contexts/AuthContext.jsx';
import { SearchContextProvider } from './contexts/SearchContext.jsx';
import { AppContextProvider } from './contexts/AppContext.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <ToastContextProvider>
        <AuthContextProvider>
          <SearchContextProvider>
            <App />
          </SearchContextProvider>
        </AuthContextProvider>
      </ToastContextProvider>
    </AppContextProvider>
  </BrowserRouter>
);
