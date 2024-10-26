import React, { useState } from 'react';
import './MovieCategories.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';

const MovieCategories = () => {
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
        <div className="movie-categories-management">
            <h2>Quản lý thể loại</h2>
            <div className="search-bar">
                <input type="text" placeholder="Tên/ Mã" />
                <button className="search-button">Tìm kiếm</button>
            </div>
            
            <button className="add-button" onClick={handleAddCinema}>Thêm</button>
            <table className="cinema-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã thể loại</th>
                        <th>Tên thể loại</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(10)].map((_, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>T00{index + 1}</td>
                            <td>Thể loại {index + 1}</td>
                            <td>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked={index % 2 === 0} />
                                    <span className="slider round"></span>
                                </label>
                            </td>
                            <td>
                                <button className="view-button" onClick={handleViewCinema}>
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                                <button className="edit-button" onClick={handleEditCinema}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button className="previous-button">Previous</button>
                <span>1 2 3 ... 67 68</span>
                <button className="next-button">Next</button>
            </div>

            {showAddModal && (
                <>
                    <div className="modal-overlay" onClick={handleCloseModal}></div>
                    <div className="modal">
                        <div className="modal-header">Thêm thể loại</div>
                        <input type="text" className="modal-input" placeholder="Tên thể loại" />
                        <input type="text" className="modal-input" placeholder="Mô tả" />
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
                        <div className="modal-header">Xem thể loại</div>
                        <p className="modal-info">Thông tin chi tiết về thể loại...</p>
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
                        <div className="modal-header">Sửa thể loại</div>
                        <input type="text" className="modal-input" placeholder="Tên thể loại" />
                        <input type="text" className="modal-input" placeholder="Mô tả" />
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

export default MovieCategories;