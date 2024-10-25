import React, { useState } from 'react';
import './CinemaManagement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const CinemaManagement = () => {
  const cinemas = [
    {
      id: 1,
      name: "LAL DAN PHUONG",
      address: "tầng 2 tòa nhà HHA, Dan Phuong, Hà Nội",
      rooms: 3,
      status: false,
    },
    {
      id: 2,
      name: "LAL THANH XUAN",
      address: "Tầng hầm B1, tòa nhà Golden West, Thanh Xuân, Hà Nội",
      rooms: 4,
      status: true,
    },
  ];

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleAddCinema = () => {
    setShowAddModal(true);
  };

  const handleViewCinema = () => {
    setShowViewModal(true);
  };

  const handleEditCinema = () => {
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowViewModal(false);
    setShowEditModal(false);
  };

  return (
    <div className="cinema-management-system">

      <h2>Quản lý rạp</h2>
      <button className="add-button" onClick={handleAddCinema}>Thêm</button>
      <table className="cinema-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên rạp</th>
            <th>Địa chỉ</th>
            <th>Số phòng</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {cinemas.map((cinema, index) => (
            <tr key={cinema.id}>
              <td>{index + 1}</td>
              <td>{cinema.name}</td>
              <td>{cinema.address}</td>
              <td>{cinema.rooms}</td>
              <td>
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>

              </td>
              <td>
                <button className="view-button" onClick={handleViewCinema}>
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button className="edit-button" onClick={handleEditCinema}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="delete-button">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddModal && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <div className="modal-header">Thêm rạp</div>
            <input type="text" className="modal-input" placeholder="Tên rạp" />
            <input type="file" className="modal-input" />
            <input type="text" className="modal-input" placeholder="Địa chỉ" />
            <div className="modal-buttons">
              <button className="close-button" onClick={handleCloseModal}>Thoát</button>
              <button className="submit-button">Thêm</button>
            </div>
          </div>
        </>
      )}

      {showViewModal && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <div className="modal-header">Xem rạp</div>
            <p className="modal-info">Thông tin chi tiết về rạp...</p>
            <div className="modal-buttons">
              <button className="close-button" onClick={handleCloseModal}>Đóng</button>
            </div>
          </div>
        </>
      )}

      {showEditModal && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <div className="modal-header">Sửa rạp</div>
            <input type="text" className="modal-input" placeholder="Tên rạp" />
            <input type="file" className="modal-input" />
            <input type="text" className="modal-input" placeholder="Địa chỉ" />
            <div className="modal-buttons">
              <button className="close-button" onClick={handleCloseModal}>Thoát</button>
              <button className="submit-button">Lưu</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CinemaManagement;
