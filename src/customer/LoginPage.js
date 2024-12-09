import React, { useState, useContext, useEffect } from "react";
import "./LoginPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../config/UserConfig.js"; // Cấu hình để gọi API đăng nhập

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State để lưu lỗi nếu có
  const navigate = useNavigate();

  // Hàm kiểm tra xem người dùng đã đăng nhập hay chưa
  const checkLoggedIn = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      return parsedUser;
    }
    return null;
  };

  useEffect(() => {
    const loggedInUser = checkLoggedIn();
    if (loggedInUser) {
      // Nếu người dùng đã đăng nhập, điều hướng đến trang home
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset lỗi trước mỗi lần đăng nhập

    try {
      const loginData = { email, password }; // Dữ liệu gửi tới API
      const response = await login(loginData); // Gọi API đăng nhập

      if (response?.user_type) {
        // Lưu thông tin người dùng vào localStorage
        const userData = {
          email: response.email,
          password: response.password,
          name: response.name || "Người dùng",
          address: response.address,
          phone: response.phone,
          dob: response.dob,
          gender: response.gender,
          user_type: response.user_type,
        };
        localStorage.setItem("user", JSON.stringify(userData)); // Lưu thông tin người dùng vào localStorage

        // Điều hướng người dùng sau khi đăng nhập thành công
        if (response.user_type === "CUSTOMER") {
          navigate("/home");
        } else {
          navigate("/admin");
        }
      } else {
        setError("Phản hồi từ máy chủ không hợp lệ.");
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      setError("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <div className="tabs">
          <button className="active-tab">ĐĂNG NHẬP</button>
          <button>
            <Link to="/register-page">ĐĂNG KÝ</Link>
          </button>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} /> Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}{" "}
          {/* Hiển thị lỗi */}
          <button type="submit" className="login-button">
            Đăng nhập
          </button>
        </form>
        <div className="social-login">
          <p>Đăng nhập bằng</p>
          <div className="social-login-buttons">
            <button className="social-login-button facebook">F</button>
            <button className="social-login-button google">G</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
