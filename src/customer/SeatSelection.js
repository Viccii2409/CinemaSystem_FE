import React, { useState } from 'react';
import './SeatSelection.css';
import { Link } from 'react-router-dom';

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState(new Set());

  const seats = [
    { id: 'A01', type: 'normal' },
    { id: 'A02', type: 'normal' },
    { id: 'A03', type: 'normal' },
    // More seats...
  ];

  const handleSeatClick = (seat) => {
    if (seat.type === 'sold' || seat.type === 'maintenance') {
      return; // Do nothing if the seat is sold or under maintenance
    }

    const updatedSeats = new Set(selectedSeats);
    if (updatedSeats.has(seat.id)) {
      updatedSeats.delete(seat.id);
    } else {
      updatedSeats.add(seat.id);
    }
    setSelectedSeats(updatedSeats);
  };

  const getSeatPrice = (seat) => {
    return seat.type === 'vip' ? 70000 : 50000;
  };

  const renderTicketSummary = () => {
    let ticketInfo = "";
    let totalPrice = 0;

    selectedSeats.forEach((seatId) => {
      const seat = seats.find((s) => s.id === seatId);
      if (seat) {
        const seatType = seat.type === 'vip' ? 'Ghế vip' : 'Ghế thường';
        const seatPrice = getSeatPrice(seat);

        ticketInfo += `1 x ${seatType} ${seatId} - ${seatPrice.toLocaleString()} VND\n`;
        totalPrice += seatPrice;
      }
    });

    return (
      <div className="ticket-details">
        <p>PHÒNG 2</p>
        <p>10/10/2024 - 08:15</p>
        <p><span className="movie-title">Joker: Folie À Deux Điên Có Đôi</span></p>
        <pre>{ticketInfo}</pre>
        <hr />
        <h4>Tổng tiền: {totalPrice.toLocaleString()} VND</h4>
      </div>
    );
  };

  return (
    <div className="seat-selection">
      <div className="seat-selection-container">
        <h2>CHỌN GHẾ</h2>
        <div className="seat-info">
          <span className="seat-legend normal">Ghế thường</span>
          <span className="seat-legend vip">Ghế vip</span>
          <span className="seat-legend couple">Ghế đôi</span>
          <span className="seat-legend selected">Ghế đang chọn</span>
          <span className="seat-legend sold">Ghế đã bán</span>
          <span className="seat-legend maintenance">Ghế bảo trì</span>
        </div>
        <div className="seat-grid">
          {seats.map((seat) => (
            <div
              key={seat.id}
              className={`seat ${seat.type} ${selectedSeats.has(seat.id) ? 'selected' : ''}`}
              onClick={() => handleSeatClick(seat)}
            >
              {seat.id}
            </div>
          ))}
        </div>
      </div>
      <div className="ticket-summary">
        <h3>LAL MỸ ĐÌNH</h3>
        {renderTicketSummary()}
        <button className="next-button"><Link to="/payment-info">TIẾP THEO</Link></button>
        <button className="back-button">Trở lại</button>
        <p className="timer">Còn lại: 5 phút 34 giây</p>
      </div>
    </div>
  );
};

export default SeatSelection;
