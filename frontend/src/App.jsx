import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import RegisterPage from './pages/RegisterPage';
import SignInPage from './pages/SignInPage';
import AddHotelPage from './pages/AddHotelPage';
import MyHotelsPage from './pages/MyHotelsPage';
import EditHotelPage from './pages/EditHotelPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import HotelDetailPage from './pages/HotelDetailPage';
import ProtectedRoute from './utils/ProtectedRoute';
import MyBookingsPage from './pages/MyBookingsPage';
import BookingPage from './pages/BookingPage';
import MyBookingDetailsPage from './pages/MyBookingDetailsPage';
import SearchLayout from './layouts/SearchLayout';
function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={
          <SearchLayout>
            <HomePage />
          </SearchLayout>
        }
      />
      <Route
        path="/register"
        element={
          <AuthLayout>
            <RegisterPage />
          </AuthLayout>
        }
      />
      <Route
        path="/sign-in"
        element={
          <AuthLayout>
            <SignInPage />
          </AuthLayout>
        }
      />
      <Route
        path="/search"
        element={
          <SearchLayout>
            <SearchPage />
          </SearchLayout>
        }
      ></Route>
      <Route
        path="/hotels/:hotelId/details"
        element={
          <SearchLayout>
            <HotelDetailPage />
          </SearchLayout>
        }
      ></Route>
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/my-hotels/add"
          element={
            <MainLayout>
              <AddHotelPage />
            </MainLayout>
          }
        />
        <Route
          path="/my-hotels"
          element={
            <MainLayout>
              <MyHotelsPage />
            </MainLayout>
          }
        />
        <Route
          path="/my-hotels/:hotelId/edit"
          element={
            <MainLayout>
              <EditHotelPage />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/hotels/:hotelId/booking"
          element={
            <MainLayout>
              <BookingPage />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/my-bookings"
          element={
            <MainLayout>
              <MyBookingsPage />
            </MainLayout>
          }
        ></Route>
      </Route>
      <Route
        path="/my-bookings/:bookingId"
        element={
          <MainLayout>
            <MyBookingDetailsPage />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;
