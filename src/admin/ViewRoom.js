import React, { useState, useEffect } from 'react';
import './AddRoom.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getRoomById, getTheaterById } from '../config/TheaterConfig';

function ViewRoom() {

  const navigate = useNavigate();
  const location = useLocation();
  const { id, theaterid } = location.state || {};

  const [theaterName, setTheaterName] = useState('');
  const [room, setRoom] = useState([]);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const getRoomInfor = async () => {
      if (!id || !theaterid) {
        console.warn("ID của phòng không tồn tại.");
        navigate('/admin/rooms-and-seats');
        return;
      }
      try {
        const response_theater = await getTheaterById(theaterid);
        setTheaterName(response_theater.data.name);

        const response_room = await getRoomById(id);

        if (response_room.data && Array.isArray(response_room.data.seat)) {
          console.log("Dữ liệu ghế ban đầu:", response_room.data.seat);
          const formattedSeatsData = formattedSeats(response_room.data.seat);
          console.log("Dữ liệu ghế sau khi định dạng:", formattedSeatsData);
          const seatsWithTypes = changeTypeSeat(formattedSeatsData);
          console.log("Dữ liệu ghế sau khi cập nhật loại ghế:", seatsWithTypes);
          setSeats(seatsWithTypes || []);
        } else {
          console.warn("Không có thông tin ghế hoặc dữ liệu ghế không phải là mảng.");
          setSeats([]);
        }

        setRoom(response_room.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin phòng:", error);
        if (error.code === 'ERR_NETWORK') {
          console.error("Lỗi mạng: Không thể kết nối tới server.");
        }
      }
    };

    getRoomInfor();
  }, [id, theaterid, navigate]);

  const formattedSeats = (listseat) => {
    if (!Array.isArray(listseat)) {
      console.warn("Dữ liệu ghế không phải là mảng.");
      console.log(listseat);
      return {};
    }

    return listseat.reduce((newlistseat, seat) => {
      const rowIndex = seat.rowNum;
      if (!newlistseat[rowIndex]) {
        newlistseat[rowIndex] = [];
      }
      newlistseat[rowIndex].push(seat);
      return newlistseat;
    }, []);
  };

  const changeTypeSeat = (listseat) => {
    if (!Array.isArray(listseat)) {
      console.warn("listseat không phải là mảng hai chiều.");
      return [];
    }
    return listseat.map(row => row.map(seat => {
      let typeSeat;
      switch (seat.typeSeat?.id) { // Kiểm tra tồn tại của typeSeat và id
        case 1:
          typeSeat = 'regular';
          break;
        case 2:
          typeSeat = 'vip';
          break;
        case 3:
          typeSeat = 'double-seat';
          break;
        default:
          typeSeat = null;
      }
      return { ...seat, typeSeat }; // Cập nhật loại ghế
    }));
  };




  useEffect(() => {
    console.log('Seats đã được cập nhật:', seats);
  }, [seats]);

  return (
    <div className="room-manager">
      <h2 className="title">
        <span>
          <Link to="/admin/rooms-and-seats" state={{ id: theaterid }}>
            PHÒNG VÀ GHẾ
          </Link>
        </span>
        <span> / </span> {theaterName} - {room.name}</h2>
      <div className="input-group-container" >
        <div className="input-group">
          <label className="label">Tên phòng:</label>
          <input
            type="text"
            value={room.name}
            disabled
            className="input" />
        </div>
        <div className="input-group">
          <label className="label" >Loại phòng:</label>
          <input
            type="text"
            value={room && room.typeRoom ? room.typeRoom.name : ''}
            disabled
            className="input" />
        </div>
        <div className="input-group">
          <label className="label">Tình trạng:</label>
          <input
            type="text"
            value={room.status ? "Đang hoạt động" : "Không hoạt động"}
            disabled
            className="input" />
        </div>
        <div className="input-group">
          <label className="label">Số ghế:</label>
          <input
            type="number"
            value={room.quantitySeat}
            disabled
            className="input" />
        </div>
      </div>
      <div className="note-seat" >
        <div className="input-group">
          <div className='seat regular'>
            <input
              type='text'
              disabled
            />
          </div>
          <h4>Ghế Thường</h4>
        </div>
        <div className="input-group">
        <div className='seat vip'>
            <input
              type='text'
              disabled
            />
          </div>
          <h4>Ghế Vip</h4>
        </div>
        <div className="input-group">
        <div className='seat double-seat'>
            <input
              type='text'
              disabled
            />
          </div>
          <h4>Ghế Đôi</h4>
        </div>
      </div>
      <div className="seat-grid">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((seat, seatIndex) => (
              <div
                key={seatIndex}
                className={`seat ${seat.typeSeat} ${!seat.status ? 'deleted' : ''}`}
              >
                <input
                  type='text'
                  value={seat.name}
                  disabled
                  className={!seat.status ? 'hide-seat' : ''}
                />


              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}

export default ViewRoom;
