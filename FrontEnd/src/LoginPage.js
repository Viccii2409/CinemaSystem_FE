import React, { useState } from 'react';
import './LoginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import PasswordRecovery from './PasswordRecovery';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordRecovery, setShowPasswordRecovery] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <div className="tabs">
          <button className="active-tab">ĐĂNG NHẬP</button>
          <button><Link to="/register-page">ĐĂNG KÝ</Link></button>
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
          <Link onClick={() => setShowPasswordRecovery(true)}  className="forgot-password">Quên mật khẩu?</Link>
          <button type="submit" className="login-button">Đăng nhập</button>
        </form>
        <div className="social-login">
          <p>Đăng nhập bằng</p>
          <div className="social-login-buttons">
            <button className="social-login-button facebook">F</button>
            <button className="social-login-button google">G</button>
          </div>
        </div>
      </div>

      {showPasswordRecovery && <PasswordRecovery onClose={() => setShowPasswordRecovery(false)} />}
    </div>
  );
};

export default LoginPage;
