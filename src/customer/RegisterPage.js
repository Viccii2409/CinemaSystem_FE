import React, { useState, useContext, useEffect } from "react";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faPhone,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { check, register } from "../config/UserConfig";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    phone: "",
    gender: "other",
    address: "",
  });

  
  useEffect(() => {
    if(user) {
      navigate("/home");
      return;
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setIsSubmitting(false);
      return;
    }
    // console.log(formData);
    const response_check = await check(formData.email);
    console.log(response_check);
    if(response_check){
      alert("Email đã được sử dụng. Vui lòng nhập email khác!");
      setIsSubmitting(false);
      return;
    }
    else {
      const response_register = await register(formData);
      console.log(response_check);
      if (response_register) {
        alert("Bạn đã đăng kí thành công! Vui lòng kiểm tra lại email để kích hoạt tài khoản.");
        navigate("/home");
        // await handleLogin(response_register); 
        // navigate("/genre-favourite");
      } else {
        alert("Lỗi không đăng kí được!");
        return;
      }
    }
  };
  
  useEffect(() => {
    console.log(formData);
  }, [formData]);

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
            <label htmlFor="name">
              <FontAwesomeIcon icon={faUser} /> Họ tên
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
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
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} /> Giới tính 
            </label>
            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleInputChange}
                />{" "}
                Nam
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleInputChange}
                />{" "}
                Nữ
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === "other"}
                  onChange={handleInputChange}
                />{" "}
                Khác
              </label>
            </div>
          </div>
          
          <div className="form-row">
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
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dob">
                <FontAwesomeIcon icon={faCalendarAlt} /> Ngày sinh
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
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
          </div>
          <div className="form-group">
            <label htmlFor="address">Tỉnh/Thành phố</label>
            <input
              type="text"
              id="address"
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
        {/* <div className="social-login">
          <p>Đăng ký bằng</p>
          <div className="social-login-buttons">
            <button className="social-login-button facebook">F</button>
            <button className="social-login-button google">G</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default RegisterPage;
