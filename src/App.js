import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderAdmin from './admin/HeaderAdmin';
import Sidebar from './admin/Sidebar';
import CinemaManagement from './admin/TheaterManagement';
import MovieCategories from './admin/MovieCategories';
import Movies from './admin/Movies';
import RoomManagement from './admin/RoomManagement';
import TicketPriceManagement from './admin/TicketPriceManagement';
import ScheduleManagement from './admin/ScheduleManagement';
import EmployeeManagement from './admin/EmployeeManagement';
import CustomerManagement from './admin/CustomerManagement';
import DiscountManagement from './admin/DiscountManagement';
import AddRoom from './admin/AddRoom';
import ViewRoom from './admin/ViewRoom';
import EditRoom from './admin/EditRoom';
import CinemaTicket from './admin/CinemaTicket';
import CinemaTicket_2 from './admin/CinemaTicket_2';
import ViewTicketAdmin from "./admin/ViewTicketAdmin";
import ManagerRole from "./admin/ManagerRole";
import EmployeeInfor from "./admin/EmployeeInfor";
import MovieDetailAdmin from "./admin/MovieDetail"

import HeaderCustomer from "./customer/HeaderCustomer";
import { TheaterProvider } from "./context/TheaterContext";
import TheaterDetails from "./customer/TheaterDetails";
import HomePage from "./customer/HomePage";
import LoginPage from "./customer/LoginPage";
import RegisterPage from "./customer/RegisterPage";
import VerificationSuccess from "./customer/VerificationSuccess";
import GenreFavourite from "./customer/GenreFavourite";
import Footer from "./customer/Footer";
import CinemaSystem from "./customer/CinemaSystem";
import SeatSelection from "./customer/SeatSelection";
import MovieDetail from "./customer/MovieDetail";
import UserInfor from "./customer/UserInfor";
import ViewBooking from "./customer/ViewBooking";

import Error403 from "./error/Error403";
import { AuthContext } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';

function App() {
  const { user, loading } = useContext(AuthContext);
  const [statusEmployee, setStatusEmployee] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (user) {
      setStatusEmployee(user.statusEmployee);
    }
  }, [user, loading]);

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<CustomerLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        {/* <Route path="/admin/*" element={
          <ProtectedRoute isAllowed={statusEmployee}>
            <AdminLayout />
          </ProtectedRoute>
        } /> */}
      </Routes>
    </Router>
  );
}

function CustomerLayout() {
  return (
    <div className="customer-layout">
      <TheaterProvider>
        <HeaderCustomer />
        <div className="content">
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="login-page" element={<LoginPage />} />
            <Route path="register-page" element={<RegisterPage />} />
            <Route path="verifyaccount" element={<VerificationSuccess />} />
            <Route path="genre-favourite" element={<GenreFavourite />} />
            <Route path="seat-selection" element={<SeatSelection />} />
            <Route path="view-booking" element={<ViewBooking />} />
            <Route path="movie-detail" element={<MovieDetail />} />
            <Route path="cinema-system" element={<CinemaSystem />} />
            <Route path="movie-detail" element={<MovieDetail />} />
            <Route path="cinema-system/theater-detail" element={<TheaterDetails />} />
            <Route path="theater-detail" element={<TheaterDetails />} />
            <Route path="user-infor" element={<UserInfor />} />


            <Route path="/403" element={<Error403 />} />

          </Routes>
        </div>
        <Footer />
      </TheaterProvider>
    </div>
  );
}

function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-container">
        <HeaderAdmin />
        <div className="admin-content">
          <Routes>
            <Route path="" element={<CinemaManagement />} />
            <Route path="cinema-management" element={<CinemaManagement />} />
            <Route path="rooms-and-seats" element={<RoomManagement />} />
            <Route path="rooms-and-seats/add-room" element={<AddRoom />} />
            <Route path="rooms-and-seats/view-room" element={<ViewRoom />} />
            <Route path="rooms-and-seats/edit-room" element={<EditRoom />} />
            <Route path="ticket-prices" element={<TicketPriceManagement />} />
            <Route path="movie-categories" element={<MovieCategories />} />
            <Route path="movies" element={<Movies />} />
            <Route path="movie-detail" element={<MovieDetailAdmin />} /> // xem chi tiết movie
            <Route path="showtimes" element={<ScheduleManagement />} />
            <Route path="promotions" element={<DiscountManagement />} />
            <Route path="ticket-sales" element={<CinemaTicket />} />
            <Route path="ticket-sales/booking-seat" element={<CinemaTicket_2 />} />
            <Route path="view-ticket-admin" element={<ViewTicketAdmin />} />
            <Route path="role" element={<ManagerRole />} />
            <Route path="staff" element={<EmployeeManagement />} />
            <Route path="customers" element={<CustomerManagement />} />
            <Route path="statistics" element={<div>Thống kê Content</div>} />
            <Route path="account" element={<EmployeeInfor />} />
            <Route path="logout" element={<div>Thoát Content</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
