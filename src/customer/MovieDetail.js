import React, { useEffect, useState } from "react";
import "./MovieDetail.css";
import { useLocation } from "react-router-dom";
import { getMovieById } from "../config/MovieConfig.js";

const MovieDetail = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const [movie, setMovie] = useState(null);
  const [image, setImage] = useState("");
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieById(id); // Gọi API lấy phim theo id
        console.log(response.data);
        setMovie(response.data); // Lưu dữ liệu phim vào state
        const image_true = response.data.image?.find(
          (img) => img.type === true
        );
        // setImage(image_true);
        console.log(image_true);
        setImage(image_true.link);
      } catch (error) {
        console.error(error);
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
            <img src={image} alt="" />
          </div>
          <div className="movie-description">
            <h1>{movie.title}</h1>
            <p>Mô tả: {movie.description}</p>
            <p>
              Định dạng: <span className="highlight">2D</span>
            </p>
            <p>
              Diễn viên: {movie.cast}
            </p>
            <p>
              Đạo diễn: {movie.director}
            </p>
            <p>
              Thể loại:{" "}
              <span className="highlight">
                {movie.genre?.map((actor) => actor.name).join(", ")}
              </span>
            </p>
            <p>Thời lượng: {movie.duration} phút</p>
            <p>Ngôn ngữ: {movie.language?.name}</p>
            <p>Ngày khởi chiếu: {movie.releaseDate}</p>
          </div>
        </section>
        <section className="trailer-section">
          <h2>TRAILER</h2>
          <div className="trailer-placeholder">
            <iframe
              width="100%"
              height="315"
              src={movie.trailer?.link}
              title="Trailer Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>
        {/* <section className="comments-section">

          <h3>{movie.feedback?.length || 0} comments</h3>

          {movie.feedback.length > 0 ? (
            <div className="comment">
              <p>
                <strong>Ng Anh</strong>: Hay cực!!
              </p>
            </div>
          ) : ('')};

        </section> */}
        {/* <section className="showtime-section">
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
        </section> */}
      </main>
    </div>
  );
};

export default MovieDetail;
