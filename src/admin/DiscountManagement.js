import React from 'react';
import './DiscountManagement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';

const DiscountManagement = () => {
  return (
    <div className="discount-management">
      <h2>Quản lý ưu đãi</h2>
      <button className="add-button">Thêm</button>
      <table className="discount-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>TÊN</th>
            <th>MÃ</th>
            <th>GIÁ TRỊ</th>
            <th>ĐƠN VỊ</th>
            <th>TRẠNG THÁI</th>
            <th>THAO TÁC</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Quốc tế phụ nữ</td>
            <td>WOMAN</td>
            <td>10</td>
            <td>Phần trăm</td>
            <td>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </td>
            <td>
              <button className="action-button view-button">
                <FontAwesomeIcon icon={faEye} />
              </button>
              <button className="action-button edit-button">
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Quốc tế đàn ông</td>
            <td>MEN</td>
            <td>15,000</td>
            <td>VND</td>
            <td>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider"></span>
              </label>
            </td>
            <td>
              <button className="action-button view-button">
                <FontAwesomeIcon icon={faEye} />
              </button>
              <button className="action-button edit-button">
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DiscountManagement; 
