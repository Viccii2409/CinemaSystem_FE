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
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // Lấy danh sách các rạp hoạt động
    ScheduleManagementService.fetchActiveTheaters()
      .then(data => {
        console.log('Dữ liệu rạp:', data); // In ra dữ liệu rạp
        setTheaters(data);
      })
      .catch(error => {
        console.error("Lỗi khi tải danh sách rạp:", error);
        setErrorMessage('Không thể tải danh sách rạp. Vui lòng thử lại.');
      });
  }, []);

  useEffect(() => {
    if (theater && date) {
      ScheduleManagementService.fetchShowtimes(date, theater)
        .then(data => {
          console.log("Dữ liệu trả về từ API:", data); // Kiểm tra toàn bộ dữ liệu trả về từ API
  
          // Kiểm tra và xử lý nếu dữ liệu đúng
          if (data && Array.isArray(data)) {
            const validRooms = data.filter(item => item.showtimes); // Kiểm tra xem có trường showtimes không
            setRooms(validRooms);  // Cập nhật dữ liệu rooms
  
            // Kiểm tra xem dữ liệu có showtimes hợp lệ hay không
            const validShowtimes = data.flatMap(room => room.showtimes); // Duyệt qua các phòng và lấy showtimes
            setShowtimes(validShowtimes);  // Cập nhật showtimes
          } else {
            setRooms([]); // Nếu dữ liệu không hợp lệ, set mảng rỗng
            setShowtimes([]); // Không có showtimes
          }
        })
        .catch(error => {
          console.error("Lỗi khi tải lịch chiếu:", error);
          setErrorMessage('Không thể tải lịch chiếu. Vui lòng thử lại.');
        });
    } else {
      setErrorMessage('Vui lòng chọn rạp và ngày.');
    }
  }, [theater, date]);
  

  const reloadShowtimes = () => {
    if (theater && date) {
      setLoading(true); // Thiết lập trạng thái đang tải
      ScheduleManagementService.fetchShowtimes(date, theater)
        .then(data => {
          console.log("Dữ liệu trả về từ API:", data); // Kiểm tra toàn bộ dữ liệu trả về từ API
  
          // Kiểm tra và xử lý nếu dữ liệu đúng
          if (data && Array.isArray(data)) {
            const validRooms = data.filter(item => item.showtimes); // Kiểm tra xem có trường showtimes không
            setRooms(validRooms);  // Cập nhật dữ liệu rooms
  
            // Kiểm tra xem dữ liệu có showtimes hợp lệ hay không
            const validShowtimes = data.flatMap(room => room.showtimes); // Duyệt qua các phòng và lấy showtimes
            setShowtimes(validShowtimes);  // Cập nhật showtimes
          } else {
            setRooms([]); // Nếu dữ liệu không hợp lệ, set mảng rỗng
            setShowtimes([]); // Không có showtimes
          }
          setLoading(false); // Đặt lại trạng thái sau khi hoàn thành
        })
        .catch(error => {
          console.error("Lỗi khi tải lịch chiếu:", error);
          setErrorMessage('Không thể tải lịch chiếu. Vui lòng thử lại.');
          setLoading(false); // Đặt lại trạng thái sau khi lỗi
        });
    } else {
      setErrorMessage('Vui lòng chọn rạp và ngày.');
      setLoading(false);
    }
  };
  
  
  

  const handleStatusToggle = (showtimeId) => {
    // Gửi yêu cầu cập nhật trạng thái lịch chiếu
    ScheduleManagementService.toggleShowtimeStatus(showtimeId)
      .then(() => {
        // Sau khi thay đổi trạng thái, cập nhật lại state để UI phản ánh sự thay đổi
        setShowtimes(prevShowtimes => 
          prevShowtimes.map(showtime => 
            showtime.id === showtimeId ? { ...showtime, status: !showtime.status } : showtime
          )
        );
        reloadShowtimes(); 
      })
      .catch(error => {
        console.error("Lỗi khi thay đổi trạng thái lịch chiếu:", error);
        // Có thể thông báo lỗi nếu cần
        setLoading(false); // Đặt lại trạng thái khi có lỗi

      });
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
            {theaters.map(theaterItem => (
              <option key={theaterItem.id} value={theaterItem.id}>
                {theaterItem.name}
              </option>
            ))}
          </select>

          <label>Ngày:</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
        </div>

        <div className="schedule-list">
  {rooms?.length > 0 ? (
    rooms.map((room) => (
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
            {room.showtimes?.length > 0 ? (
              room.showtimes.map((showtime) => (
                <tr key={showtime.id}>
                  <td>{showtime.startTime} - {showtime.endTime}</td>
                  <td>{showtime.movie.title}</td>
                  <td>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={showtime.status} 
                      onChange={() => handleStatusToggle(showtime.id)} 
                    />
                    <span className="slider round"></span>
                  </label>
                  </td>
                  <td>
                    <button className="edit-button">Sửa</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4">Không có lịch chiếu</td></tr>
            )}
          </tbody>
        </table>
        <button className="add-button" onClick={handleAddShowtime}>Thêm</button>
      </div>
    ))
  ) : (
    <div>Không có phòng chiếu</div>
  )}
</div>


        
      </div>
    </div>
  );
}

export default ScheduleManagement;
