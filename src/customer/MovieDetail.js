import React, { useEffect, useState, useContext } from "react";
import "./MovieDetail.css";
import { useNavigate, useLocation } from "react-router-dom";
import { TheaterContext } from "../context/TheaterContext.js";
import { getMovieById, getFeedback } from "../config/MovieConfig.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
const MovieDetail = () => {
  const { selectedTheater, setSelectedTheater } = useContext(TheaterContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { id, theaterid } = location.state || {};
  const [movie, setMovie] = useState(null);
  const [image, setImage] = useState("");
  const [showtime, setShowtime] = useState([]);
  const [feedbacks, setFeedback] = useState([]);
  useEffect(() => {
    if (!theaterid) {
      alert("Bạn chưa chọn rạp!");
      navigate("/home");
      return;
    }

    if (!id) {
      console.warn("ID của phim không tồn tại.");
      navigate("/home");
      return;
    }

    const fetchMovie = async () => {
      try {
        if (selectedTheater === null) {
          setSelectedTheater(theaterid);
        }
        const response_movie = await getMovieById(id);
        setMovie(response_movie);
        handleScheduleModal(response_movie, selectedTheater);
        const image_true = response_movie.image.find(
                  (img) => img.type === true
                );
                setImage(image_true || "");
      } catch (error) {
        console.error(error);
      }
    };
    const fetchFeedback = async () => {
      try {
        if (selectedTheater === null) {
          setSelectedTheater(theaterid);
        }
        const response_feedback = await getFeedback(id);
        setFeedback(response_feedback);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovie();
    fetchFeedback();
  }, [id, selectedTheater, navigate]);

  useEffect(() => {
    console.log(selectedTheater);
  }, [selectedTheater]);

  const handleScheduleModal = (movieData, theaterid) => {
    const schedule = movieData.showtime
      .filter((show) => show.theaterID === Number(theaterid))
      .map((show) => ({
        day: show.date,
        startTime: show.startTime,
        endTime: show.endTime,
        id: show.id,
        emptySeat: show.emptySeat,
        typeRoomName: show.typeRoomName,
      }))
      .sort(
        (a, b) =>
          new Date(a.day + "T" + a.startTime) -
          new Date(b.day + "T" + b.startTime)
      );

    const groupedSchedule = schedule.reduce((acc, show) => {
      if (!acc[show.day]) acc[show.day] = [];
      acc[show.day].push(show);
      return acc;
    }, {});

    setShowtime(groupedSchedule);
  };

  const handleShowtimeSelect = (showtimeid) => {
    console.log(showtimeid);
    navigate("/seat-selection", {
      state: { id: showtimeid, theaterid: theaterid },
    });
  };

  if (!movie) return <p>Đang tải thông tin phim...</p>;

  return (
    <div className="movie-detail">
      <main className="movie-detail-main">
        <section className="movie-info" key={movie.id}>
          <div className="movie-poster">
            <img src={movie.image} alt={movie.title} />
          </div>
          <div className="movie-description">
            <h1>{movie.title}</h1>
            <p>Mô tả: {movie.description}</p>
            {/* <p>Định dạng: <span className="highlight">2D</span></p> */}
            <p>Diễn viên: {movie.cast}</p>
            <p>Đạo diễn: {movie.director}</p>
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
              src={movie.trailer}
              title="Trailer Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>
        <section className="showtime-section">
          <h2>LỊCH CHIẾU</h2>
          {Object.keys(showtime).length > 0 ? (
            <div className="showtime-list">
              {Object.entries(showtime).map(([day, times], index) => (
                <div key={index} className="showtime-day">
                  <h3 className="showtime-day-title">Ngày: {day}</h3>
                  <div className="showtime-times">
                    {times.map((show, idx) => (
                      <div key={idx} className="time-slot">
                        <button
                          className="time-button"
                          onClick={() => handleShowtimeSelect(show.id)}
                        >
                          {show.startTime} - {show.typeRoomName}
                        </button>
                        <span className="seats-info">
                          {show.emptySeat} ghế trống
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Không có lịch chiếu cho phim này.</p>
          )}
        </section>
        
        {/* Feedback Section */}
        <section className="feedback-section">
          <h2>Bình luận</h2>
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <div key={feedback.id} className="feedback">
                <p>
                  <strong>{feedback.booking.nameCustomer}</strong>
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
