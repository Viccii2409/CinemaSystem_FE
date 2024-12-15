// MovieService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/movie';

const MovieService = {
    // Lấy tất cả phim
    getAllMovies: () => axios.get(`${API_BASE_URL}/all`),

    // Thêm phim mới
    addMovie: (movie) => axios.post(`${API_BASE_URL}/add`, movie),

    // Sửa phim
    editMovie: (id, movie) => axios.put(`${API_BASE_URL}/${id}`, movie),

    // Cập nhật trạng thái phim
    updateStatusMovie: (id) => axios.put(`${API_BASE_URL}/update-status/${id}`),

    // Tìm kiếm phim theo tiêu đề
    searchMovies: (title) => axios.get(`${API_BASE_URL}/search`, { params: { title } }),

    // Xóa phim
    deleteMovie: (id) => axios.delete(`${API_BASE_URL}/${id}`),

    // Tìm phim theo thể loại
    searchMoviesByGenre: (genreName) => axios.get(`${API_BASE_URL}/searchByGenre`, { params: { genreName } }),

    // hiển thị danh sách ngônn ngữ
    getAllLanguage: () => axios.get(`${API_BASE_URL}/getAllLanguage`),
};

export default MovieService;
