import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faAngleLeft,
  faAngleRight,
  faPlayCircle,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";
import {
  getTheater,
  getTheaterById,
  getMovieNow,
  getMovieSoon,
  getMovieById,
  getDiscount,
  getSlideshow,
} from "../Api.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const HomePage = () => {
  const [movienows, setMovieNow] = useState([]);
  useEffect(() => {
    const fetchMovieNow = async () => {
      try {
        const response = await getMovieNow();
        setMovieNow(response.data); // Lưu dữ liệu vào state cinemas
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

  const handleScheduleModal = () => {
    setScheduleModal(true);
  };

  const handleCloseModal = () => {
    setScheduleModal(false);
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
          {movienows.map((movienow, index) => (
            <div className="movie-item" key={movienow.id}>
              <div className="image-container">
                <Link to={`movie-detail/${movienow.id}`}>
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
                  onClick={handleScheduleModal}
                >
                  MUA VÉ NGAY
                </button>
              </div>
              <h3 className="movietitle">
                <Link to={`movie-detail/${movienow.id}`}>{movienow.title}</Link>
              </h3>
              {movienow.title.length > 18 && (
                <span className="hover-text">{movienow.title}</span>
              )}
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
                <Link to={`movie-detail/${moviesoon.id}`}>
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
                <Link to={`movie-detail/${moviesoon.id}`}>
                  {moviesoon.title}
                </Link>
              </h3>
              {moviesoon.title.length > 18 && (
                <span className="hover-text">{moviesoon.title}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="promotions-section">
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
              ></img>

              <div className="dis-title">
                <h3>{discount.name}</h3>
                <p>{discount.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showScheduleModal && (
        <div class="showtime-overlay">
          <div class="showtime-modal">
            <button class="close-button" onClick={handleCloseModal}>
              &times;
            </button>
            <h2>
              LỊCH CHIẾU -{" "}
              <span class="movie-title">Joker: Folie À Deux Điên Có Đôi</span>
            </h2>
            <h3>RẠP LAL MỸ ĐÌNH</h3>
            <div class="date-tabs">
              <button class="date-tab active">10/10</button>
              <button class="date-tab">11/10</button>
            </div>
            <div class="showtime-list">
              <div class="showtime-item">
                <h4>2D</h4>
                <div class="time-slot">
                  <button class="time-button">
                    <Link to="/seat-selection">08:15</Link>
                  </button>
                  <span class="seats-info">23 ghế trống</span>
                </div>
                <div class="time-slot">
                  <button class="time-button">09:30</button>
                  <span class="seats-info">41 ghế trống</span>
                </div>
                <div class="time-slot">
                  <button class="time-button">11:05</button>
                  <span class="seats-info">56 ghế trống</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default HomePage;
