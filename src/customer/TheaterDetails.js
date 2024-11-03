import React, { useEffect, useState } from "react";
import "./TheaterDetails.css";
import { Link } from "react-router-dom";
import { getTheaterById } from "../Api";
import { useParams } from "react-router-dom";

const CinemaDetails = () => {
  const { id } = useParams();
  const [theater, setTheater] = useState(null);

  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const response = await getTheaterById(id);
        console.log("Response from API:", response); // Kiểm tra dữ liệu trả về
        setTheater(response.data);
      } catch (error) {
        console.log("Lỗi khi lấy thông tin rạp:", error);
      }
    };
    fetchTheater();
  }, [id]);

  if (!theater) {
    return <div>Đang tải thông tin rạp...</div>;
  }

  return (
    <div className="cinema-details-container">
      <div className="cinema-info">
        <h2 className="cinema-name">{theater.name}</h2>
        <p className="cinema-description">THÔNG TIN RẠP</p>
      </div>
      <div className="other-locations">
        <h3>Địa điểm khác</h3>
        <ul className="location-list">
          <li>
            <Link to="/">LAL Phạm Ngọc Thạch</Link>
          </li>
          <li>
            <Link to="/">LAL Mỹ Đình</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CinemaDetails;
