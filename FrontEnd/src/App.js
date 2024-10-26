import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HeaderAdmin from './HeaderAdmin';
import Sidebar from './Sidebar';
import CinemaManagement from './CinemaManagement';
import MovieCategories from './MovieCategories';
import Movies from './Movies';
import HeaderCustomer from './HeaderCustomer';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import Footer from './Footer';
import SeatSelection from './SeatSelection';
import PaymentInfo from './PaymentInfo';
import MovieDetail from './MovieDetail';
import CinemaSystem from './CinemaSystem';
import CinemaDetails from './CinemaDetails';
import RoomManagement from './RoomManagement';
import TicketPriceManagement from './TicketPriceManagement';
import ScheduleManagement from './ScheduleManagement';
import EmployeeManagement from './EmployeeManagement';
import AccessPermission from './AccessPermission';
import CustomerManagement from './CustomerManagement';
import CustomerDetail from './CustomerDetail';
import DiscountManagement from './DiscountManagement';

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