import React, { useState, useEffect } from 'react';
import './AddRoom.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getRoomById } from '../config/TheaterConfig';

function ViewRoom() {

  const navigate = useNavigate();
  const location = useLocation();
  const { id, theaterid } = location.state || {};

  const [room, setRoom] = useState([]);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const getRoomInfor = async () => {
      if (!id || !theaterid) {
        console.warn("ID của phòng không tồn tại.");
        navigate('/admin/rooms-and-seats');
        return;
      }
      const roomInfor = await getRoomById(id);
      setRoom(roomInfor);
      if (roomInfor && Array.isArray(roomInfor.seat)) {
        const formattedSeatsData = formattedSeats(roomInfor.seat, roomInfor.numRows, roomInfor.numColumn);
        // console.log(formattedSeatsData);
        const seatsWithTypes = changeTypeSeat(formattedSeatsData);
        setSeats(seatsWithTypes || []);
      } else {
        console.warn("Không có thông tin ghế hoặc dữ liệu ghế không phải là mảng.");
        setSeats([]);
      }
    };

    getRoomInfor();
  }, [id, theaterid, navigate]);

  const formattedSeats = (listseat, numRows, numSeats) => {
    if (!Array.isArray(listseat)) {
      console.warn("Dữ liệu ghế không phải là mảng.");
      console.log(listseat);
      return {};
    }
    const listseat_reduce = listseat.reduce((newlistseat, seat) => {
      const rowIndex = seat.rowNum;

      if (!newlistseat[rowIndex]) {
        newlistseat[rowIndex] = [];
      }

      newlistseat[rowIndex].push(seat);
      return newlistseat;
    }, []);

    for (let row = 0; row < numRows; row++) {
      if (!listseat_reduce[row]) listseat_reduce[row] = [];

      for (let column = 0; column < numSeats; column++) {
        const seat = listseat_reduce[row].find((s) => s.seatNum === column);
        if (!seat) {
          listseat_reduce[row].push({
            rowNum: row,
            seatNum: column,
            status: false,
          });
        }
      }

      // Sắp xếp các ghế trong mỗi hàng theo thứ tự seatNum để giữ đúng thứ tự
      listseat_reduce[row].sort((a, b) => a.seatNum - b.seatNum);
    }

    return listseat_reduce;
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




  // useEffect(() => {
  //   console.log('Seats đã được cập nhật:', seats);
  // }, [seats]);

  return (
    <div className="room-manager">
      <h2 className="title">
        <span>
          <Link to="/admin/rooms-and-seats" state={{ id: theaterid }}>
            PHÒNG VÀ GHẾ
          </Link>
        </span>
        <span> / </span> {room.theaterName} - {room.name}</h2>
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
