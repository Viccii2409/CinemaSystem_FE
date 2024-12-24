import React, { useState, useEffect } from 'react';
import './AddRoom.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getTypeRoom, addRoom, addSeat, getAllNameTheater } from '../config/TheaterConfig';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function AddRoom() {
  const location = useLocation();
  const { id } = location.state || {};
  const [theater, setTheater] = useState([]);
  const [typeRooms, setTypeRooms] = useState([]);

  const [roomName, setRoomName] = useState(''); // Lưu tên phòng
  const [typeRoomID, setTypeRoomID] = useState('');
  const [numRows, setNumRows] = useState('');   // Lưu số hàng ghế
  const [numSeats, setNumSeats] = useState(''); // Lưu số ghế mỗi hàng 
  const [seats, setSeats] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    // Lấy thông tin rạp nếu id tồn tại
    const getTheaterInfor = async () => {
      if (!id) {
        console.warn("ID của rạp không tồn tại.");
        return;
      }
      const response_theater = await getAllNameTheater();
      if (response_theater) {
        const theaterData = response_theater.find(x => x.id === parseInt(id));
        setTheater(theaterData);
      }

    };

    // Lấy danh sách loại phòng
    const fetchTypeRooms = async () => {
      try {
        const response = await getTypeRoom();
        setTypeRooms(response);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách loại phòng:", error);
      }
    };
    getTheaterInfor();
    fetchTypeRooms();
  }, [id]);


  // Tạo mô hình ghê 
  const handleGenerateSeats = () => {
    if (!roomName) {
      alert('Vui lòng nhập tên phòng.');
      return;
    }

    if (!typeRoomID || typeRoomID === '') {
      alert('Vui lòng chọn loại phòng.');
      return;
    }

    if (isNaN(numRows) || isNaN(numSeats) || numRows <= 0 || numSeats <= 0) {
      alert('Vui lòng nhập số hợp lệ cho hàng ghế và số ghế mỗi hàng.');
      return;
    }

    // Tạo ma trận ghế với số hàng và số ghế được nhập.
    // Mỗi ghế là một đối tượng có dạng { type: 'regular', deleted: false }
    const newSeats = [];
    for (let row = 0; row < numRows; row++) {
      const seatRow = [];
      for (let seat = 0; seat < numSeats; seat++) {
        seatRow.push({ typeSeat: 'regular', status: true });
      }
      newSeats.push(seatRow);
    }
    setSeats(newSeats);

    // Đặt lại các select của hàng về giá trị mặc định là "Thường".
    document.querySelectorAll('.row-select').forEach(select => select.value = 'regular');
  };

  useEffect(() => {
    console.log('Seats đã được cập nhật:', seats);
  }, [seats]);

  const handleCreateRoom = async () => {

    if (!roomName) {
      alert('Vui lòng nhập tên phòng.');
      return;
    }

    if (!typeRoomID || typeRoomID === '') {
      alert('Vui lòng chọn loại phòng.');
      return;
    }

    if (isNaN(numRows) || isNaN(numSeats) || numRows <= 0 || numSeats <= 0) {
      alert('Vui lòng nhập số hợp lệ cho hàng ghế và số ghế mỗi hàng.');
      return;
    }

    if (seats.length === 0) {
      alert('Vui lòng nhập tạo ghế.');
      return;
    }

    const updateSeats = seats.map((row, rowIndex) => {
      let seatIndexCounter = 0; // Đặt biến đếm bên trong mỗi hàng để đếm từ đầu cho từng hàng.


      return row.map((seat, seatIndex) => {

        let typeSeat;
        switch (seat.typeSeat) {
          case 'regular':
            typeSeat = 1;
            break;
          case 'vip':
            typeSeat = 2;
            break;
          case 'double-seat':
            typeSeat = 3;
            break;
          default:
            typeSeat = null;
        }


        if (!seat.status) {
          // Nếu ghế bị xóa, trả về với các thông tin đã cập nhật, nhưng không có tên
          return { ...seat, rowNum: rowIndex, seatNum: seatIndex, name: null, typeSeat };
        }

        seatIndexCounter += 1; // Tăng biến đếm lên cho mỗi ghế không bị xóa
        const rowLetter = String.fromCharCode(65 + rowIndex); // Chuyển rowIndex thành chữ cái (A, B, C,...)
        const seatNumber = String(seatIndexCounter).padStart(2, '0'); // Đảm bảo số thứ tự có 2 chữ số (ví dụ: 01, 02,...)
        const seatName = `${rowLetter}${seatNumber}`; // Tạo tên ghế (ví dụ: A1, A2,...)

        return { ...seat, rowNum: rowIndex, seatNum: seatIndex, name: seatName, typeSeat }; // Cập nhật ghế với tên mới
      });
    });

    const newListSeat = updateSeats.flatMap(row =>
      row.map(seat => ({ ...seat, typeSeat: { id: seat.typeSeat } }))
    );


    const newRoom = {
      name: roomName,
      numRows: parseInt(numRows),
      numColumn: parseInt(numSeats),
      status: false,
      typeRoom: { id: parseInt(typeRoomID) },
    };

    try {
      const roomid = await addRoom(newRoom, id);
      console.log(roomid);

      // Gửi updatedListSeat để thêm các seat
      const check = await addSeat(newListSeat, roomid);

      if (check) {
        alert("Thêm phòng thành công!");
        navigate('/admin/rooms-and-seats', { state: { id: id } });
      } else {
        alert("Thêm phòng thất bại!");
        return;
      }
    } catch (error) {
      console.error("Error adding room: ", error);
    }


  };


  // Được gọi khi thay đổi loại ghế cho cả hàng.
  const handleRowTypeChange = (rowIndex, newType) => {
    const updatedSeats = seats.map((row, rIndex) =>
      rIndex === rowIndex ? row.map((seat) => ({ ...seat, typeSeat: newType })) : row
    );
    setSeats(updatedSeats);
  };

  // Được gọi khi người dùng thay đổi loại ghế.
  const handleSeatTypeChange = (rowIndex, seatIndex, newType) => {
    const updatedSeats = seats.map((row, rIndex) =>
      rowIndex === rIndex
        ? row.map((seat, sIndex) => (sIndex === seatIndex ? { ...seat, typeSeat: newType } : seat))
        : row
    );
    setSeats(updatedSeats);
  };

  // Được gọi khi người dùng muốn xóa toàn bộ hàng ghế.
  const handleDeleteRow = (rowIndex) => {
    const updatedSeats = seats.filter((_, rIndex) => rIndex !== rowIndex);
    setNumRows(numRows - 1)
    setSeats(updatedSeats);
  };

  // Được gọi khi người dùng xóa một ghế.
  const handleDeleteSeat = (rowIndex, seatIndex) => {
    const updatedSeats = seats.map((row, rIndex) => {
      if (rIndex === rowIndex) {
        return row.map((seat, sIndex) =>
          sIndex === seatIndex ? { ...seat, status: false } : seat
        );
      }
      return row;
    });
    setSeats(updatedSeats);
  };

  return (
    <div className="room-manager">
      <h2 className="title">
        <Link to="/admin/rooms-and-seats" state={{id}}>
          Quản lý phòng - ghế
        </Link>
        <span> &raquo; </span>
        Thêm phòng - {theater.name}</h2>
      <div className="input-group-container" >
        <div className="input-group">
          <label className="label">Tên phòng:</label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="input" />
        </div>

        <div className="input-group">
          <label className="label" >Loại phòng:</label>
          <select className="input" name='typeroomid'
            onChange={(e) => setTypeRoomID(e.target.value)} value={typeRoomID}>
            <option value="" disabled>--Chọn loại phòng--</option>
            {typeRooms.map(typeroom => (
              <option key={typeroom.id} value={typeroom.id}>{typeroom.name}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label className="label">Số hàng:</label>
          <input
            type="number"
            value={numRows}
            onChange={(e) => setNumRows(e.target.value)}
            className="input" />
        </div>
        <div className="input-group">
          <label className="label">Số cột:</label>
          <input
            type="number"
            value={numSeats}
            onChange={(e) => setNumSeats(e.target.value)}
            className="input" />
        </div>
      </div>

      <div className="button-container">
        <button className="add-button create-seat" onClick={handleGenerateSeats}>Tạo ghế</button>
        <button className="add-button create-room" onClick={handleCreateRoom}>Lưu phòng</button>
      </div>

      {
        seats.length > 0 ? (
          <>
            <div className="seat-grid">
              {seats.map((row, rowIndex) => (
                <div key={rowIndex} className="seat-row">
                  <div className="row-control">
                    <select
                      onChange={(e) => handleRowTypeChange(rowIndex, e.target.value)}
                      className="row-select"
                    >
                      <option value="regular">Thường</option>
                      <option value="vip">VIP</option>
                      <option value="double-seat">Ghế đôi</option>
                    </select>
                    <button className="delete-row-button" onClick={() => handleDeleteRow(rowIndex)}>X</button>
                  </div>
                  {row.map((seat, seatIndex) => (
                    <div key={seatIndex} className={`seat ${seat.typeSeat} ${!seat.status ? 'deleted' : ''}`}>
                      <select
                        value={seat.typeSeat}
                        onChange={(e) => handleSeatTypeChange(rowIndex, seatIndex, e.target.value)}
                        disabled={!seat.status}
                        className={!seat.status ? 'hide-seat' : ''}
                      >
                        <option value="regular">Thường</option>
                        <option value="vip">VIP</option>
                        <option value="double-seat">Ghế đôi</option>
                      </select>
                      {seat.status && (
                        <button className="delete-seat-button" onClick={() => handleDeleteSeat(rowIndex, seatIndex)}>X</button>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        ) : ('')}
    </div>
  );
}

export default AddRoom;
