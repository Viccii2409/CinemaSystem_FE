import React, { useEffect, useState } from 'react';
import './TheaterManagement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { getTheaterRoomDto, updateStatusRoom, deleteRoom, getAllNameTheater, getRoomByTheaterID } from '../config/TheaterConfig';
import { useNavigate, useLocation } from 'react-router-dom';

function RoomManagement() {
    const [theaters, setTheaters] = useState([]);
    const [theaterID, setTheaterID] = useState('');
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || '';

    useEffect(() => {
        if (id > 0) {
            handleListRoom(id);
        }
        const fetchTheater = async () => {
            const response_theater = await getAllNameTheater();
            if (response_theater) {
                setTheaters(response_theater);
            }
            else {
                alert("Lỗi lấy danh sách rạp!");
                return;
            }
        };
        fetchTheater();
    }, []);

    const handleListRoom = async(id) => {
        const response = await getRoomByTheaterID(id);
        setRooms(response);
        setTheaterID(id);
    }

    const handleAddRoom = (theaterid) => {
        if (theaterid == null || theaterid === '') {
            return;
        }
        // const theater = theaters.find(x => x.id === parseInt(theaterid));
        navigate('add-room', { state: { id: theaterid } });
    };

    const handleStatusChange = async (id, currentStatus) => {
        try {
            const updatedStatus = !currentStatus;
            await updateStatusRoom(id);
            setRooms(rooms.map(room =>
                room.id === id ? { ...room, status: updatedStatus } : room
            ));
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
        }
    };

    const handleViewRoom = (id) => {
        navigate('view-room', { state: { id: id, theaterid: theaterID } });
    }

    const handleEditRoom = (id) => {
        // console.log(id + " " + theaterID);
        navigate('edit-room', { state: { id: id, theaterid: theaterID } });
    }

    const handleDeleteRoom = async (id) => {
        const confirmed = window.confirm("Bạn có chắc muốn xóa phòng không?");
        if (confirmed) {
            await deleteRoom(theaterID, id);
            setRooms(prevRooms => prevRooms.filter(room => room.id !== parseInt(id)));
            alert("Phòng đã được xóa thành công.");
        } else {
            alert("Hủy xóa phòng.");
        }
    }


    return (
        <div className="cinema-management-system">
            <h2>Quản lý phòng - ghế</h2>
            <div className='search-theater'>
                <select name="id" className='input-search' value={theaterID} onChange={(e) => handleListRoom(e.target.value)}>
                    <option value="" disabled>---Chọn rạp---</option>
                    {theaters.map(theater => (
                        <option key={theater.id} value={theater.id}>{theater.name}</option>
                    ))}
                </select>
                <button className="button add-button" onClick={() => handleAddRoom(theaterID)}>Thêm</button>
            </div>
            {rooms.length > 0 ? (
                <table className="cinema-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên phòng</th>
                            <th>Loại phòng</th>
                            <th>Số ghế</th>
                            <th>Số lịch chiếu</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room, index) => (
                            <tr key={room.id}>
                                <td>{index + 1}</td>
                                <td>{room.name}</td>
                                <td>{room.typeRoom.name}</td>
                                <td>{room.quantitySeat}</td>
                                <td>{room.quantityShowtime}</td>
                                <td>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={room.status}
                                            onChange={() => handleStatusChange(room.id, room.status)}

                                        />
                                        <span className="slider round"></span>
                                    </label>

                                </td>
                                <td>
                                    <button className="view-button" onClick={() => handleViewRoom(room.id)}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                    <button className="edit-button" onClick={() => handleEditRoom(room.id)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    {room.quantityShowtime === 0 && (
                                        <button className="delete-button" onClick={() => handleDeleteRoom(room.id)}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (<p>Không có phòng</p>)}

        </div>
    );
}

export default RoomManagement;
