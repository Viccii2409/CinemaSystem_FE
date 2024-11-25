import React, { useState, useEffect, useContext } from "react";
import "./HeaderCustomer.css";
import { Link } from "react-router-dom";
import { getTheater } from "../config/TheaterConfig.js";
import { TheaterContext } from "../TheaterContext";
const HeaderCustomer = () => {
  const [theaters, setTheaters] = useState([]);
  const { selectedTheater, setSelectedTheater } = useContext(TheaterContext);


  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const response = await getTheater();
        const theaterData = response.data.filter(theater => theater.status);
        setTheaters(theaterData); 
      } catch (error) {
        console.error("Lỗi khi lấy danh sách rạp:", error);
      }
    };

    fetchTheater(); // Gọi hàm fetchTheater khi component được render lần đầu
  }, []); 

  const handleSelectTheater = (theaterid) => {
    const theater = theaters.find((item) => item.id === Number(theaterid));
    setSelectedTheater(theater);
  };

  return (
    <header className="homepage-header">
      <div className="header-title">
        <Link to="/home">LAL CINEMA</Link>
      </div>
      <nav className="navbar">
        <Link to="/">Lịch chiếu</Link>
        <Link to="/cinema-system">Hệ thống rạp</Link>
        <Link to="/">Ưu đãi</Link>
        <Link to="/">Thể loại</Link>
      </nav>
      {/* <select className="location-selector">
        {theaters.map((theater) => (
          <option value="theatername">{theater.name}</option>
        ))}
      </select> */}

      <select name="id" className="location-selector" value={selectedTheater?.id || ''} onChange={(e) => handleSelectTheater(e.target.value)}>
          <option value="" disabled>---Chọn rạp---</option>
          {theaters.map((theater) => (
            <option key={theater.id} value={theater.id}>
              {theater.name}
            </option>
          ))}
        </select>
      
      <div>
        <Link to="/login-page" className="login-button">
          Đăng nhập / Đăng ký
        </Link>
      </div>
    </header>
  );
};
export default HeaderCustomer;
