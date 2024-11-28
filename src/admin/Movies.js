
import React, { useState, useEffect } from 'react';
import './Movies.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashCan, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import MovieService from './MovieService';
import GenreService from './MovieCategoriesService';

Modal.setAppElement('#root');

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [genres, setGenres] = useState([]);
    const [newMovie, setNewMovie] = useState({
        title: '',
        duration: '',
        releaseDate: '',
        description: '',
        status: true,
        rating: 0,
        director: '',
        language: '',
        cast: '',
        genre: [],
        image: ''
    });

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState(''); // Selected genre to filter movies

    // Fetch movies and genres from API
    useEffect(() => {
        fetchMovies();
        fetchGenres();
    }, []);

    useEffect(() => {
        filterMoviesByGenre();
    }, [selectedGenre]);

    const fetchMovies = async () => {
        try {
            const response = await MovieService.getAllMovies();
            const normalizedMovies = response.data.map((movie) => ({
                ...movie,
                genre: Array.isArray(movie.genres) ? movie.genres : [], // Normalize genre
            }));
            setMovies(normalizedMovies);
            setFilteredMovies(normalizedMovies);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching movies:", error);
            setLoading(false);
        }
    };

    const fetchGenres = async () => {
        try {
            const response = await GenreService.getAllGenres();
            setGenres(response.data);
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    };

    // Thêm phim 
    const handleAddMovie = async () => {
        try {
            const response = await MovieService.addMovie(newMovie);
            setMovies([...movies, response.data]);
            setNewMovie({
                title: '',
                duration: '',
                releaseDate: '',
                description: '',
                status: true,
                rating: 0,
                director: '',
                language: '',
                cast: '',
                genre: [],
                image: ''
            });
            setIsAddModalOpen(false);
            alert("Thêm phim thành công!");
        } catch (error) {
            console.error("Error adding the movie:", error);
            alert("Thêm phim thất bại!");
        }
    };

    const handleGenreChange = (e) => {
        const selectedGenres = Array.from(e.target.selectedOptions, option => option.value);
        setNewMovie({ ...newMovie, genre: selectedGenres });
    };

    const handleReleaseDateChange = (e) => {
        setNewMovie({ ...newMovie, releaseDate: e.target.value });
    };

    // Đổi trạng thái phim
    const updateStatusMovie = async (id) => {
        try {
            
            await MovieService.updateStatusMovie(id);
    
            // Tải lại danh sách phim sau khi thay đổi trạng thái
            fetchMovies();  
    
            alert("Chuyển trạng thái thành công!");
        } catch (error) {
            console.error('Error updating status:', error);
            alert("Cập nhật trạng thái thất bại!");
        }
    };
    

    // Xem chi tiết phim
    const handleViewMovie = (id) => {
        const movie = movies.find((m) => m.id === id);
        alert(`Xem thông tin phim: ${movie.title}`);
    };

    // Sửa phim
    const handleEditMovie = (id) => {
        const movie = movies.find((m) => m.id === id);
        setSelectedMovie(movie);
        alert(`Chỉnh sửa thông tin phim: ${movie.title}`);
    };

    // Xóa phim
    const handleDeleteMovie = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa phim này?')) {
            try {
                await MovieService.deleteMovie(id);
                setMovies(movies.filter((m) => m.id !== id));
                fetchMovies();
                alert('Xóa phim thành công!');
            } catch (error) {
                console.error('Lỗi khi xóa phim:', error);
                alert('Xóa phim thất bại!');
            }
        }
    };

    // Tìm kiếm phim theo tên
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setFilteredMovies(
            movies.filter((movie) =>
                movie.title.toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
    };

    // Lọc phim theo thể loại 
    const filterMoviesByGenre = () => {
        if (selectedGenre) {
            setFilteredMovies(
                movies.filter((movie) =>
                    movie.genres.some((genre) => genre.name === selectedGenre)
                )
            );
        } else {
            setFilteredMovies(movies);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="movies-management">
            <h2>Quản lý phim</h2>
            <div className="controls">
                <input
                    type="text"
                    placeholder="Tìm kiếm phim..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                
                {/* Combobox to filter movies by genre */}
                <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                >
                    <option value="">Tất cả thể loại</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.name}>
                            {genre.name}
                        </option>
                    ))}
                </select>

                <button className="add-button" onClick={() => setIsAddModalOpen(true)}>Thêm</button>
            </div>

            {/* Modal for adding movie */}
            <Modal
                isOpen={isAddModalOpen}
                onRequestClose={() => setIsAddModalOpen(false)}
                contentLabel="Thêm Phim"
            >
                <h2>Thêm Phim Mới</h2>
                <form>
                    <div>
                        <label>Tên Phim:</label>
                        <input
                            type="text"
                            value={newMovie.title}
                            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                            placeholder="Nhập tên phim"
                        />
                    </div>

                    <div>
                        <label>Thể loại:</label>
                        <select
                            multiple
                            value={newMovie.genre}
                            onChange={handleGenreChange}
                        >
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.name}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Ngày khởi chiếu:</label>
                        <input
                            type="date"
                            value={newMovie.releaseDate}
                            onChange={handleReleaseDateChange}
                        />
                    </div>

                    <div>
                        <label>Mô tả:</label>
                        <textarea
                            value={newMovie.description}
                            onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                            placeholder="Nhập mô tả phim"
                        />
                    </div>

                    <button type="button" onClick={handleAddMovie}>Thêm Phim</button>
                    <button type="button" onClick={() => setIsAddModalOpen(false)}>Hủy</button>
                </form>
            </Modal>

            {/* Movie table */}
            <table className="cinema-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Hình ảnh</th>
                        <th>Tên phim</th>
                        <th>Thể loại</th>
                        <th>Ngày khởi chiếu</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMovies.length > 0 ? (
                        filteredMovies
                            .slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)
                            .map((movie, index) => (
                                <tr key={movie.id}>
                                    <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                                    <td>
                                        <img
                                            src={movie.link}
                                            alt={movie.title}
                                        />
                                    </td>
                                    <td>{movie.title || 'Chưa cập nhật'}</td>
                                    <td>{movie.genres.map(genre => genre.name).join(', ') || 'Chưa có thể loại'}</td>
                                    <td>{new Date(movie.releaseDate).toLocaleDateString() || 'Chưa có ngày'}</td>
                                    <td>
                                    <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={movie.status}
                                        onChange={() => updateStatusMovie(movie.id)}
                                    />
                                    <span className="slider round"></span>
                                     </label>
                                     </td>
                                    <td>
                                        <button
                                            className="action-button view-button"
                                            onClick={() => handleViewMovie(movie.id)}
                                        >
                                            <FontAwesomeIcon icon={faEye} />
                                        </button>
                                        <button
                                            className="action-button edit-button"
                                            onClick={() => handleEditMovie(movie.id)}
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                            className="action-button delete-button"
                                            onClick={() => handleDeleteMovie(movie.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                    ) : (
                        <tr>
                            <td colSpan="7">Không có phim nào</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    className="pagination-button"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span>Trang {currentPage}</span>
                <button
                    className="pagination-button"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage * recordsPerPage >= filteredMovies.length}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
};

export default Movies;
