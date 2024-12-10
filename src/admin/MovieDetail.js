import React, { useEffect, useState } from "react";
import "./MovieDetail.css";
import { useLocation } from "react-router-dom";
import { getMovieById } from "../config/MovieConfig.js";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import FontAwesome CSS

const MovieDetail = () => {
  const location = useLocation();
  const { id } = location.state || {}; // Lấy id từ params (trường hợp không có, mặc định là undefined)
  const [movie, setMovie] = useState(null);
  const [image, setImage] = useState(""); // Trạng thái lưu ảnh
  const [feedbacks, setFeedbacks] = useState([]); // Feedbacks

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieById(id);
        console.log("Dữ liệu trả về từ API: ", response); // Kiểm tra toàn bộ response
    
        // Trực tiếp sử dụng response mà không cần truy cập data
        if (response) {
          // Kiểm tra trường 'image'
          if (response.image && Array.isArray(response.image)) {
            const image_true = response.image.find((img) => img.type === true);
            setImage(image_true ? image_true.link : ""); // Set ảnh nếu có
          } else {
            console.log("Không có trường 'image' hoặc 'image' không phải là mảng.");
            setImage(""); // Nếu không có ảnh, set link rỗng
          }
    
          setMovie(response); // Lưu toàn bộ dữ liệu vào state
          setFeedbacks(response.feedback || []); // Lưu feedbacks từ response
        } else {
          console.error("Dữ liệu trả về từ API không hợp lệ.");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchMovie();
  }, [id]); // Chạy lại useEffect khi id thay đổi

  if (!movie) return <p>Đang tải thông tin phim...</p>; // Nếu dữ liệu chưa được tải, hiển thị loading

  return (
    <div className="movie-detail">
      <main className="movie-detail-main">
        <section className="movie-info" key={movie.id}>
          <div className="movie-poster">
            {/* Kiểm tra xem có hình ảnh không, nếu không có sẽ hiển thị ảnh mặc định */}
            <img src={movie.image || "default_image_path.jpg"} alt={movie.title || "Movie Poster"} />
          </div>
          <div className="movie-description">
            <h1>{movie.title}</h1>
            <p>Mô tả: {movie.description}</p>
            <p>
              Diễn viên: {movie.cast || "Thông tin diễn viên chưa có"}
            </p>
            <p>
              Đạo diễn: {movie.director || "Thông tin đạo diễn chưa có"}
            </p>
            <p>
              Thể loại:{" "}
              <span className="highlight">
                {movie.genre?.map((actor) => actor.name).join(", ") || "Chưa có thể loại"}
              </span>
            </p>
            <p>Thời lượng: {movie.duration || "Thông tin thời lượng chưa có"} phút</p>
            <p>Ngôn ngữ: {movie.language?.name || "Chưa có thông tin ngôn ngữ"}</p>
            <p>Ngày khởi chiếu: {movie.releaseDate || "Chưa có ngày khởi chiếu"}</p>
            <p className="movie-rating">
              Đánh giá:{" "}
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
          {movie.trailer? (
            <div className="trailer-placeholder">
              <iframe
                width="100%"
                height="315"
                src={movie.trailer}
                title="Trailer Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p>Trailer chưa có.</p>
          )}
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
                <p className="feedback-text">{feedback.text}</p>
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
