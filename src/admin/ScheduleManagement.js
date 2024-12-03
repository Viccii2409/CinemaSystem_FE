import React, { useState, useEffect } from 'react';
import ScheduleManagementService from './ScheduleManagementService';
import './ScheduleManagement.css';

function ScheduleManagement() {
  const [theater, setTheater] = useState('');
  const [date, setDate] = useState('');
  const [rooms, setRooms] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // Thêm state để lưu lỗi

  useEffect(() => {
    // Lấy danh sách các rạp có status = 1
    ScheduleManagementService.fetchActiveTheaters()
      .then(data => {
        console.log("Dữ liệu rạp:", data);
        setTheaters(data);
      })
      .catch(error => {
        console.error("Lỗi khi tải danh sách rạp:", error);
        setErrorMessage('Không thể tải danh sách rạp. Vui lòng thử lại.');
      });

    // Lấy dữ liệu lịch chiếu
    ScheduleManagementService.fetchShowtimes()
      .then(data => {
        setRooms(data.rooms);
        setShowtimes(data.showtimes);
      })
      .catch(error => {
        console.error("Lỗi khi tải lịch chiếu:", error);
        setErrorMessage('Không thể tải lịch chiếu. Vui lòng thử lại.');
      });
  }, []);

  const handleStatusToggle = (showtimeId) => {
    ScheduleManagementService.toggleShowtimeStatus(showtimeId)
      .then(() => {
        setShowtimes(prevShowtimes => 
          prevShowtimes.map(showtime => 
            showtime.id === showtimeId ? { ...showtime, status: !showtime.status } : showtime
          )
        );
      })
      .catch(error => console.error("Lỗi khi thay đổi trạng thái lịch chiếu:", error));
  };

  const handleAddShowtime = () => {
    console.log("Thêm mới lịch chiếu");
    // Bạn có thể triển khai một form hoặc modal ở đây để thêm lịch chiếu mới.
  };

  return (
    <div className="schedule-management">
      <h2>Lên lịch chiếu</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Hiển thị thông báo lỗi nếu có */}
      <div className="schedule-table">
        <div className="schedule-header">
          <label>Rạp:</label>
          <select 
            value={theater} 
            onChange={(e) => setTheater(e.target.value)}
          >
            <option value="">Chọn rạp</option>
            {theaters.map((theaterItem) => (
              <option key={theaterItem.id} value={theaterItem.id}>
                {theaterItem.name}
              </option>
            ))}
          </select>
          <label>Ngày:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="schedule-list">
          {rooms.map((room) => (
            <div key={room.id} className="room-schedule">
              <div className="room-info">
                <span>Phòng {room.name}</span>
                <span>Loại phòng: {room.type}</span>
                <span>Số ghế: {room.seats}</span>
              </div>
              <table className="schedule-detail">
                <thead>
                  <tr>
                    <th>Thời gian</th>
                    <th>Phim</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {showtimes.filter(showtime => showtime.roomId === room.id).map((showtime) => (
                    <tr key={showtime.id}>
                      <td>{showtime.startTime} - {showtime.endTime}</td>
                      <td>{showtime.movieTitle}</td>
                      <td>
                        <label className="switch">
                          <input 
                            type="checkbox" 
                            checked={showtime.status} 
                            onChange={() => handleStatusToggle(showtime.id)} 
                          />
                          <span className="slider"></span>
                        </label>
                      </td>
                      <td>
                        <button className="edit-button">Sửa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="add-button" onClick={handleAddShowtime}>Thêm</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScheduleManagement;
