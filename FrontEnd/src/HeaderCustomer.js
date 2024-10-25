import React from "react";
import './HeaderCustomer.css';
import { Link } from 'react-router-dom';

const HeaderCustomer = () => {
  return (
    <header className="homepage-header">
      <div className="header-title">
      <Link to="/home">LAL CINEMA</Link>
        
      </div>
      <nav className="navbar">
        <Link to="/">Lịch chiếu</Link>
        <Link to="/cinema-system">Hệ thống rạp</Link>
        <Link to="/">Ưu đãi</Link>
        <Link to="/">Thể loại</Link>
      </nav>
      <select className="location-selector">
        <option value="hanoi">LAL Hà Nội</option>
        <option value="hcmc">LAL Hồ Chí Minh</option>
      </select>
      <div>
        <Link to="/login-page" className="login-button">Đăng nhập / Đăng ký</Link>
      </div>
    </header>
  );
};
export default HeaderCustomer;