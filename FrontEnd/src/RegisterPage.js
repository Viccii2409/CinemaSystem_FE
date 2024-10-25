import React, { useState } from 'react';
import './RegisterPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faPhone, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    phone: '',
    gender: '',
    city: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Form Data:', formData);
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <div className="tabs">
          <button><Link to="/login-page">ĐĂNG NHẬP</Link></button>
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
            <label htmlFor="dateOfBirth">
              <FontAwesomeIcon icon={faCalendarAlt} /> Ngày sinh
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
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
                  checked={formData.gender === 'Nam'}
                  onChange={handleInputChange}
                /> Nam
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Nữ"
                  checked={formData.gender === 'Nữ'}
                  onChange={handleInputChange}
                /> Nữ
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Khác"
                  checked={formData.gender === 'Khác'}
                  onChange={handleInputChange}
                /> Khác
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
            <label htmlFor="city">Tỉnh/Thành phố</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Tỉnh/Thành phố"
              required
            />
          </div>
          <div className="form-group terms">
            <label>
              <input type="checkbox" required /> Tôi cam kết tuân theo <Link to="/privacy-policy">chính sách bảo mật</Link> và <Link to="/terms-of-use">điều khoản sử dụng</Link> của LaLCinemas
            </label>
          </div>
          <button type="submit" className="register-button">Đăng ký</button>
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
