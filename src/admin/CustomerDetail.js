import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./CustomerDetail.css";
import { getCustomerById } from "../config/UserConfig";
import { useLocation } from "react-router-dom";

const CustomerDetail = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const [customer, setCustomer] = useState(null);
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await getCustomerById(id);
        console.log(response);
        setCustomer(response);
      } catch (error) {
        console.error("Error fetching Customer Detail: ", error);
      }
    };
    fetchCustomer();
  }, [id]);

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
          <input type="checkbox" checked={customer.status} />
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
