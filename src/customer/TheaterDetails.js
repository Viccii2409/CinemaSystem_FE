import React, { useEffect, useState } from "react";
import "./TheaterDetails.css";
import { useLocation, Link } from "react-router-dom";
import { getTheaterById, getTheaterExcept } from "../config/TheaterConfig.js";

const CinemaDetails = () => {
  const location = useLocation();
  const { id } = location.state;
  const [theater, setTheater] = useState(null);
  const [theaterEx, setTheaterEx] = useState([]);
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

    // Gọi API để lấy danh sách các rạp khác
    const fetchOtherTheaters = async () => {
      try {
        const response = await getTheaterExcept(id);
        console.log(response.data); // API call
        setTheaterEx(response.data); // Gán danh sách rạp khác vào state
      } catch (error) {
        console.error("Error fetching other theaters:", error);
      }
    };

    if (id) {
      fetchTheater();
      fetchOtherTheaters();
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
            <b>Địa chỉ</b>: {theater.address.addressDetail},{" "}
            {theater.address.ward.name}, {theater.address.district.name},{" "}
            {theater.address.city.name}
          </p>
          <p>
            <b>Điện thoại</b>: {theater.phone}
          </p>
          <p>
            <b>Email</b>: {theater.email}
          </p>
        </div>
      </section>
      <div className="other-locations">
        <h3>Địa điểm khác</h3>
        {theaterEx.length > 0 ? (
          theaterEx.map((theaterEx) => (
            <ul className="location-list" key={theaterEx.id}>
              <li>
                <Link to="/theater-detail" state={{ id: theaterEx.id }}>
                  {theaterEx.name}
                </Link>
              </li>
            </ul>
          ))
        ) : (
          <p>Không có rạp nào khác</p>
        )}
      </div>
    </div>
  );
};

export default CinemaDetails;
