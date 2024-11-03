import React, { useState, useEffect } from 'react';
import './AddRoom.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getTheaterById, getTypeRoom, getRoomById, editRoom, updateSeat } from '../config/TheaterConfig';

function EditRoom() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, theaterid } = location.state || {};

  const [theaterName, setTheaterName] = useState('');
  const [roomID, setRoomID] = useState([]);
  const [seats, setSeats] = useState([]);
  const [typeRooms, setTypeRooms] = useState([]);

  const [roomName, setRoomName] = useState(''); // Lưu tên phòng
  const [typeRoomID, setTypeRoomID] = useState('');
  const [numRows, setNumRows] = useState('');   // Lưu số hàng ghế
  const [numSeats, setNumSeats] = useState('');

  const [putSeat, setPutSeat] = useState([]);



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

        const response_typeroom = await getTypeRoom();
        setTypeRooms(response_typeroom.data);

        const response_room = await getRoomById(id);
        setRoomName(response_room.data.name);
        setTypeRoomID(response_room.data.typeRoom.id);
        setNumRows(response_room.data.numRows);
        setNumSeats(response_room.data.numColumn);
        setRoomID(response_room.data.id);

        if (response_room.data && Array.isArray(response_room.data.seat)) {
          const formattedSeatsData = formattedSeats(response_room.data.seat, response_room.data.numRows, response_room.data.numColumn);
          console.log(formattedSeatsData);
          const seatsWithTypes = changeTypeSeat(formattedSeatsData);
          setSeats(seatsWithTypes || []);
        } else {
          console.warn("Không có thông tin ghế hoặc dữ liệu ghế không phải là mảng.");
          setSeats([]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin phòng:", error);
        if (error.code === 'ERR_NETWORK') {
          console.error("Lỗi mạng: Không thể kết nối tới server.");
        }
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
  
    // Step 1: Group seats by rows
    const listseat_reduce = listseat.reduce((newlistseat, seat) => {
      if (seat.status) {
        const rowIndex = seat.rowNum;
  
        if (!newlistseat[rowIndex]) {
          newlistseat[rowIndex] = [];
        }
  
        newlistseat[rowIndex].push(seat);
      }
      return newlistseat;
    }, []);
  
    console.log(numRows + " " + numSeats);
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
          typeSeat = 'regular';
      }
      return { ...seat, typeSeat }; // Cập nhật loại ghế
    }));
  };




  useEffect(() => {
    console.log('Seats đã được cập nhật:', seats);
  }, [seats]);

  useEffect(() => {
    console.log('Seats đã được gửi:', putSeat);
  }, [putSeat]);


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

    const newRoom = {
      id: roomID,
      name: roomName,
      numRows: parseInt(numRows),
      numColumn: parseInt(numSeats),
      status: false,
      typeRoom: { id: parseInt(typeRoomID) },
    };

    const check = await editRoom(newRoom);
    console.log(check);
    if (check === true) {
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
        row.map(seat => ({
          ...seat,
          typeSeat: { id: seat.typeSeat },
        }))
      );

      setPutSeat(newListSeat);
      console.log(JSON.stringify(newListSeat, null, 2));

      try {
        const check = await updateSeat(roomID, newListSeat);
        if (check) {
          alert("Sửa phòng thành công!");
          navigate('/admin/rooms-and-seats', { state: { id: theaterid } });
        } else {
          console.warn("Thêm ghế thất bại!");
          return;
        }

      } catch (error) {
        console.error("Error adding list seat: ", error);
        return;
      }
    }
    else {
      console.warn("Lỗi sửa phòng");
      return;
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
        <span>
          <Link to="/admin/rooms-and-seats" state={{ id: theaterid }}>
            PHÒNG VÀ GHẾ
          </Link>
        </span>
        <span> / </span> {theaterName} - SỬA PHÒNG</h2>
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

export default EditRoom;
