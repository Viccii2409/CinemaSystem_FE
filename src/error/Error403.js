// src/components/Error403.js
import React from 'react';
import './Error403.css'; // Import CSS để định dạng giao diện
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const Error403 = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" />
        <h1>403</h1>
        <h2>Forbidden</h2>
        <p>Bạn không có quyền truy cập vào trang này.</p>
        {/* <a href="/" className="back-home">Quay lại Trang Chủ</a> */}
      </div>
    </div>
  );
};

export default Error403;
