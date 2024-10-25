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
            <Route path="ticket-prices" element={<div>Giá vé Content</div>} />
            <Route path="movie-categories" element={<MovieCategories />} />
            <Route path="movies" element={<Movies />} />
            <Route path="showtimes" element={<div>Lịch chiếu Content</div>} />
            <Route path="promotions" element={<div>Ưu đãi Content</div>} />
            <Route path="ticket-sales" element={<div>Bán vé Content</div>} />
            <Route path="staff" element={<div>Nhân viên Content</div>} />
            <Route path="customers" element={<div>Khách hàng Content</div>} />
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