import React, { useEffect, useState } from "react";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import { getMovieById } from "../Api.js";

const MovieDetail = () => {
  const { id } = useParams(); // lấy id từ URL
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieById(id); // Gọi API lấy phim theo id
        setMovie(response.data); // Lưu dữ liệu phim vào state
      } catch (error) {
        console.error("response.data");
      }
    };
    fetchMovie();
  }, [id]);
  if (!movie) return <p>Đang tải thông tin phim...</p>;

  return (
    <div className="movie-detail">
      <main className="movie-detail-main">
        <section className="movie-info" key={movie.id}>
          <div className="movie-poster">
            <img src={movie.link} alt="Wukong" />
          </div>
          <div className="movie-description">
            <h1>{movie.title}</h1>
            <p>Mô tả</p>
            <p>Phân loại:</p>
            <p>
              Định dạng: <span className="highlight">2D</span>
            </p>
            <p>Diễn viên: {movie.cast?.name}</p>
            <p>
              Thể loại: <span className="highlight">{movie.genre?.name}</span>
            </p>
            <p>Thời lượng: {movie.duration} phút</p>
            <p>Ngôn ngữ: {movie.language.name}</p>
            <p>Ngày khởi chiếu: {movie.release_date}</p>
          </div>
        </section>
        <section className="trailer-section">
          <h2>TRAILER</h2>
          <div className="trailer-placeholder"></div>
        </section>
        <section className="comments-section">
          <h3>1 comments</h3>
          <div className="comment">
            <p>
              <strong>Ng Anh</strong>: Hay cực!!
            </p>
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
