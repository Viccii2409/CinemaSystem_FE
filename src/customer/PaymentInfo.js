import React, { useState } from 'react';
import './PaymentInfo.css';

const PaymentInfo = () => {
  const [couponCode, setCouponCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="payment-info">
      <div className="payment-form">
        <h2>THÔNG TIN THANH TOÁN</h2>
        <div className="form-group">
          <label>Họ tên:</label>
          <input type="text" value="Nguyễn Thị A" readOnly />
        </div>
        <div className="form-group">
          <label>Số điện thoại:</label>
          <input type="text" value="0123456789" readOnly />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value="a@gmail.com" readOnly />
        </div>
        <div className="form-group">
          <label>Mã khuyến mãi:</label>
          <input type="text" value={couponCode} onChange={handleCouponChange} />
          <button className="apply-button">Áp dụng</button>
        </div>
        <div className="form-group">
          <label>Hình thức thanh toán:</label>
          <div className="payment-methods">
            <label>
              <input
                type="radio"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={handlePaymentMethodChange}
              />
              Thanh toán bằng thẻ
            </label>
            <label>
              <input
                type="radio"
                value="qr"
                checked={paymentMethod === 'qr'}
                onChange={handlePaymentMethodChange}
              />
              Thanh toán bằng mã QR
            </label>
          </div>
        </div>
      </div>
      <div className="ticket-summary">
        <h3>LAL MỸ ĐÌNH</h3>
        <p>PHÒNG 2</p>
        <p>10/10/2024 - 08:15</p>
        <p><span className="movie-title">Joker: Folie À Deux Điên Có Đôi</span></p>
        <hr />
        <p>2 x Ghế thường B05, B06 - 140,000 VND</p>
        <p>1 x Ghế vip E05 - 140,000 VND</p>
        <hr />
        <h4>Tổng tiền: 140,000 VND</h4>
        <button className="pay-button">Thanh toán</button>
        <button className="back-button">Trở lại</button>
        <p className="timer">Còn lại: 5 phút 34 giây</p>
      </div>
    </div>
  );
};

export default PaymentInfo;
