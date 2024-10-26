import React, { useState } from 'react';
import './EmployeeManagement.css';
import { Link } from 'react-router-dom';

function EmployeeManagement() {
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);

  const handleAddButtonClick = () => {
    setShowAddEmployeeModal(true);
  };

  const handleCloseModal = () => {
    setShowAddEmployeeModal(false);
  };

  return (
    <div className="employee-management">
      <h2>Quản lý nhân viên</h2>
      <div className="employee-management-container">
        <div className="search-section">
          <input type="text" placeholder="Tên/Mã" />
          <select>
            <option value="">Vị trí</option>
            <option value="sales">Nhân viên Bán vé</option>
            <option value="management">Nhân viên Quản lý</option>
            <option value="posting">Nhân viên Tạo bài viết</option>
          </select>
          <button className="search-button">Tìm kiếm</button>
          <button className="add-button" onClick={handleAddButtonClick}>Thêm</button>
        </div>
        <table className="employee-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã nhân viên</th>
              <th>Tên nhân viên</th>
              <th>Vị trí</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 'S001', name: 'Nguyễn Minh Tâm', position: 'Nhân viên Bán vé', status: true },
              { id: 'S002', name: 'Nguyễn Hoàng Nam', position: 'Nhân viên Quản lý', status: true },
              { id: 'S003', name: 'Lê Anh', position: 'Nhân viên Bán vé', status: true },
              { id: 'S004', name: 'Nguyễn Minh Hiếu', position: 'Nhân viên Lên lịch chiếu', status: false },
              { id: 'S005', name: 'Hoàng Minh Quân', position: 'Nhân viên Thêm phim', status: true },
            ].map((employee, index) => (
              <tr key={employee.id}>
                <td>{index + 1}</td>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>
                  <label className="switch">
                    <input type="checkbox" defaultChecked={employee.status} />
                    <span className="slider"></span>
                  </label>
                </td>
                <td>
                  <button className="edit-button"><Link to="access-permission">Sửa</Link></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddEmployeeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Thêm nhân viên</h3>
            <form>
              <label>Tên nhân viên:</label>
              <input type="text" placeholder="Tên nhân viên" />
              <label>Ngày sinh:</label>
              <input type="date" />
              <label>Địa chỉ:</label>
              <input type="text" placeholder="Địa chỉ" />
              <label>Email:</label>
              <input type="email" placeholder="Email" />
              <label>Vị trí:</label>
              <select>
                <option value="sales">Nhân viên Bán vé</option>
                <option value="management">Nhân viên Quản lý</option>
                <option value="posting">Nhân viên Tạo bài viết</option>
              </select>
              <div className="modal-buttons">
                <button type="button" className="cancel-button" onClick={handleCloseModal}>Thoát</button>
                <button type="submit" className="add-button">Thêm</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeManagement;
