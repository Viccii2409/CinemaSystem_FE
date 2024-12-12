import React, { useState, useEffect } from 'react';
import ScheduleManagementService from './ScheduleManagementService';
import MovieService from './MovieService';
import './ScheduleManagement.css';

function ScheduleManagement() {
  const [movies, setMovies] = useState([]); // State lưu danh sách phim
  const [loadingMovies, setLoadingMovies] = useState(false); // Trạng thái tải phim

  const [theater, setTheater] = useState('');
  const [date, setDate] = useState('');
  const [rooms, setRooms] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // Thêm state để lưu lỗi
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Hiển thị modal
  const [newShowtime, setNewShowtime] = useState({
    movieId: '',
    startTime: '',
    date: '',  // Thêm trường cho ngày
    theaterId: '',  // Thêm trường cho theaterId
    roomId: '',
  }); // Lưu thông tin lịch chiếu mới

  useEffect(() => {
    setLoadingMovies(true);
    MovieService.getAllMovies()
      .then((response) => {
        // Lọc các phim có status = true
        const activeMovies = response.data.filter(movie => movie.status === true);
        setMovies(activeMovies);
      })
      .catch((error) => {
        console.error("Lỗi khi tải danh sách phim:", error);
        setErrorMessage('Không thể tải danh sách phim. Vui lòng thử lại.');
      })
      .finally(() => {
        setLoadingMovies(false);
      });
  }, []);
  

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
          console.log("Dữ liệu phòng trả về từ API:", data); // Kiểm tra dữ liệu phòng
          if (data && Array.isArray(data)) {
            const validRooms = data.filter(item => item.showtimes);
            setRooms(validRooms);
          } else {
            setRooms([]); 
          }
        })
        .catch(error => setErrorMessage('Không thể tải lịch chiếu. Vui lòng thử lại.'));
    }
  }, [theater, date]);
  

  const reloadShowtimes = () => {
    if (theater && date) {
      setLoading(true); 
      ScheduleManagementService.fetchShowtimes(date, theater)
        .then(data => {
          console.log("Dữ liệu trả về từ API:", data);
  
          if (data && Array.isArray(data)) {
            const validRooms = data.filter(item => item.showtimes); 
            setRooms(validRooms);  
  
            const validShowtimes = data.flatMap(room => room.showtimes); 
            setShowtimes(validShowtimes); 
          } else {
            setRooms([]); 
            setShowtimes([]); 
          }
          setLoading(false); 
        })
        .catch(error => {
          console.error("Lỗi khi tải lịch chiếu:", error);
          setErrorMessage('Không thể tải lịch chiếu. Vui lòng thử lại.');
          setLoading(false); 
        });
    } else {
      setErrorMessage('Vui lòng chọn rạp và ngày.');
      setLoading(false);
    }
  };
  

  const handleStatusToggle = (showtimeId) => {
    ScheduleManagementService.toggleShowtimeStatus(showtimeId)
      .then(() => {
        setShowtimes(prevShowtimes => 
          prevShowtimes.map(showtime => 
            showtime.id === showtimeId ? { ...showtime, status: !showtime.status } : showtime
          )
        );
        reloadShowtimes(); 
      })
      .catch(error => {
        console.error("Lỗi khi thay đổi trạng thái lịch chiếu:", error);
        setLoading(false); 
      });
  };

  const handleStartTimeChange = (e) => {
    let timeValue = e.target.value;
    
    if (timeValue && !timeValue.includes(":")) {
      timeValue += ":00"; 
    }
  
    if (timeValue.length === 5) {  
      timeValue += ":00"; 
    }
  
    setNewShowtime({ 
      ...newShowtime, 
      startTime: timeValue, 
      date: newShowtime.date, 
      theaterId: newShowtime.theaterId 
    });
  
    console.log(timeValue);
  };
  

  const handleAddShowtime = () => {
    if (!newShowtime.movieId || !newShowtime.startTime || !newShowtime.roomId || !theater || !date) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin!');
      console.log("Thông tin chưa đầy đủ:", newShowtime); // Kiểm tra thông tin
      return;
    }
  
    const showtimeData = {
      ...newShowtime,
      theaterId: theater, // Đảm bảo theaterId không rỗng
      date: date, // Đảm bảo date không rỗng
    };
  
    console.log("Dữ liệu gửi lên API: ", showtimeData); // Kiểm tra lại dữ liệu gửi lên API
  
    ScheduleManagementService.addShowtime(showtimeData)
      .then(() => {
        setModalVisible(false);
        reloadShowtimes();
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          // Hiển thị thông báo lỗi chi tiết từ backend
          alert(error.response.data.message);  // Lỗi từ backend (nếu có)
        } else {
          // Trường hợp lỗi không xác định (chẳng hạn mạng, lỗi server, ...)
          alert('Lỗi khi thêm lịch chiếu. Vui lòng thử lại.');
        }
      });
  };
  
  useEffect(() => {
    setNewShowtime(prevState => ({
      ...prevState,
      theaterId: theater,
      date: date,
    }));
  }, [theater, date]);
  
  

  const openModalForRoom = (roomId) => {
    setNewShowtime(prevState => {
      const updatedState = { ...prevState, roomId: roomId };
      console.log("newShowtime khi mở modal: ", updatedState);  // Kiểm tra giá trị của newShowtime
      return updatedState;
    });
    setModalVisible(true); // Hiển thị modal
  };
  
  
  
  

  return (
    <div className="schedule-management">
      <h2>Lên lịch chiếu</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
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
                  <span>{room.roomName}</span>
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
                      <button className="add-button" onClick={() => openModalForRoom(room.roomId)}>Thêm</button>
              </div>
            ))
          ) : (
            <div>Không có phòng chiếu</div>
          )}
        </div>
      </div>
      
      {modalVisible && (
      <div className="modal">
        <div className="modal-content">
          <h3>Thêm lịch chiếu mới</h3>

          <label>Phim:</label>
          <select
            value={newShowtime.movieId}
            onChange={(e) => setNewShowtime({ ...newShowtime, movieId: e.target.value })}
            disabled={loadingMovies} 
          >
            <option value="">Chọn phim</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>
          {loadingMovies && <p>Đang tải danh sách phim...</p>}

          <label>Thời gian bắt đầu:</label>
          <input
            type="time"
            value={newShowtime.startTime}
            onChange={handleStartTimeChange}
          />
          <button onClick={handleAddShowtime}>Thêm</button>
          <button onClick={() => setModalVisible(false)}>Đóng</button>
        </div>
      </div>
    )}

    </div>
  );
}

export default ScheduleManagement;
