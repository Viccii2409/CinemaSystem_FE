import React, { useEffect, useState } from "react";
import "./MovieDetail.css";
import { useLocation } from "react-router-dom";
import { getMovieById } from "../config/MovieConfig.js";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import FontAwesome CS


const MovieDetail = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const [movie, setMovie] = useState(null);
  const [image, setImage] = useState("");
  const [feedbacks, setFeedbacks] = useState([]); // Declare feedbacks state

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieById(id); // Gọi API lấy phim theo id
        console.log(response.data);
        setMovie(response.data); // Lưu dữ liệu phim vào state

        // Lấy ảnh phim
        const image_true = response.data.image?.find(
          (img) => img.type === true
        );
        setImage(image_true ? image_true.link : ""); // Set image link

        // Set feedbacks
        setFeedbacks(response.data.feedback || []); // If no feedback, use empty array
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
            <img src={image} alt={movie.title} />
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
            {/* <p className="movie-rating">
              Đánh giá: {movie.rating ? `${movie.rating} sao` : "Chưa có đánh giá"}
            </p> */}
            <p className="movie-rating">
              Đánh giá: 
              {movie.rating ? (
                <>
                  {Array.from({ length: 5 }, (_, index) => {
                    const ratingThreshold = index + 1;
                    if (movie.rating >= ratingThreshold) {
                      return <i key={index} className="fas fa-star"></i>; // Sao đầy
                    } else if (movie.rating >= ratingThreshold - 0.5) {
                      return <i key={index} className="fas fa-star-half-alt"></i>; // Nửa sao
                    } else {
                      return <i key={index} className="far fa-star"></i>; // Sao rỗng
                    }
                  })}
                </>
              ) : (
                "Chưa có đánh giá"
              )}
            </p>
          </div>
        </section>

        {/* Trailer Section */}
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

        {/* Feedback Section */}
        <section className="feedback-section">
          <h2>Bình luận</h2>
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <div key={feedback.id} className="feedback">
                <p>
                  <strong>{feedback.user.name}</strong>
                </p>
                <p className="feedback-text">
                {feedback.text}
                </p>
                <p>
                  <span>Đánh giá: </span>
                  {Array.from({ length: 5 }, (_, index) => (
                    <i
                      key={index}
                      className={`fa-star ${feedback.rating?.star > index ? 'fas' : 'far'}`}
                    ></i>
                  ))}
                </p>
                <p>
                  <em>{new Date(feedback.date).toLocaleDateString()}</em>
                </p>

              </div>
            ))
          ) : (
            <p>Chưa có bình luận.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default MovieDetail;
