import React, { useState, useEffect } from "react";
import "./HeaderCustomer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getTheater } from "../config/TheaterConfig.js";

const HeaderCustomer = () => {
  const [cinemas, setCinemas] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // State lưu thông tin người dùng

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await getTheater();
        if (response && response.data) {
          setCinemas(response.data); // Lưu dữ liệu vào state cinemas
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách rạp:", error);
      }
    };

    fetchCinemas();
  }, []); // Chạy chỉ một lần khi component render

  useEffect(() => {
    const fetchUser = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setCurrentUser(JSON.parse(userData)); // Cập nhật thông tin người dùng
      }
    };

    fetchUser();

    // Lắng nghe sự thay đổi trong localStorage để cập nhật UI
    const handleStorageChange = () => fetchUser();
    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
        {cinemas.map((cinema) => (
          <option key={cinema.id} value={cinema.name}>
            {cinema.name}
          </option>
        ))}
      </select>
      <div>
        {currentUser ? (
          <div className="user">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="customer-avatar"
              style={{ fontSize: "22px", marginRight: "10px" }}
            />
            <Link to="/user-infor" className="user-infor">
              {currentUser.name}
            </Link>
            {/* Hiển thị tên người dùng */}
            <button
              className="logout-button"
              onClick={() => {
                localStorage.removeItem("user"); // Xóa thông tin người dùng khi logout
                setCurrentUser(null); // Reset state user
              }}
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
