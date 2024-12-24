import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { TheaterContext } from "../context/TheaterContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import {
  faAngleLeft,
  faAngleRight,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";
import {
  getMovieNow,
  getMovieSoon,
  getSlideshow,
  getAllGenres, 
  getTopMovies,
} from "../config/MovieConfig.js";
import { getAllNameTheater } from "../config/TheaterConfig.js";
import { getRecommendMovie } from "../config/UserConfig.js";
import { getAllDiscount } from "../config/TicketConfig.js";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
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
  const [selectedGenre, setSelectedGenre] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    filterMoviesByGenre();
  }, [selectedGenre]);
  useEffect(() => {
    const fetchMovieNow = async () => {
      try {
        const response = await getMovieNow();
        setMovieNow(response.data);
        setFilteredMovies(
          response.data.map((movie) => ({
            ...movie,
            genre: Array.isArray(movie.genres) ? movie.genres : [], // Normalize genre
          }))
        );
        const response_theater = await getAllNameTheater();
        setTheaters(response_theater);

        const selectedTheaterData = response_theater.data.find(
          entry => entry.id === Number(selectedTheater)
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
  }

  const filterMoviesByGenre = () => {
    if (selectedGenre) {
      setFilteredMovies(
        movienows.filter((movie) =>
          movie.genres.some((genre) => genre.name === selectedGenre)
        )
      );
    } else {
      setFilteredMovies(movienows);
    }
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

  // top movies
  const [topmovies, setTopMovies] = useState([]);
  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await getTopMovies();
        console.log("response" , response);
        setTopMovies(response); 
      } catch (error) {
        console.error("Lỗi khi lấy danh sách Phim:", error);
      }
    };
    fetchTopMovies(); 

  }, []);

  const [discounts, setDiscounts] = useState([]);
  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await getAllGenres();
      setGenres(response);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };
  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await getAllDiscount();
        setDiscounts(response); // Lưu dữ liệu vào state cinemas
      } catch (error) {
        console.error("Lỗi khi lấy danh sách Ưu đãi:", error);
      }
    };

    fetchDiscount(); // Gọi hàm fetchTheater khi component được render lần đầu
  }, []); // Đóng ngoặc vuông để hoàn tất dependency array và gọi chỉ khi component render lần đầu
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
    navigate("/seat-selection", { state: { id: showtimeid, theaterid : selectedTheater } });
  };

  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentSlide] = useState(0);
  useEffect(() => {
    const fetchSlide = async () => {
      try {
        const response = await getSlideshow();
        setSlides(response.data); // Lưu dữ liệu vào state cinemas
      } catch (error) {
        console.error("Lỗi khi lấy danh sách slide:", error);
      }
    };

    fetchSlide(); // Gọi hàm fetchTheater khi component được render lần đầu
  }, []);

  // Chuyển slide mỗi 3 giây
  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides]);

  const [showDiscountModal, setDiscountModal] = useState(false);
  const [selectedDiscountId, setSelectedDiscountId] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const handleDiscountModal = (id) => {
    const selected = discounts.find((discount) => discount.id === id);
    setSelectedDiscount(selected);
    setSelectedDiscountId(id);
    setDiscountModal(true);
  };

  const closeDiscountModal = () => {
    setDiscountModal(false);
    setSelectedDiscountId(null);
    setSelectedDiscount(null);
  };
  // Gợi ý phim yêu thích
  const { user, loading } = useContext(AuthContext);
  const [recoms, setRecom] = useState([]);

  useEffect(() => {
    const fetchRecom = async () => {
      try {
        if (loading) {
          console.log("User data is still loading...");
          return; // Chờ `loading` hoàn tất
        }

        if (!user || !user.id) {
          console.error("User is not defined or does not have an ID.");
          return;
        }

        // Gọi API lấy danh sách phim
        const data = await getRecommendMovie(user.id);

        if (data && Array.isArray(data)) {
          setRecom(data); // Cập nhật state
        } else {
          console.error(
            "No recommended movies found or data format is incorrect."
          );
        }
      } catch (error) {
        console.error("Error fetching recommended movies:", error);
      }
    };

    fetchRecom();
  }, [user, loading]);

  return (
    <div className="homepage">
      <div className="slideshow">
        {slides.length > 0 && (
          <img src={slides[currentIndex].url} alt="slideshow" />
        )}
        <div className="slideshow-controls">
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="control-icon"
            onClick={() =>
              setCurrentSlide(
                currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1
              )
            }
          />
          <FontAwesomeIcon
            icon={faAngleRight}
            className="control-icon"
            onClick={() => setCurrentSlide((currentIndex + 1) % slides.length)}
          />
        </div>
      </div>

      <section className="movie-section">
        <div className="section-title">
          <h2>PHIM ĐANG CHIẾU</h2>
        </div>
        <select
          className="selector"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">Tất cả</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
        <div className="movie-list">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movienow) => (
              <div className="movie-item" key={movienow.id}>
                <div className="image-container">
                  <Link to="/movie-detail" state={{ id: movienow.id, theaterid : selectedTheater }}>
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
                  <Link to="/movie-detail" state={{ id: movienow.id, theaterid : selectedTheater }}>
                    {movienow.title}
                  </Link>
                </h3>
                {/* {movienow.title.length > 18 && (
                <span className="hover-text">{movienow.title}</span>
              )} */}
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
          {moviesoons.map((moviesoon, index) => (
            <div className="movie-item" key={moviesoon.id}>
              <div className="image-container">
                <Link to="/movie-detail" state={{ id: moviesoon.id, theaterid : selectedTheater }}>
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
                <Link to="/movie-detail" state={{ id: moviesoon.id, theaterid : selectedTheater }}>
                  {moviesoon.title}
                </Link>
              </h3>
              {/* {moviesoon.title.length > 18 && (
                <span className="hover-text">{moviesoon.title}</span>
              )} */}
            </div>
          ))}
        </div>

        <div className="section-title">
        <h2>PHIM HOT</h2>
      </div>
      <div className="movie-list">
        {Array.isArray(topmovies) && topmovies.length > 0 ? (
          (() => {
            return topmovies.map((topmovie, index) => (
              <div className="movie-item" key={topmovie.movieId}>
                <div className="image-container">
                  <Link to="/movie-detail" state={{ id: topmovie.movieId, theaterid: selectedTheater }}>
                    <img
                      src={topmovie.movieImage}
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
                  <Link to="/movie-detail" state={{ id: topmovie.movieId, theaterid: selectedTheater }}>
                    {topmovie.movieTitle}
                  </Link>
                </h3>
              </div>
            ));
          })()
        ) : null}  
      </div>
      </section>
      <section id="discount-section" className="promotions-section">
        <div className="category">
          <h2>ƯU ĐÃI</h2>
        </div>
        <div className="promotion-carousel">
          {discounts.map((discount) => (
            <div className="discount-item" key={discount.id}>
              <img
                src={discount.image}
                alt="discount"
                className="discount-image"
                onClick={() => handleDiscountModal(discount.id)}
              ></img>

              <div className="dis-title">
                <h3 onClick={() => handleDiscountModal(discount.id)}>
                  {discount.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showDiscountModal && selectedDiscount && (
        <div className="showtime-overlay2">
          <div className="showtime-modal2">
            <button className="close-button" onClick={closeDiscountModal}>
              &times;
            </button>
            <img
              src={selectedDiscount.image}
              style={{ width: "250px", height: "150px" }}
            />
            <div className="showtime-des">
              <h2>{selectedDiscount.name}</h2>
              <p>{selectedDiscount.description}</p>
            </div>
          </div>
        </div>
      )}


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
                      className={`date-tab ${selectedDay === day ? "active" : ""
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


      {loading ? (
        <div>Loading...</div> // Hiển thị trong lúc chờ tải dữ liệu
      ) : user ? (
        <div className="movie-section">
          {recoms.length > 0 && (
            <>
            <div className="section-title">
            <h2>Gợi ý Phim</h2>
        </div>
              <div className="movie-list">
                {recoms.map((recom) => (
                  <div className="movie-item" key={recom.id}>
                    <div className="image-container">
                      <Link to="/movie-detail" state={{ id: recom.id }}>
                        <img
                          src={recom.image || "placeholder-image.jpg"} // Dùng ảnh placeholder nếu `link` bị null
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
                        onClick={() => handleScheduleModal(recom.id)}
                      >
                        MUA VÉ NGAY
                      </button>
                    </div>
                    <h3 className="movietitle">
                      <Link to="/movie-detail" state={{ id: recom.id }}>
                        {recom.title}
                      </Link>
                    </h3>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        "" // Thông báo nếu chưa đăng nhập
      )}


      {selectedTheater === null && (
        <div className="theater-selector-overlay">
          <div className="theater-selector-modal">
            <h2>Chào mừng quý khách đến với LAL CINEMA</h2>
            <div className="theater-list">
              {theaters.map((theater) => (
                <button
                  key={theater.id}
                  className="theater-button"
                  onClick={() => handleSelectTheater(theater)}
                >
                  {theater.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default HomePage;