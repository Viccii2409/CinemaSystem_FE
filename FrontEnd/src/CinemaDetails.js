import React from 'react';
import './CinemaDetails.css';
import { Link } from 'react-router-dom';

const CinemaDetails = () => {
  return (
    <div className="cinema-details-container">
      <div className="cinema-info">
        <h2 className="cinema-name">LAL Hà Đông</h2>
        <p className="cinema-description">THÔNG TIN RẠP</p>
      </div>
      <div className="other-locations">
        <h3>Địa điểm khác</h3>
        <ul className="location-list">
          <li><Link to="/">LAL Phạm Ngọc Thạch</Link></li>
          <li><Link to="/">LAL Mỹ Đình</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default CinemaDetails;
