import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./TheLoai.css";
import { TheaterContext } from "../context/TheaterContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { faAngleRight, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import {
  getMovieNow,
  getMovieSoon,
  getAllGenres,
} from "../config/MovieConfig.js";
import { getAllNameTheater } from "../config/TheaterConfig.js";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { selectedTheater } = useContext(TheaterContext);
  const [movienows, setMovieNow] = useState([]);
  const [movie, setMovie] = useState([]);
  const [listDay, setListDay] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState("");
  const maxDaysToShow = 5;
  const [showtime, setShowtime] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const fetchMovieNow = async () => {
      try {
        const response = await getMovieNow();
        setMovieNow(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách Phim:", error);
      }
    };
    fetchMovieNow(); // Gọi hàm fetchTheater khi component được render lần đầu
  }, []); // Đóng ngoặc vuông để hoàn tất dependency array và gọi chỉ khi component render lần đầu
  const [moviesoons, setMovieSoon] = useState([]);
  useEffect(() => {
    const fetchMovieSoon = async () => {
      try {
        const response = await getMovieSoon();
        setMovieSoon(response.data); // Lưu dữ liệu vào state cinemas
      } catch (error) {
        console.error("Lỗi khi lấy danh sách Phim:", error);
      }
    };
    fetchMovieSoon(); // Gọi hàm fetchTheater khi component được render lần đầu
  }, []);
  const [filteredMoviesNow, setFilteredMoviesNow] = useState([]);
  const [filteredMoviesSoon, setFilteredMoviesSoon] = useState([]);
  useEffect(() => {
    const filterMoviesByGenre = () => {
      const filterNow = movienows.filter((movie) =>
        movie.genre.some((genre) => genre.name === selectedGenre)
      );
      const filterSoon = moviesoons.filter((movie) =>
        movie.genre.some((genre) => genre.name === selectedGenre)
      );
      setFilteredMoviesNow(filterNow);
      setFilteredMoviesSoon(filterSoon);
    };

    filterMoviesByGenre();
  }, [selectedGenre, movienows, moviesoons]); // Chạy khi selectedGenre, movieNow hoặc movieSoon thay đổi

  useEffect(() => {
    fetchGenres();
  }, []);
  const fetchGenres = async () => {
    try {
      const response = await getAllGenres();
      setGenres(response);
      // Set thể loại đầu tiên là mặc định
      if (response.length > 0) {
        setSelectedGenre(response[0].name); // Chọn thể loại đầu tiên
      }
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };
  const [showScheduleModal, setScheduleModal] = useState(false);

  const handleScheduleModal = (id) => {
    if (selectedTheater === null) {
      alert("Bạn chưa chọn rạp!");
      return;
    }
    const movie = movienows.find((movie) => movie.id === id);
    const listDay = [];
    const showtime = movie.showtime.reduce((acc, show) => {
      if (show.theaterID === selectedTheater.id) {
        const timeObj = {
          startTime: show.startTime,
          endTime: show.endTime,
          id: show.id,
          emptySeat: show.emptySeat,
          typeRoomName: show.typeRoomName,
        };

        // Thêm ngày vào listDay nếu chưa có
        if (!listDay.includes(show.date)) {
          listDay.push(show.date);
        }

        const existingDay = acc.find((item) => item.day === show.date);
        if (existingDay) {
          existingDay.times.push(timeObj);
        } else {
          acc.push({ day: show.date, times: [timeObj] });
        }
      }
      return acc;
    }, []);
    setMovie(movie);
    setListDay(listDay);
    setShowtime(showtime);
    setScheduleModal(true);
  };

  const handleCloseModal = () => {
    setScheduleModal(false);
  };

  const handlePrevClick = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNextClick = () => {
    if (startIndex + maxDaysToShow < listDay.length)
      setStartIndex(startIndex + 1);
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  const handleShowtimeSelect = (showtimeid) => {
    console.log(showtimeid);
    navigate("/seat-selection", { state: { id: showtimeid } });
  };

  return (
    <div className="theloai">
      <section className="selector">
        {/* Hiển thị các thể loại */}
        {genres.map((genre) => (
          <div key={genre.id}>
            <h3
              className={selectedGenre === genre.name ? "selected" : ""}
              onClick={() => setSelectedGenre(genre.name)}
            >
              {genre.name}
              <FontAwesomeIcon icon={faAngleRight} className="control-icon" />
            </h3>
          </div>
        ))}
      </section>

      <section className="movie-section">
        <div className="section-title">
          <h2>PHIM ĐANG CHIẾU</h2>
        </div>

        <div className="movie-list">
          {filteredMoviesNow.length > 0 ? (
            filteredMoviesNow
              .filter((movienow) => movienow.status === true)
              .map((movienow) => (
                <div className="movie-item" key={movienow.id}>
                  <div className="image-container">
                    <Link to="/movie-detail" state={{ id: movienow.id }}>
                      <img
                        src={movienow.image}
                        alt="movie"
                        className="movie-thumbnail"
                      />
                    </Link>
                    <button className="iconPause">
                      <FontAwesomeIcon
                        icon={faCirclePlay}
                        className="control-icon"
                      />
                    </button>
                    <button
                      className="buy-ticket-button"
                      onClick={() => handleScheduleModal(movienow.id)}
                    >
                      MUA VÉ NGAY
                    </button>
                  </div>
                  <h3 className="movietitle">
                    <Link to="/movie-detail" state={{ id: movienow.id }}>
                      {movienow.title}
                    </Link>
                  </h3>
                </div>
              ))
          ) : (
            <tr>
              <td colSpan="7">Không có phim nào</td>
            </tr>
          )}
        </div>

        <div className="section-title">
          <h2>PHIM SẮP CHIẾU</h2>
        </div>
        <div className="movie-list">
          {filteredMoviesSoon.length > 0 ? (
            filteredMoviesSoon
              .filter((moviesoon) => moviesoon.status === true)
              .map((moviesoon, index) => (
                <div className="movie-item" key={moviesoon.id}>
                  <div className="image-container">
                    <Link to="/movie-detail" state={{ id: moviesoon.id }}>
                      <img
                        src={moviesoon.image}
                        alt="movie"
                        className="movie-thumbnail"
                      />
                    </Link>
                    <button className="iconPause">
                      <FontAwesomeIcon
                        icon={faCirclePlay}
                        className="control-icon"
                      />
                    </button>
                  </div>

                  <h3 className="movietitle">
                    <Link to="/movie-detail" state={{ id: moviesoon.id }}>
                      {moviesoon.title}
                    </Link>
                  </h3>
                </div>
              ))
          ) : (
            <tr>
              <td colSpan="7">Không có phim nào</td>
            </tr>
          )}
        </div>
      </section>

      {showScheduleModal && (
        <div class="showtime-overlay">
          <div class="showtime-modal">
            <button class="close-button" onClick={handleCloseModal}>
              &times;
            </button>
            <h2>
              LỊCH CHIẾU - <span class="movie-title">{movie.title}</span>
            </h2>
            <h3>{selectedTheater.name}</h3>
            <div class="date-tabs">
              {listDay.length > 0 ? (
                <div className="days-list-container">
                  <button onClick={handlePrevClick} disabled={startIndex === 0}>
                    &lt;
                  </button>
                  {listDay.map((day) => (
                    <button
                      key={day}
                      onClick={() => handleDaySelect(day)}
                      className={`date-tab ${
                        selectedDay === day ? "active" : ""
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                  <button
                    onClick={handleNextClick}
                    disabled={startIndex + maxDaysToShow >= listDay.length}
                  >
                    &gt;
                  </button>
                </div>
              ) : (
                <p>Không có ngày chiếu</p>
              )}
            </div>
            <div class="showtime-list">
              <div class="showtime-item">
                {showtime
                  .filter((showtime) => showtime.day === selectedDay)
                  .flatMap((showtime) => showtime.times)
                  .sort((a, b) => a.startTime.localeCompare(b.startTime))
                  .map((showtime, index) => (
                    <div class="time-slot">
                      <button
                        key={index}
                        className="time-button"
                        onClick={() => handleShowtimeSelect(showtime.id)}
                      >
                        {showtime.startTime} - {showtime.typeRoomName}
                      </button>
                      <span class="seats-info">
                        {showtime.emptySeat} ghế trống
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default HomePage;
