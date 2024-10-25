import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 LAL Cinemas. All rights reserved.</p>
      <div className="footer-links">
        <Link to="/privacy-policy">Chính sách bảo mật</Link>
        <Link to="/terms-of-use">Điều khoản sử dụng</Link>
        <Link to="/contact">Liên hệ</Link>
      </div>
    </footer>
  );
};

export default Footer;
