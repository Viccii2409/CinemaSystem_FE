import React, { useEffect, useState } from "react";
import "./TheaterDetails.css";
import { useLocation } from "react-router-dom";
import { getTheaterById } from "../config/TheaterConfig.js";

const CinemaDetails = () => {
  const location = useLocation();
  const { id } = location.state;
  const [theater, setTheater] = useState(null);
  useEffect(() => {
    // Gọi API để lấy chi tiết rạp hiện tại
    const fetchTheater = async () => {
      try {
        const response = await getTheaterById(id);
        console.log(response.data); // API call
        setTheater(response.data); // Gán thông tin rạp hiện tại vào state
      } catch (error) {
        console.error("Error fetching theater details:", error);
      }
    };

    if (id) {
      fetchTheater();
    }
  }, [id]);
  if (!theater) {
    return <div>Đang tải thông tin rạp...</div>;
  }
  return (
    <div className="cinema-details-container">
      <section className="cinema-info" key={theater.id}>
        <h2 className="cinema-name">{theater.name}</h2>
        <img src={theater.image} />
        <p className="cinema-description">THÔNG TIN RẠP</p>
        <div>
          <p>{theater.description}</p>
          <h3>Thông tin liên hệ</h3>
          <p>
            <b>Địa chỉ</b>: {theater.address}
          </p>
          <p>
            <b>Điện thoại</b>: {theater.phone}
          </p>
          <p>
            <b>Email</b>: {theater.email}
          </p>
        </div>
      </section>
    </div>
  );
};

export default CinemaDetails;
