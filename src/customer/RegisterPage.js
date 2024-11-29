import React, { useState } from "react";
import "./RegisterPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faPhone,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    phone: "",
    gender: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      alert("Đăng ký thành công!");
      console.log("Response:", result);
      // Chuyển hướng người dùng hoặc cập nhật trạng thái UI
    } else {
      const errorData = await response.json();
      alert("Lỗi đăng ký: " + errorData.message || "Unknown error");
      console.error("Error response:", errorData);
    }
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <div className="tabs">
          <button>
            <Link to="/login-page">ĐĂNG NHẬP</Link>
          </button>
          <button className="active-tab">ĐĂNG KÝ</button>
        </div>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="fullName">
              <FontAwesomeIcon icon={faUser} /> Họ tên
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Họ tên"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <FontAwesomeIcon icon={faLock} /> Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Mật khẩu"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">
              <FontAwesomeIcon icon={faLock} /> Xác nhận lại mật khẩu
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Xác nhận lại mật khẩu"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">
              <FontAwesomeIcon icon={faCalendarAlt} /> Ngày sinh
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Giới tính</label>
            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Nam"
                  checked={formData.gender === "Nam"}
                  onChange={handleInputChange}
                />{" "}
                Nam
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Nữ"
                  checked={formData.gender === "Nữ"}
                  onChange={handleInputChange}
                />{" "}
                Nữ
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Khác"
                  checked={formData.gender === "Khác"}
                  onChange={handleInputChange}
                />{" "}
                Khác
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phone">
              <FontAwesomeIcon icon={faPhone} /> Số điện thoại
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Số điện thoại"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Tỉnh/Thành phố</label>
            <input
              type="text"
              id="city"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Tỉnh/Thành phố"
              required
            />
          </div>
          <div className="form-group terms">
            <label>
              <input type="checkbox" required />
              Tôi cam kết tuân theo{" "}
              <Link to="/privacy-policy">chính sách bảo mật</Link> và{" "}
              <Link to="/terms-of-use">điều khoản sử dụng</Link> của LaLCinemas
            </label>
          </div>
          <button type="submit" className="register-button">
            Đăng ký
          </button>
        </form>
        <div className="social-login">
          <p>Đăng ký bằng</p>
          <div className="social-login-buttons">
            <button className="social-login-button facebook">F</button>
            <button className="social-login-button google">G</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
