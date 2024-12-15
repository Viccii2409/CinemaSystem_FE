import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashCan, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
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
  const [modalVisibleAdd, setModalVisibleAdd] = useState(false); // Hiển thị modal
  const [modalVisible, setModalVisible] = useState(false); 
  const [showtimeToEdit, setShowtimeToEdit] = useState(null);  // Add this line

  const [newShowtime, setNewShowtime] = useState({
    movieId: null,
    startTime: null,
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
        setModalVisibleAdd(false);
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
    setModalVisibleAdd(true); // Hiển thị modal
  };
  
  const handleEditShowtime = () => {
    if (!showtimeToEdit) return;  
    const updatedShowtime = {
      ...newShowtime,
      startTime: appendSecondsToTime(newShowtime.startTime), // Thêm giây vào thời gian
    };  
    console.log("test",newShowtime);
    console.log("Dữ liệu gửi lên backend:", updatedShowtime);

    ScheduleManagementService.updateShowtime(showtimeToEdit.id, updatedShowtime)
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
          alert('Lỗi khi sửa lịch chiếu. Vui lòng thử lại.');
        }
      });
  };

  const openModalForRoomEdit = (showtimeId) => {
    console.log("id showtime:", showtimeId);
  
    ScheduleManagementService.fetchShowtimeById(showtimeId)
      .then(response => {
        console.log("Toàn bộ phản hồi từ API:", response);
        console.log("Dữ liệu response.data:", response.data);

        const showtimeData = response;
        // if (showtimeData && showtimeData.id && showtimeData.movieId && showtimeData.roomId) {
        if (showtimeData && showtimeData.id && showtimeData.movieId && showtimeData.roomId) {
          console.log("Thông tin showtime nhận được:", showtimeData);
          console.log("Dữ liệu nhận được từ API:", showtimeData);
          console.log("Kiểm tra các trường:", {
            id: typeof showtimeData.id,
            movieId: typeof showtimeData.movieId,
            roomId: typeof showtimeData.roomId,
          });


          setShowtimeToEdit(showtimeData);
  
          // Định dạng dữ liệu cho modal
          setNewShowtime({
            movieId: showtimeData.movieId,
            startTime: formatTimeForInput(showtimeData.startTime),
            date: showtimeData.date,
            theaterId: showtimeData.theaterId,
            roomId: showtimeData.roomId,
          });
          console.log("Dữ liệu newShowtime sau khi mở modal:", {
            movieId: showtimeData.movieId,
            // startTime: formatTimeForInput(showtimeData.startTime),
            startTime: showtimeData.startTime,
            date: showtimeData.date,
            theaterId: showtimeData.theaterId,
            roomId: showtimeData.roomId,
          });
          
          setModalVisible(true);
        } else {
          console.error("Dữ liệu không hợp lệ. Các trường kiểm tra:", {
            id: showtimeData?.id,
            movieId: showtimeData?.movieId,
            roomId: showtimeData?.roomId,
          });
        }
      })
      .catch(error => {
        console.error("Lỗi khi lấy thông tin lịch chiếu:", error);
        alert("Lỗi khi lấy thông tin lịch chiếu");
      });
      console.log("Modal hiển thị: ", modalVisible);

  };
  
  const formatTimeForInput = (time) => {
    return time ? time.slice(0, 5) : ""; // Lấy 5 ký tự đầu "HH:mm"
  };
  
  const appendSecondsToTime = (time) => {
    if (time) {
      // Kiểm tra xem thời gian có phải là dạng "HH:mm" không
      const timeParts = time.split(":");
  
      // Nếu thời gian có 2 phần (giờ và phút), thêm giây vào
      if (timeParts.length === 2) {
        time = `${timeParts[0]}:${timeParts[1]}:00`;  // Thêm giây "00"
      }
    }
  
    return time; // Trả về thời gian đã hoàn chỉnh
  };
  

  //xóa lịch chiếu
  const handleDeleteShowtime = (showtimeId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa lịch chiếu này?')) {
      setLoading(true); 
      ScheduleManagementService.deleteShowtime(showtimeId)
        .then(() => {
          reloadShowtimes();
        })
        .catch((error) => {
          console.error("Lỗi khi xóa lịch chiếu:", error);
          setErrorMessage('Không thể xóa lịch chiếu. Vui lòng thử lại.');
        })
        .finally(() => {
          setLoading(false); 
        });
    }
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
                          <button 
                            className="action-button edit-button" 
                            onClick={() => openModalForRoomEdit(showtime.id)}>
                              <FontAwesomeIcon icon={faEdit}/>
                            </button>
                          <button 
                            className="action-button delete-button" 
                            onClick={() => handleDeleteShowtime(showtime.id)}>
                              <FontAwesomeIcon icon={faTrashCan}/>
                            </button>
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
      
      {modalVisibleAdd && (
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
          <button onClick={() => setModalVisibleAdd(false)}>Đóng</button>
        </div>
      </div>
    )}


{modalVisible && (
  <div className="modal">
    <div className="modal-content">
      <h3>{showtimeToEdit ? 'Sửa lịch chiếu' : 'Thêm lịch chiếu mới'}</h3>

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

      <button onClick={showtimeToEdit ? handleEditShowtime : handleAddShowtime}>
        {showtimeToEdit ? 'Cập nhật' : 'Thêm'}
      </button>
      <button onClick={() => setModalVisible(false)}>Đóng</button>
    </div>
  </div>
)}

    </div>
  );
}

export default ScheduleManagement;