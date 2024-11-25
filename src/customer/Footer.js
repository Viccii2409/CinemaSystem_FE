// Footer.js
import React from "react";
import "./Footer.css"; // Import CSS cho footer
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="homepage-footer">
      <div className="footer-container">
        {/* Logo và mô tả */}
        <div className="footer-section about">
          <h2>LAL CINEMA</h2>
          <p>Trải nghiệm điện ảnh đỉnh cao với chất lượng phục vụ tuyệt vời tại LAL Cinema.</p>
        </div>

        {/* Liên kết nhanh */}
        <div className="footer-section quick-links">
          <h2>Liên Kết Nhanh</h2>
          <ul>
            <li><Link to="/">Trang Chủ</Link></li>
            <li><Link to="/cinema-system">Hệ Thống Rạp</Link></li>
            <li><Link to="/">Lịch Chiếu</Link></li>
            <li><Link to="/">Ưu Đãi</Link></li>
            <li><Link to="/">Liên Hệ</Link></li>
          </ul>
        </div>

        {/* Thông tin liên hệ */}
        <div className="footer-section contact">
          <h2>Liên Hệ</h2>
          <p>Địa chỉ: 123 Phố Điện Ảnh, TP. Hà Nội</p>
          <p>Email: support@lalcinema.vn</p>
          <p>Hotline: (024) 1234 5678</p>
        </div>

        {/* Mạng xã hội */}
        <div className="footer-section social-media">
          <h2>Kết Nối Với Chúng Tôi</h2>
          <div className="social-icons">
            <Link to="/"><FontAwesomeIcon icon={faFacebookF} /></Link>
            <Link to="/"><FontAwesomeIcon icon={faInstagram} /></Link>
            <Link to="/"><FontAwesomeIcon icon={faTwitter} /></Link>
            <Link to="/"><FontAwesomeIcon icon={faYoutube} /></Link>
          </div>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="footer-bottom">
        <p>&copy; 2024 LAL Cinema. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
