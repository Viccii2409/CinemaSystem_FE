import React from 'react';
import './TicketPriceManagement.css';

function TicketPriceManagement() {
  return (
    <div className="ticket-price-management">
      <h2>Quản lý giá vé</h2>
      <div className="ticket-price-table">
        <table className="price-table">
          <thead>
            <tr>
              <th></th>
              <th>Học sinh, Sinh viên</th>
              <th>Người lớn</th>
              <th>Người già, Trẻ em</th>
              <th>Thành viên</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Thứ 2, Thứ 3, Thứ 4, Thứ 5</td>
              <td>Trước 17h</td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
            </tr>
            <tr>
              <td>Thứ 6, Thứ 7, Chủ nhật</td>
              <td>Trước 17h</td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
              <td><input type="text" /></td>
            </tr>
          </tbody>
        </table>

        <table className="surcharge-table">
          <thead>
            <tr>
              <th>Loại phòng</th>
              <th>Phụ phí</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2D</td>
              <td><input type="text" /></td>
            </tr>
            <tr>
              <td>3D</td>
              <td><input type="text" /></td>
            </tr>
            <tr>
              <td>4D</td>
              <td><input type="text" /></td>
            </tr>
            <tr>
              <td>IMAX</td>
              <td><input type="text" /></td>
            </tr>
            <tr>
              <td>Thường</td>
              <td><input type="text" /></td>
            </tr>
            <tr>
              <td>VIP</td>
              <td><input type="text" /></td>
            </tr>
            <tr>
              <td>Ghế đôi</td>
              <td><input type="text" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="form-actions">
        <button className="save-button">Lưu</button>
      </div>
    </div>
  );
}

export default TicketPriceManagement;
