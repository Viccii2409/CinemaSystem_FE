import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faClock } from "@fortawesome/free-solid-svg-icons";
import "./CustomerManagement.css";
import { Link } from "react-router-dom";
import { getAllCustomer } from "../config/UserConfig.js";
const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await getAllCustomer();
        console.log(response);
        setCustomers(response);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khách hàng:", error);
      }
    };
    fetchCustomer();
  }, []);

  return (
    <div className="customer-management">
      <h2>Quản lý khách hàng</h2>
      <div className="search-bar">
        <input type="text" placeholder="Tìm kiếm khách hàng" />
      </div>
      <table className="customer-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên KH</th>
            <th>Email</th>
            <th>SDT</th>
            <th>Tỉnh/Thành phố</th>
            <th>Thao tác</th>
            <th>Lịch sử</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.id}>
              <td>{index + 1}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
              <td>
                <button className="action-button">
                  <Link to="/customer-detail" state={{ id: customer.id }}>
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                </button>
              </td>
              <td>
                <button className="action-button">
                  <FontAwesomeIcon icon={faClock} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerManagement;
