import React, { useState, useContext, useEffect } from "react";
import "./LoginPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../config/UserConfig.js"; 
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State để lưu lỗi nếu có
  const navigate = useNavigate();
  const { handleLogin, user } = useContext(AuthContext);

  useEffect(() => {
    if(user) {
      navigate("/home");
      return;
    }
  }, [user]);

  const handleLoginData = async (e) => {
    e.preventDefault();
    setError(""); // Reset lỗi trước mỗi lần đăng nhập
    const loginData = { username, password };
    try {
      const token = await login(loginData);
      console.log(token);
      if (token) {
        const statusEmployee = await handleLogin(token);
        if(statusEmployee) {
          navigate("/admin/account");
        }
        else {
          navigate("/home");
        }
      }
      else {
        setError("Tên đăng nhập hoặc mật khẩu không hợp lệ!");
      }
    } catch (error) {
      console.error("Error login api: ", error);
      return;
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
        <form onSubmit={handleLoginData}>
          <div className="form-group">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} /> Email
            </label>
            <input
              type="email"
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <button className="login-button">
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
