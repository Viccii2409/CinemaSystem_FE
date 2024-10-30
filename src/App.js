import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HeaderAdmin from './admin/HeaderAdmin';
import Sidebar from './admin/Sidebar';
import CinemaManagement from './admin/TheaterManagement';
import MovieCategories from './admin/MovieCategories';
import Movies from './admin/Movies';
import CinemaDetails from './admin/TheaterDetails';
import RoomManagement from './admin/RoomManagement';
import TicketPriceManagement from './admin/TicketPriceManagement';
import ScheduleManagement from './admin/ScheduleManagement';
import EmployeeManagement from './admin/EmployeeManagement';
import AccessPermission from './admin/AccessPermission';
import CustomerManagement from './admin/CustomerManagement';
import CustomerDetail from './admin/CustomerDetail';
import DiscountManagement from './admin/DiscountManagement';

import HeaderCustomer from './customer/HeaderCustomer';
import HomePage from './customer/HomePage';
import LoginPage from './customer/LoginPage';
import RegisterPage from './customer/RegisterPage';
import Footer from './customer/Footer';
import CinemaSystem from './customer/CinemaSystem';
import SeatSelection from './customer/SeatSelection';
import PaymentInfo from './customer/PaymentInfo';
import MovieDetail from './customer/MovieDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<CustomerLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
}

function CustomerLayout() {
  return (
    <div className="customer-layout">
      <HeaderCustomer />
      <div className="content">
        <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="login-page" element={<LoginPage />} />
        <Route path="register-page" element={<RegisterPage />} />
        <Route path="seat-selection" element={<SeatSelection />} />
        <Route path="payment-info" element={<PaymentInfo />} />
        <Route path="home/movie-detail" element={<MovieDetail />} />
        <Route path="movie-detail" element={<MovieDetail />} />
        <Route path="cinema-system" element={<CinemaSystem />} />
        <Route path="cinema-system/cinema-detail" element={<CinemaDetails />} />

        </Routes>
      </div>
      <Footer />
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
            <Route path="ticket-prices" element={<TicketPriceManagement />} />
            <Route path="movie-categories" element={<MovieCategories />} />
            <Route path="movies" element={<Movies />} />
            <Route path="showtimes" element={<ScheduleManagement />} />
            <Route path="promotions" element={<DiscountManagement />} />
            <Route path="ticket-sales" element={<div>Bán vé Content</div>} />
            <Route path="staff" element={<EmployeeManagement />} />
            <Route path="staff/access-permission" element={<AccessPermission />} />
            <Route path="customers" element={<CustomerManagement />} />
            <Route path="customers/customer-detail" element={<CustomerDetail />} />
            <Route path="statistics" element={<div>Thống kê Content</div>} />
            <Route path="account" element={<div>Tài khoản Content</div>} />
            <Route path="logout" element={<div>Thoát Content</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}


export default App; 