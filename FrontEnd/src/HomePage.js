import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  
  const [showScheduleModal, setScheduleModal] = useState(false);

  const handleScheduleModal = () => {
    setScheduleModal(true);
  };

  const handleCloseModal = () => {
    setScheduleModal(false);
  }

    return (
      <div className="homepage">
        <div className="slideshow">
          <p>Slideshow Phim sắp chiếu</p>
        </div>
        <section className="movie-section">
          <div className="section-title">
            <Link to="/">PHIM ĐANG CHIẾU</Link> |
            <Link to="/">PHIM SẮP CHIẾU</Link> |
            <Link to="/">PHIM TOP</Link>
          </div>
          <div className="movie-list">
            <div className="movie-item">
              <img src="movie-placeholder.png" alt="movie" className="movie-thumbnail" />
              <div className="movie-details">
                <h3><Link to="movie-detail">Tên phim</Link></h3>
                <p>Time</p>
                <p>Thể loại</p>
                <p>Đạo diễn</p>
                <p>Diễn viên</p>
                <p>Rated</p>
                <button className="buy-ticket-button" onClick={handleScheduleModal}>Mua vé ngay</button>
              </div>
            </div>
            {[...Array(9)].map((_, index) => (
              <div key={index} className="movie-item-placeholder">
                <div className="movie-thumbnail-placeholder"></div>
              </div>
            ))}
          </div>
        </section>
        <section className="promotions-section">
          <h2>Ưu đãi</h2>
          <div className="promotion-carousel">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="promotion-item"></div>
            ))}
          </div>
        </section>

        {showScheduleModal && (
          <div class="showtime-overlay">
          <div class="showtime-modal">
            <button class="close-button" onClick={handleCloseModal}>&times;</button>
            <h2>LỊCH CHIẾU - <span class="movie-title">Joker: Folie À Deux Điên Có Đôi</span></h2>
            <h3>RẠP LAL MỸ ĐÌNH</h3>
            <div class="date-tabs">
              <button class="date-tab active">10/10</button>
              <button class="date-tab">11/10</button>
            </div>
            <div class="showtime-list">
              <div class="showtime-item">
                <h4>2D</h4>
                <div class="time-slot">
                  <button class="time-button"><Link to="/seat-selection">08:15</Link></button>
                  <span class="seats-info">23 ghế trống</span>
                </div>
                <div class="time-slot">
                  <button class="time-button">09:30</button>
                  <span class="seats-info">41 ghế trống</span>
                </div>
                <div class="time-slot">
                  <button class="time-button">11:05</button>
                  <span class="seats-info">56 ghế trống</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        )}
        
      </div>
    );
  };

  export default HomePage;