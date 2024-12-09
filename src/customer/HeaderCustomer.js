import React, { useState, useEffect, useContext } from "react";
import "./HeaderCustomer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getTheater } from "../config/TheaterConfig.js";
import { TheaterContext } from "../context/TheaterContext.js";
import { AuthContext } from '../context/AuthContext';



const HeaderCustomer = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const [theaters, setTheaters] = useState([]);
  const { selectedTheater, setSelectedTheater } = useContext(TheaterContext);

  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const response = await getTheater();
        const theaterData = response.data.filter(theater => theater.status);
        setTheaters(theaterData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách rạp:", error);
      }
    };

    fetchTheater(); // Gọi hàm fetchTheater khi component được render lần đầu
  }, []);

  const handleSelectTheater = (theaterid) => {
    setSelectedTheater(theaterid);
  };

  const handleLogoutData = () => {
    handleLogout();
  }

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

      <select name="id" className="location-selector" value={selectedTheater || ''} onChange={(e) => handleSelectTheater(e.target.value)}>
        <option value="" disabled>---Chọn rạp---</option>
        {theaters.map((theater) => (
          <option key={theater.id} value={theater.id}>
            {theater.name}
          </option>
        ))}
      </select>

      <div>
        {user ? (
          <div className="user">
            {user.image ? (
              // Nếu có hình ảnh, hiển thị ảnh
              <img
                src={user.image}
                alt="User Avatar"
                className="customer-avatar"
                style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }}
              />
            ) : (
              // Nếu không có hình ảnh, hiển thị biểu tượng mặc định
              <FontAwesomeIcon
                icon={faUserCircle}
                className="customer-avatar"
                style={{ fontSize: "22px", marginRight: "10px" }}
              />
            )}
            {user.role.name === "CUSTOMER" ? (
              <Link to="/user-infor" className="user-infor">
                {user.name}
              </Link>
            ) : (
              <Link to="/admin/account" className="user-infor">
                {user.name}
              </Link>
            )}
            {/* Hiển thị tên người dùng */}
            <button
              className="logout-button"
              onClick={handleLogoutData}
            >
              / Thoát
            </button>
          </div>
        ) : (
          <Link to="/login-page" className="login-button">
            Đăng nhập / Đăng ký
          </Link>
        )}
      </div>
    </header>
  );
};

export default HeaderCustomer;
