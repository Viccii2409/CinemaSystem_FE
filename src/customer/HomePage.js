import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { TheaterContext } from "../TheaterContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import {
  faAngleLeft,
  faAngleRight,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";
import {
  getMovieNow,
  getMovieSoon,
  getDiscount,
  getSlideshow,
} from "../config/MovieConfig.js";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const HomePage = () => {
  const navigate = useNavigate();
  const { selectedTheater } = useContext(TheaterContext);
  const [movienows, setMovieNow] = useState([]);
  const [movie, setMovie] = useState([]);
  const [listDay, setListDay] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState('');
  const maxDaysToShow = 5;
  const [showtime, setShowtime] = useState([]);


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

  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await getDiscount();
        setDiscounts(response.data); // Lưu dữ liệu vào state cinemas
      } catch (error) {
        console.error("Lỗi khi lấy danh sách Ưu đãi:", error);
      }
    };

    fetchDiscount(); // Gọi hàm fetchTheater khi component được render lần đầu
  }, []); // Đóng ngoặc vuông để hoàn tất dependency array và gọi chỉ khi component render lần đầu
  const [showScheduleModal, setScheduleModal] = useState(false);

  const handleScheduleModal = (id) => {
    if (selectedTheater === null) {
      alert("Bạn chưa chọn rạp!");
      return;
    }
    const movie = movienows.find(movie => movie.id === id);
    const listDay = [];
    const showtime = movie.showtime.reduce((acc, show) => {
      if (show.theaterID === selectedTheater.id) {
        const timeObj = { startTime: show.startTime, endTime: show.endTime, id: show.id, emptySeat: show.emptySeat, typeRoomName: show.typeRoomName };

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
    setListDay(listDay)
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
    if (startIndex + maxDaysToShow < listDay.length) setStartIndex(startIndex + 1);
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  const handleShowtimeSelect = (showtimeid) => {
    console.log(showtimeid);
    navigate('/seat-selection', { state: { id: showtimeid } });
  }



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
        <div className="movie-list">
          {movienows.map((movienow) => (
            <div className="movie-item" key={movienow.id}>
              <div className="image-container">
                <Link to="/movie-detail" state={{ id: movienow.id }}>
                  <img
                    src={movienow.link}
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
              {/* {movienow.title.length > 18 && (
                <span className="hover-text">{movienow.title}</span>
              )} */}
            </div>
          ))}
        </div>

        <div className="section-title">
          <h2>PHIM SẮP CHIẾU</h2>
        </div>
        <div className="movie-list">
          {moviesoons.map((moviesoon, index) => (
            <div className="movie-item" key={moviesoon.id}>
              <div className="image-container">
                <Link to="/movie-detail" state={{ id: moviesoon.id }}>
                  <img
                    src={moviesoon.link}
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
              {/* {moviesoon.title.length > 18 && (
                <span className="hover-text">{moviesoon.title}</span>
              )} */}
            </div>
          ))}
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
                <h3>{discount.name}</h3>
                {/* <p>{discount.description}</p> */}
                <h3 onClick={() => handleDiscountModal(discount.id)}>
                  {discount.name}
                </h3>
                <p>{discount.description}</p>
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
              LỊCH CHIẾU -{" "}
              <span class="movie-title">{movie.title}</span>
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
                      className={`date-tab ${selectedDay === day ? 'active' : ''}`}
                    >
                      {day}
                    </button>
                  ))}
                  <button onClick={handleNextClick} disabled={startIndex + maxDaysToShow >= listDay.length}>
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
                      <span class="seats-info">{showtime.emptySeat} ghế trống</span>
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
