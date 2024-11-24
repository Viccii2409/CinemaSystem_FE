import React, { useState, useEffect } from "react";
import "./HeaderCustomer.css";
import { Link } from "react-router-dom";
import { getTheater } from "../config/TheaterConfig.js";
const HeaderCustomer = () => {
  const [theaters, setTheaters] = useState([]);
  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const response = await getTheater();
        setTheaters(response.data); // Lưu dữ liệu vào state cinemas
      } catch (error) {
        console.error("Lỗi khi lấy danh sách rạp:", error);
      }
    };

    fetchTheater(); // Gọi hàm fetchTheater khi component được render lần đầu
  }, []); // Đóng ngoặc vuông để hoàn tất dependency array và gọi chỉ khi component render lần đầu

  return (
    <header className="homepage-header">
      <div className="header-title">
        <Link to="/home">LAL CINEMA</Link>
      </div>
      <nav className="navbar">
        <Link to="/">Lịch chiếu</Link>
        <Link to="/cinema-system">Hệ thống rạp</Link>
        <a href="#discount-section">Ưu đãi</a>
        <Link to="/">Thể loại</Link>
      </nav>
      <select className="location-selector">
        {theaters.map((theater) => (
          <option value="theatername">{theater.name}</option>
        ))}
      </select>
      <div>
        <Link to="/login-page" className="login-button">
          Đăng nhập / Đăng ký
        </Link>
      </div>
    </header>
  );
};
export default HeaderCustomer;
