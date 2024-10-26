import React, { useState } from 'react';
import './PasswordRecovery.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const PasswordRecovery = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [captcha, setCaptcha] = useState('53860'); // Example captcha
  const [captchaInput, setCaptchaInput] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCaptchaInputChange = (e) => {
    setCaptchaInput(e.target.value);
  };

  const handleRefreshCaptcha = () => {
    // Generate a new captcha (for simplicity, using a fixed value here)
    setCaptcha(Math.floor(10000 + Math.random() * 90000).toString());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password recovery logic here
    console.log('Email:', email);
    console.log('Captcha Input:', captchaInput);
  };

  return (
    <div className="password-recovery-overlay">
      <div className="password-recovery-modal">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Lấy lại mật khẩu</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group captcha-group">
            <input
              type="text"
              className="captcha-display"
              value={captcha}
              readOnly
            />
            <button type="button" className="refresh-captcha" onClick={handleRefreshCaptcha}>
              <FontAwesomeIcon icon={faSyncAlt} />
            </button>
            <input
              type="text"
              className="captcha-input"
              value={captchaInput}
              onChange={handleCaptchaInputChange}
              placeholder="Mã xác thực"
              required
            />
          </div>
          <button type="submit" className="confirm-button">Xác nhận</button>
        </form>
      </div>
    </div>
  );
};


export default PasswordRecovery;