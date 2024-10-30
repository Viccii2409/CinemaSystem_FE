import React from 'react';
import './CinemaSystem.css';
import { Link } from 'react-router-dom';

const cinemas = [
  { name: 'LAL Hà Đông' },
  { name: 'LAL Phạm Ngọc Thạch' },
];

function CinemaSystem() {
  return (
    <div className="cinema-system">
      <h1 className="cinema-title">Hệ thống rạp</h1>
      <div className="cinema-list">
        {cinemas.map((cinema, index) => (
          <div key={index} className="cinema-item">
            <div className="cinema-poster-placeholder" />
            <h2 className="cinema-name">{cinema.name}</h2>
            <button className="cinema-details-button"><Link to="cinema-detail">THÔNG TIN CHI TIẾT</Link></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CinemaSystem;
