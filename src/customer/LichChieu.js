import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getMovieNow, getMovieSoon } from "../config/MovieConfig.js";
import { useNavigate } from "react-router-dom";
import { TheaterContext } from "../context/TheaterContext.js";

import {
  faAngleLeft,
  faAngleRight,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllNameTheater } from "../config/TheaterConfig.js";

const LichChieu = () => {
  const navigate = useNavigate();
  const [theaters, setTheaters] = useState([]);
  const [theater, setTheater] = useState([]);
  const { selectedTheater, setSelectedTheater } = useContext(TheaterContext);
  const [movienows, setMovieNow] = useState([]);
  const [movie, setMovie] = useState([]);
  const [listDay, setListDay] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState("");
  const maxDaysToShow = 5;
  const [showtime, setShowtime] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchMovieNow = async () => {
      try {
        const response = await getMovieNow();
        setMovieNow(response.data);
        const response_theater = await getAllNameTheater();
        setTheaters(response_theater.data);

        const selectedTheaterData = response_theater.data.find(
          (entry) => entry.id === Number(selectedTheater)
        );

        if (selectedTheaterData) {
          setTheater(selectedTheaterData);
        } else {
          console.warn("Rạp được chọn không tồn tại:", selectedTheater);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách Phim:", error);
      }
    };
    fetchMovieNow(); // Gọi hàm fetchTheater khi component được render lần đầu
  }, []); // Đóng ngoặc vuông để hoàn tất dependency array và gọi chỉ khi component render lần đầu

  const handleSelectTheater = (theater) => {
    setTheater(theater);
    setSelectedTheater(theater.id);
  };
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

  const [showScheduleModal, setScheduleModal] = useState(false);

  const handleScheduleModal = (id) => {
    const movie = movienows.find((movie) => movie.id === id);
    const listDay = [];
    const showtime = movie.showtime.reduce((acc, show) => {
      if (show.theaterID === Number(selectedTheater)) {
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
    setSelectedDay(listDay[0]);
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
    navigate("/seat-selection", {
      state: { id: showtimeid, theaterid: selectedTheater },
    });
  };
  const [isNowMoviesVisible, setIsNowMoviesVisible] = useState(false); // Quản lý phim đang chiếu
  const [isSoonMoviesVisible, setIsSoonMoviesVisible] = useState(false); // Quản lý phim sắp chiếu

  const toggleNowMovies = () => {
    setIsNowMoviesVisible(!isNowMoviesVisible);
  };

  const toggleSoonMovies = () => {
    setIsSoonMoviesVisible(!isSoonMoviesVisible);
  };

  return (
    <div className="homepage">
      <section className="movie-section">
        <div className="section-title" onClick={toggleNowMovies}>
          <h2>PHIM ĐANG CHIẾU {isNowMoviesVisible ? "▼" : "▶"}</h2>
        </div>
        {isNowMoviesVisible && (
          <div className="movie-list">
            {movienows.length > 0 ? (
              movienows
                .filter((movienow) => movienow.status === true)
                .map((movienow) => (
                  <div className="movie-item" key={movienow.id}>
                    <div className="image-container">
                      <Link
                        to="/movie-detail"
                        state={{ id: movienow.id, theaterid: selectedTheater }}
                      >
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
                      <Link
                        to="/movie-detail"
                        state={{ id: movienow.id, theaterid: selectedTheater }}
                      >
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
        )}
        <div className="section-title" onClick={toggleSoonMovies}>
          <h2>PHIM SẮP CHIẾU {isSoonMoviesVisible ? "▼" : "▶"}</h2>
        </div>
        {isSoonMoviesVisible && (
          <div className="movie-list">
            {moviesoons
              .filter((moviesoon) => moviesoon.status === true)
              .map((moviesoon, index) => (
                <div className="movie-item" key={moviesoon.id}>
                  <div className="image-container">
                    <Link
                      to="/movie-detail"
                      state={{ id: moviesoon.id, theaterid: selectedTheater }}
                    >
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
                    <Link
                      to="/movie-detail"
                      state={{ id: moviesoon.id, theaterid: selectedTheater }}
                    >
                      {moviesoon.title}
                    </Link>
                  </h3>
                </div>
              ))}
          </div>
        )}
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
export default LichChieu;
