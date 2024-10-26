import React from 'react';
import './MovieDetail.css';

const MovieDetail = () => {
  return (
    <div className="movie-detail">
      <main className="movie-detail-main">
        <section className="movie-info">
          <div className="movie-poster">
            <img src="poster-placeholder.png" alt="Wukong" />
          </div>
          <div className="movie-description">
            <h1>WUKONG</h1>
            <p>Mô tả</p>
            <p>Phân loại: <span className="highlight">2D</span></p>
            <p>Định dạng: Hạscdcd</p>
            <p>Diễn viên: Kakakak</p>
            <p>Thể loại: <span className="highlight">Action</span></p>
            <p>Thời lượng: 120 phút</p>
            <p>Ngôn ngữ: Tiếng Anh</p>
            <p>Ngày khởi chiếu: 10/10/2024</p>
          </div>
        </section>
        <section className="trailer-section">
          <h2>TRAILER</h2>
          <div className="trailer-placeholder"></div>
        </section>
        <section className="comments-section">
          <h3>1 comments</h3>
          <div className="comment">
            <p><strong>Ng Anh</strong>: Hay cực!!</p>
          </div>
        </section>
        <section className="showtime-section">
          <h2>LịCH CHIẾU</h2>
          <div className="showtime-info">
            <div className="showtime-list">
              <div className="showtime-item">
                <img src="logo.png" alt="cinema logo" className="cinema-logo" />
                <p>LAL Hà Đông</p>
                <p>Tầng 2, Mac Plaza, Mỗ Lao, Hà Đông, Hà Nội</p>
                <div className="showtime-buttons">
                  <button>15:00 - Phụ đề - 2D</button>
                  <button>18:00 - Phụ đề - 2D</button>
                </div>
              </div>
            </div>
            <div className="calendar">
              <h4>Tháng 10 - 2024</h4>
              <p>Lịch chiếu theo ngày</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MovieDetail;
