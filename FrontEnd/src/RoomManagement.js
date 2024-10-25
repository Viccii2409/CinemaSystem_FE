import React, { useState } from 'react';
import './RoomManagement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';

function RoomManagement() {
    const [rooms, setRooms] = useState([
        { id: 1, name: 'PHÒNG 1', type: '2D', seats: 50, status: true },
        { id: 2, name: 'PHÒNG 2', type: '2D', seats: 60, status: true },
        { id: 3, name: 'PHÒNG 3', type: '2D', seats: 50, status: false },
        { id: 4, name: 'PHÒNG 4', type: '3D', seats: 60, status: true },
    ]);

    const toggleStatus = (id) => {
        setRooms(
            rooms.map((room) =>
                room.id === id ? { ...room, status: !room.status } : room
            )
        );
    };


    const [showAddModal, setShowAddModal] = useState(false);


    const handleAddCinema = () => {
        setShowAddModal(true);
    };

    const handleCloseModal = () => {
        setShowAddModal(false);
    };


    return (
        <div className="room-management">
            <h2>Quản lý phòng - ghế</h2>
            <button className="add-button" onClick={handleAddCinema}>Thêm</button>
            <table className="cinema-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên phòng</th>
                        <th>Loại phòng</th>
                        <th>Số ghế</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room, index) => (
                        <tr key={room.id}>
                            <td>{index + 1}</td>
                            <td>{room.name}</td>
                            <td>{room.type}</td>
                            <td>{room.seats}</td>
                            <td>
                                <label class="switch">
                                    <input type="checkbox" />
                                    <span class="slider round"></span>
                                </label>

                            </td>
                            <td>
                                <button className="view-button">
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                                <button className="edit-button">
                                    <FontAwesomeIcon icon={faEdit} />
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
        </div>
    );
}

export default RoomManagement;
