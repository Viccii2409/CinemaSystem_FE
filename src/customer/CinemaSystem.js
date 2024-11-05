import React, { useState, useEffect } from "react";
import "./CinemaSystem.css";
import { Link } from "react-router-dom";
import { getTheater } from "../config/TheaterConfig.js";
const CinemaSystem = () => {
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const response = await getTheater();
        setTheaters(response.data);
      } catch (error) {
        console.log("Lỗi khi lấy Rạp:", error);
      }
    };
    fetchTheater();
  }, []);
  return (
    <div className="cinema-system">
      <h1 className="cinema-title">Hệ thống rạp</h1>
      <div className="cinema-list">
        {theaters.map((theater) => (
          <div key={theater.id} className="cinema-item">
            <div className="cinema-poster-placeholder" />
            <h2 className="cinema-name">{theater.name}</h2>
            <button className="cinema-details-button">
              <Link to={`theater-detail/${theater.id}`}>
                THÔNG TIN CHI TIẾT
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CinemaSystem;
