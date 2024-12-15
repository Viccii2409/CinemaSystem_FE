import axios from 'axios';

const API_URL = 'http://localhost:8080/api/movie';

class ScheduleManagementService {
    // Lấy danh sách tất cả các rạp và lọc các rạp có status = 1 (hoạt động)
    static fetchActiveTheaters() {
        return axios.get('http://localhost:8080/api/theater/all')  // Lấy tất cả các rạp
            .then(response => {
                // Lọc các rạp có status = 1 (hoạt động)
                const activeTheaters = response.data.filter(theater => theater.status === true);
                return activeTheaters;  // Trả về danh sách các rạp hoạt động
            })
            .catch(error => {
                console.error("Lỗi khi tải danh sách rạp:", error);
                throw error;  // Xử lý lỗi nếu không tải được dữ liệu
            });
    }

  // Lấy lịch chiếu từ backend
  static fetchShowtimes(date, theaterId) {
    // Kiểm tra ngày và rạp trước khi gửi request
    if (!date || !theaterId) {
      console.error("Ngày và rạp cần được chọn.");
      throw new Error("Ngày và rạp cần được chọn.");
    }
  
    // Đảm bảo định dạng ngày hợp lệ (yyyy-MM-dd)
    const formattedDate = new Date(date).toISOString().split('T')[0];  // Định dạng ngày theo chuẩn yyyy-MM-dd
  
    return axios.get(`${API_URL}/showtimes?date=${formattedDate}&theaterId=${theaterId}`)
      .then(response => {
        if (response.data) {
          return response.data;  // Trả về dữ liệu nếu có
        } else {
          throw new Error("Không có dữ liệu lịch chiếu.");
        }
      })
      .catch(error => {
        console.error("Lỗi khi tải lịch chiếu:", error);
        throw error;  // Xử lý lỗi
      });
  }
  

  // Cập nhật trạng thái của lịch chiếu
  static toggleShowtimeStatus(showtimeId) {
    return axios.put(`${API_URL}/${showtimeId}/toggle-status`)
      .then(response => response.data)
      .catch(error => {
        console.error("Lỗi khi thay đổi trạng thái lịch chiếu:", error);
        throw error;
      });
  }

  // Thêm lịch chiếu mới
  static addShowtime(showtimeData) {
    return axios.post(`${API_URL}/schedule`, showtimeData)
      .then(response => response.data)
      .catch(error => {
        console.error("Lỗi khi thêm lịch chiếu:", error);
        throw error;
      });
  }

  // Cập nhật trạng thái tự động cho lịch chiếu
  static updateShowtimeStatus() {
    return axios.put(`${API_URL}/status/update`)
      .then(response => response.data)
      .catch(error => {
        console.error("Lỗi khi cập nhật trạng thái lịch chiếu:", error);
        throw error;
      });
  }

  // Ẩn lịch chiếu khi phim ngừng chiếu
  static hideShowtimesByMovie(movieId) {
    return axios.put(`${API_URL}/movie/${movieId}/hide-showtimes`)
      .then(response => response.data)
      .catch(error => {
        console.error("Lỗi khi ẩn lịch chiếu phim:", error);
        throw error;
      });
  }
// Cập nhật thông tin lịch chiếu
static updateShowtime(showtimeId, showtimeData) {
  return axios.put(`${API_URL}/showtime/update/${showtimeId}`, showtimeData)
      .then(response => response.data)
      .catch(error => {
          console.error("Lỗi khi cập nhật lịch chiếu:", error);
          throw error;
      });
}
// Hàm lấy thông tin chi tiết lịch chiếu theo ID
static fetchShowtimeById(showtimeId) {
  if (!showtimeId) {
    console.error("ID lịch chiếu không hợp lệ");
    throw new Error("ID lịch chiếu không hợp lệ");
  }

  return axios.get(`${API_URL}/showtime/${showtimeId}`)
    .then(response => {
      console.log("Dữ liệu trả về từ API:", response); // Kiểm tra toàn bộ phản hồi
      if (response.data) {
        return response.data;  // Trả về dữ liệu lịch chiếu
      } else {
        throw new Error("Không tìm thấy lịch chiếu với ID: " + showtimeId);
      }
    })
    .catch(error => {
      console.error("Lỗi khi tải thông tin lịch chiếu:", error);
      // Kiểm tra lỗi chi tiết từ phản hồi
      console.error(error.response ? error.response.data : error.message);
      throw new Error(error.response ? error.response.data.message : "Lỗi không xác định");
    });
}
// Xóa lịch chiếu theo ID
static deleteShowtime(showtimeId) {
  return axios.delete(`${API_URL}/showtime/${showtimeId}`)
    .then(response => response.data)
    .catch(error => {
      console.error("Lỗi khi xóa lịch chiếu:", error);
      throw error;
    });
}


}

export default ScheduleManagementService;
