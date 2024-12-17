import React, { useEffect, useState } from "react";
import "./MovieDetail.css";
import { useLocation } from "react-router-dom";
import { getMovieDetails } from "../config/MovieConfig.js";
import "@fortawesome/fontawesome-free/css/all.min.css"; 

const MovieDetail = () => {
  const location = useLocation();
  const { id } = location.state || {}; 
  const [movie, setMovie] = useState(null);
  const [image, setImage] = useState(""); 
  const [feedbacks, setFeedbacks] = useState([]); 

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieDetails(id);
        console.log("Dữ liệu trả về từ API: ", response); 
    
        if (response) {
          if (response.image && Array.isArray(response.image)) {
            const image_true = response.image.find((img) => img.type === true);
            setImage(image_true ? image_true.link : ""); 
          } else {
            console.log("Không có trường 'image' hoặc 'image' không phải là mảng.");
            setImage(""); 
          }
    
          setMovie(response); 
          setFeedbacks(response.feedback || []); 
        } else {
          console.error("Dữ liệu trả về từ API không hợp lệ.");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
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
                      return <i key={index} className="fas fa-star"></i>; 
                    } else if (movie.rating >= ratingThreshold - 0.5) {
                      return <i key={index} className="fas fa-star-half-alt"></i>; 
                    } else {
                      return <i key={index} className="far fa-star"></i>; 
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
                      className={`fa-star ${feedback.star > index ? 'fas' : 'far'}`}
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
