import axios from 'axios';

const API_URL = 'http://localhost:8080/api/movie';

class ScheduleManagementService {
    // Lấy danh sách tất cả các rạp và lọc các rạp có status = 1 (hoạt động)
    static fetchActiveTheaters() {
        return axios.get('http://localhost:8080/api/theater')  // Lấy tất cả các rạp
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
  static fetchShowtimes() {
    return axios.get(`${API_URL}/showtimes`)
      .then(response => response.data)
      .catch(error => {
        console.error("Lỗi khi tải lịch chiếu:", error);
        throw error;
      });
  }

  // Cập nhật trạng thái của lịch chiếu
  static toggleShowtimeStatus(showtimeId) {
    return axios.put(`${API_URL}/showtime/${showtimeId}/toggle-status`)
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
}

export default ScheduleManagementService;
