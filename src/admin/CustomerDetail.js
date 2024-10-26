import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './CustomerDetail.css';

const CustomerDetail = () => {
  const customer = {
    name: 'Nguyen Van A',
    email: 'a@gmail.com',
    password: '******',
    status: true,
    gender: 'Nam',
    birthdate: '01/01/1990',
    phone: '0945223553',
    city: 'Hà Nội',
  };

  return (
    <div className="customer-detail">
      <h2>Quản lý khách hàng / Chi tiết khách hàng</h2>
      <div className="customer-info">
        <div className="customer-header">
          <FontAwesomeIcon icon={faUserCircle} className="customer-avatar" />
          <div className="customer-main-info">
            <h3>{customer.name}</h3>
            <p>Email đăng nhập: {customer.email}</p>
            <p>Mật khẩu: {customer.password}</p>
          </div>
        </div>
        <div className="customer-status">
          <label>Trạng thái hoạt động</label>
          <input type="checkbox" checked={customer.status} readOnly />
        </div>
        <div className="customer-personal-info">
          <h4>Thông tin cá nhân</h4>
          <p>Tên khách hàng: {customer.name}</p>
          <p>Giới tính: {customer.gender}</p>
          <p>Ngày sinh: {customer.birthdate}</p>
          <p>Số điện thoại: {customer.phone}</p>
          <p>Tỉnh/Thành phố: {customer.city}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
