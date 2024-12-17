import React, { useState, useEffect } from "react";
import "./Movies.css";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEdit,
    faTrashCan,
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import {
    addMovie,
    deleteMovie,
    editMovie,
    getAllGenres,
    getAllLanguage,
    getAllMovies,
    getMovieById,
    updateStatusMovie,
    getMovieDetails
} from "../config/MovieConfig";
import axios from 'axios';

Modal.setAppElement("#root");

const Movies = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [genres, setGenres] = useState([]);
    const [languages, setLanguages] = useState([]); // Add this line to define the languages state
    const [newMovie, setNewMovie] = useState({
        title: '',
        duration: '',
        releaseDate: '',
        description: '',
        director: '',
        language: '',
        cast: '',
        genre: [],
        image: null,
        trailer: null
    });

    const [selectedMovie, setSelectedMovie] = useState({
        id: '',
        title: '',
        duration: '',
        releaseDate: '',
        description: '',
        director: '',
        language: '',
        cast: '',
        genre: [],
        image: '',
        trailer: ''
    });
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState(''); // Selected genre to filter movies

    // Fetch movies and genres from API
    useEffect(() => {
        fetchMovies();
        fetchGenres();
        fetchLanguages(); // Fetch languages
    }, []);

    useEffect(() => {
        filterMoviesByGenre();
    }, [selectedGenre]);

    const fetchMovies = async () => {
        try {
            setLoading(true); // Bật trạng thái loading trước khi fetch
            const response = await getAllMovies(); // Gọi API lấy danh sách phim
            if (Array.isArray(response)) { 
                // Kiểm tra nếu response là mảng
                setMovies(response);
                setFilteredMovies(response);
            } else {
                console.error("Response không phải là mảng:", response);
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false); // Tắt trạng thái loading dù thành công hay lỗi
        }
    };

    // useEffect để gọi fetchMovies khi component được mount
    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await getAllGenres();
            setGenres(response);
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    };

    const fetchLanguages = async () => {
        try {
            const response = await getAllLanguage();
            setLanguages(response); // Set languages in state
        } catch (error) {
            console.error("Error fetching languages:", error);
        }
    };

    const handleDurationChange = (e) => {
        const value = e.target.value;

        // Kiểm tra xem giá trị có phải là số hợp lệ và không rỗng
        if (/^\d*$/.test(value)) {
            setNewMovie({ ...newMovie, duration: value });
        }
    };


    // Thêm phim

    const validateNewMovie = (movie) => {
        const today = new Date();
        const releaseDate = new Date(movie.releaseDate);

        // Kiểm tra tất cả các điều kiện
        if (
            !movie.title ||                   
            !movie.releaseDate ||             
            !movie.genre.length ||            
            !movie.description ||             
            !movie.duration ||                
            isNaN(Number(movie.duration)) ||  
            Number(movie.duration) <= 0       
        ) {
            return false;
        }
        return true;
    };

    const handleReleaseDateChange = (e) => {
        setNewMovie({ ...newMovie, releaseDate: e.target.value });
    };


    const handleGenreChange = (event) => {
        const selectedGenres = Array.from(event.target.selectedOptions, option => {
            return genres.find(g => g.name === option.value); // Lấy toàn bộ đối tượng genre
        });
        setNewMovie({ ...newMovie, genre: selectedGenres });
    };

    // Handle language change
    const handleLanguageChange = (e) => {
        const selectedLanguage = languages.find(lang => lang.name === e.target.value);
        setNewMovie({ ...newMovie, language: selectedLanguage }); // Cập nhật bằng đối tượng ngôn ngữ
    };


    // Xem chi tiết phim
    const handleViewMovie = (id) => {
        navigate(`/admin/movie-detail`, { state: { id } }); // Chuyển hướng đến trang chi tiết với `id` được truyền qua state
    };



    const handleAddMovie = async () => {
        if (!validateNewMovie(newMovie)) {
            alert("Vui lòng kiểm tra lại thông tin. Một số trường bắt buộc đang bị bỏ trống.");
            return;
        }
        const formData = new FormData();

        // Gửi đối tượng movie dưới dạng chuỗi JSON
        // formData.append('movie', JSON.stringify(newMovie));

        const genreid = newMovie.genre.map(genre => genre.id);
        formData.append('title', newMovie.title);
        formData.append('duration', newMovie.duration);
        formData.append('releaseDate', newMovie.releaseDate);
        formData.append('description', newMovie.description);
        formData.append('director', newMovie.director);
        formData.append("languageID", newMovie.language.id);  // Chuyển đổi language thành chuỗi JSON
        formData.append('cast', newMovie.cast);
        formData.append('genreID', genreid);


        // Kiểm tra tệp ảnh
        if (newMovie.image) {
            const image = newMovie.image;
            const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!allowedImageTypes.includes(image.type)) {
                alert("Hình ảnh phải có định dạng JPG hoặc PNG.");
                return;
            }
            formData.append('image', image);  
        } else {
            alert("Vui lòng chọn hình ảnh cho phim.");
            return;
        }

        // Kiểm tra tệp trailer
        if (newMovie.trailer) {
            const trailer = newMovie.trailer;
            const allowedTrailerTypes = ['video/mp4', 'video/webm', 'video/ogg'];
            if (!allowedTrailerTypes.includes(trailer.type)) {
                alert("Trailer phải có định dạng video hợp lệ (mp4, webm, ogg).");
                return;
            }
            formData.append('trailer', trailer);
        }
        else {
            alert("Vui lòng chọn trailer cho phim.");
            return;
        }
      

        const response = await addMovie(formData);
        if (response) {
            const genre = genres.filter(genre => response.genre.some(g => g.id === genre.id));
            const movieData = {
                id: response.id,
                title: response.title,
                duration: response.duration,
                releaseDate: response.releaseDate,
                image: response.image,
                status: response.status,
                countShowtime: 0,
                genre
            }
            console.log(response);
            setMovies([...movies, movieData]);
            setFilteredMovies([...filteredMovies, movieData]);
            setNewMovie({
                title: '',
                duration: '',
                releaseDate: '',
                description: '',
                director: '',
                language: '',
                cast: '',
                genre: []
            });
            alert("Thêm phim thành công!");
            setIsAddModalOpen(false);
        } else {
            alert("Thêm phim thất bại! Vui lòng thử lại sau.");

        }
    };
    useEffect(() => {
        console.log(movies);
    }, [movies]);

    // Đổi trạng thái phim
    const updateStatusOfMovie = async (id) => {
        try {
            await updateStatusMovie(id);
            fetchMovies();
        } catch (error) {
            console.error('Error updating status:', error);
            alert("Cập nhật trạng thái thất bại!");
        }
    };


    // Lấy thông tin chi tiết phim
    const handleEditMovie = async (movieId) => {
        console.log(movieId);
        const response = await getMovieById(movieId);
        setSelectedMovie({
            id: response.id,
            title: response.title || '',
            duration: response.duration || '',
            releaseDate: response.releaseDate || '',
            description: response.description || '',
            director: response.director || '',
            cast: response.cast || '',
            language: response.language || null,
            genre: response.genre || [],
            image: response.image || null,
            trailer: response.trailer || null,
        });
        setIsEditModalOpen(true);
    };

    // Lưu các thay đổi sau khi chỉnh sửa thông tin phim
    const handleSaveMovieChanges = async (newMovie) => {
        console.log(newMovie);
        if (!validateNewMovie(newMovie)) {
            alert("Vui lòng kiểm tra lại thông tin. Một số trường bắt buộc đang bị bỏ trống.");
            return;
        }
        const formData = new FormData();

        // Gửi đối tượng movie dưới dạng chuỗi JSON
        // formData.append('movie', JSON.stringify(newMovie));

        // Gửi các trường khác
        const genreid = newMovie.genre.map(genre => genre.id);
        formData.append('id', newMovie.id);
        formData.append('title', newMovie.title);
        formData.append('duration', newMovie.duration);
        formData.append('releaseDate', newMovie.releaseDate);
        formData.append('description', newMovie.description);
        formData.append('director', newMovie.director);
        formData.append("languageID", newMovie.language.id);  // Chuyển đổi language thành chuỗi JSON
        formData.append('cast', newMovie.cast);
        formData.append('genreID', genreid);


        // Kiểm tra tệp ảnh
        if (newMovie.image) {
            if (newMovie.image instanceof File) {
                formData.append("image", newMovie.image);  // Gửi tệp ảnh nếu có
            } else if (typeof newMovie.image === "string") {
                formData.append("image", newMovie.image);  // Gửi URL của ảnh nếu có
            }
        }

        // Kiểm tra và gửi trailer nếu có
        if (newMovie.trailer) {
            if (newMovie.trailer instanceof File) {
                formData.append("trailer", newMovie.trailer);  // Gửi trailer nếu có
            } else if (typeof newMovie.trailer === "string") {
                formData.append("trailer", newMovie.trailer);  // Gửi URL trailer nếu có
            }
        }

        const response = await editMovie(formData);
        if (response) {
            const genre = genres.filter(genre => response.genre.some(g => g.id === genre.id));
            const movieData = {
                id: response.id,
                title: response.title,
                duration: response.duration,
                releaseDate: response.releaseDate,
                image: response.image,
                status: response.status,
                countShowtime: 0,
                genre
            }
            console.log(response);
            setMovies(movies => movies.map(movie => movie.id === movieData.id ? movieData : movie));
            setFilteredMovies(movies => movies.map(movie => movie.id === movieData.id ? movieData : movie));
            setSelectedMovie({
                id: '',
                title: '',
                duration: '',
                releaseDate: '',
                description: '',
                director: '',
                language: '',
                cast: '',
                genre: [],
                image: '',
                trailer: ''
            });
            alert("Sửa phim thành công!");
            setIsEditModalOpen(false);
        } else {
            alert("Sửa phim thất bại! Vui lòng thử lại sau.");

        }
    };



    // Thay đổi thể loại khi chỉnh sửa
    const handleGenreChangeInEdit = (e) => {
        const selectedGenres = Array.from(e.target.selectedOptions, (option) => option.value);

        // Cập nhật lại genres cho movie đang được chỉnh sửa
        setSelectedMovie((prevMovie) => ({
            ...prevMovie,
            genre: genres.filter(genre => selectedGenres.includes(genre.name)), // Chỉ giữ lại các thể loại được chọn
        }));
    };

    // Thay đổi ngôn ngữ khi chỉnh sửa
    const handleLanguageChangeInEdit = (e) => {
        const selectedLanguage = e.target.value;

        // Cập nhật ngôn ngữ cho movie đang được chỉnh sửa
        setSelectedMovie((prevMovie) => ({
            ...prevMovie,
            language: languages.find((language) => language.name === selectedLanguage) || null, // Lấy ngôn ngữ tương ứng
        }));
    };




    // Xóa phim
    const handleDeleteMovie = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa phim này?')) {
            try {
                const response = await deleteMovie(id);
                if(response) {
                    setMovies(movies.filter((m) => m.id !== id));
                    setFilteredMovies(movies.filter((m) => m.id !== id));
                    alert('Xóa phim thành công!');
                }
                else {
                    alert('Xóa phim thất bại!');
                }
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
                    movie.genre.some((genre) => genre.name === selectedGenre)
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

                <button className="add-button" onClick={() => setIsAddModalOpen(true)}>
                    Thêm
                </button>
            </div>

            {/* Modal for adding movie */}
            <Modal
                isOpen={isAddModalOpen}
                onRequestClose={() => setIsAddModalOpen(false)}
                contentLabel="Thêm Phim"
            >
                <h2>Thêm Phim Mới</h2>
                <div>
                    {/* Tên Phim */}
                    <div>
                        <label>Tên Phim:</label>
                        <input
                            type="text"
                            value={newMovie.title}
                            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                            placeholder="Nhập tên phim"
                            required
                        />
                    </div>

                    {/* Thời lượng */}
                    <div>
                        {<label>Thời lượng (phút):</label>}
                        <input
                            type="number"
                            value={newMovie.duration}
                            onChange={handleDurationChange}
                            placeholder="Nhập thời gian phim"
                            required
                        />

                    </div>


                    {/* Thể loại */}
                    <div>
                        <label>Thể loại:</label>
                        <select
                            multiple
                            value={newMovie.genre.map(genre => genre.name)}
                            onChange={handleGenreChange}
                        >
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.name}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Ngày khởi chiếu */}
                    <div>
                        <label>Ngày khởi chiếu:</label>
                        <input
                            type="date"
                            value={newMovie.releaseDate}
                            onChange={(e) => setNewMovie({ ...newMovie, releaseDate: e.target.value })}
                            required
                        />
                    </div>

                    {/* Mô tả */}
                    <div>
                        <label>Mô tả:</label>
                        <textarea
                            value={newMovie.description}
                            onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                            placeholder="Nhập mô tả phim"
                        />
                    </div>

                    {/* Đạo diễn */}
                    <div>
                        <label>Đạo diễn:</label>
                        <input
                            type="text"
                            value={newMovie.director}
                            onChange={(e) => setNewMovie({ ...newMovie, director: e.target.value })}
                            placeholder="Nhập tên đạo diễn"
                        />
                    </div>

                    {/* Language */}
                    {/* Ngôn ngữ */}
                    <div>
                        <label>Ngôn ngữ:</label>
                        <select
                            value={newMovie.language?.name || ''}
                            onChange={handleLanguageChange}
                            required
                        >
                            <option value="">Chọn ngôn ngữ</option>
                            {languages.map((language) => (
                                <option key={language.id} value={language.name}>
                                    {language.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Diễn viên */}
                    <div>
                        <label>Diễn viên:</label>
                        <input
                            type="text"
                            value={newMovie.cast}
                            onChange={(e) => setNewMovie({ ...newMovie, cast: e.target.value })}
                            placeholder="Nhập tên diễn viên"
                        />
                    </div>

                    {/* Upload hình ảnh */}
                    <div>
                        <label>Hình ảnh:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setNewMovie({ ...newMovie, image: e.target.files[0] })}
                        />
                    </div>

                    {/* Upload trailer */}
                    <div>
                        <label>Trailer:</label>
                        <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => setNewMovie({ ...newMovie, trailer: e.target.files[0] })}
                        />
                    </div>

                    {/* Các nút */}
                    <div className="modal-buttons-container">
                        <button type="button" onClick={handleAddMovie}>Thêm Phim</button>
                        <button type="button" onClick={() => setIsAddModalOpen(false)}>Hủy</button>
                    </div>
                </div>
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
                                            src={movie.image}
                                            alt={movie.title}
                                        />
                                    </td>
                                    <td>{movie.title || 'Chưa cập nhật'}</td>
                                    <td>{movie.genre.map(genre => genre.name).join(', ') || 'Chưa có thể loại'}</td>
                                    <td>{new Date(movie.releaseDate).toLocaleDateString() || 'Chưa có ngày'}</td>
                                    <td>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={movie.status}
                                                onChange={() => updateStatusOfMovie(movie.id)}
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
                                        {movie.countShowtime === 0 && (
                                            <button
                                                className="action-button delete-button"
                                                onClick={() => handleDeleteMovie(movie.id)}
                                            >
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </button>
                                        )}
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

            {/* Modal for editing movie */}
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                contentLabel="Sửa Phim"
                className="Modal__Content"
                overlayClassName="Modal__Overlay"
            >
                <h2>Sửa Phim</h2>
                <div>
                    {/* Tên Phim */}
                    <div>
                        <label>Tên Phim:</label>
                        <input
                            type="text"
                            value={selectedMovie?.title || ''}
                            onChange={(e) => setSelectedMovie({ ...selectedMovie, title: e.target.value })}
                            placeholder="Nhập tên phim"
                            required
                        />
                    </div>

                    {/* Thời lượng */}
                    <div>
                        <label>Thời lượng (phút):</label>
                        <input
                            type="number"
                            value={selectedMovie?.duration || ''}
                            onChange={(e) => setSelectedMovie({ ...selectedMovie, duration: e.target.value })}
                            placeholder="Nhập thời gian phim"
                            required
                        />
                    </div>

                    {/* Thể loại */}
                    <div>
                        <label>Thể loại:</label>
                        <select
                            multiple
                            value={selectedMovie?.genre.map(genre => genre.name) || []}
                            onChange={handleGenreChangeInEdit}
                        >
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.name}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Ngày khởi chiếu */}
                    <div>
                        <label>Ngày khởi chiếu:</label>
                        <input
                            type="date"
                            value={selectedMovie?.releaseDate || ''}
                            onChange={(e) => setSelectedMovie({ ...selectedMovie, releaseDate: e.target.value })}
                            required
                        />
                    </div>

                    {/* Mô tả */}
                    <div>
                        <label>Mô tả:</label>
                        <textarea
                            value={selectedMovie?.description || ''}
                            onChange={(e) => setSelectedMovie({ ...selectedMovie, description: e.target.value })}
                            placeholder="Nhập mô tả phim"
                        />
                    </div>

                    {/* Đạo diễn */}
                    <div>
                        <label>Đạo diễn:</label>
                        <input
                            type="text"
                            value={selectedMovie?.director || ''}
                            onChange={(e) => setSelectedMovie({ ...selectedMovie, director: e.target.value })}
                            placeholder="Nhập tên đạo diễn"
                        />
                    </div>

                    {/* Ngôn ngữ */}
                    <div>
                        <label>Ngôn ngữ:</label>
                        <select
                            value={selectedMovie?.language?.name || ''}
                            onChange={handleLanguageChangeInEdit}
                            required
                        >
                            <option value="">Chọn ngôn ngữ</option>
                            {languages.map((language) => (
                                <option key={language.id} value={language.name}>
                                    {language.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Diễn viên */}
                    <div>
                        <label>Diễn viên:</label>
                        <input
                            type="text"
                            value={selectedMovie?.cast || ''}
                            onChange={(e) => setSelectedMovie({ ...selectedMovie, cast: e.target.value })}
                            placeholder="Nhập tên diễn viên"
                        />
                    </div>

                    {/* Hình ảnh */}
                    <div>
                        <label>Hình ảnh:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setSelectedMovie({ ...selectedMovie, image: e.target.files[0] })}
                        />
                        {selectedMovie?.image && typeof selectedMovie.image === "string" && (
                            <div>
                                <p>Hình ảnh hiện tại:</p>
                                <img src={selectedMovie.image} alt="Movie Poster" style={{ width: '100px', height: '150px' }} />
                            </div>
                        )}
                    </div>

                    {/* Trailer */}
                    <div>
                        <label>Trailer:</label>
                        <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => setSelectedMovie({ ...selectedMovie, trailer: e.target.files[0] })}
                        />
                        {selectedMovie?.trailer && typeof selectedMovie.trailer === "string" && (
                            <div>
                                <p>Trailer hiện tại:</p>
                                <a href={selectedMovie.trailer} target="_blank" rel="noopener noreferrer">
                                    Xem Trailer
                                </a>
                            </div>
                        )}
                    </div>


                    {/* Các nút */}
                    <div className="modal-buttons-container">
                        <button type="button" onClick={() => handleSaveMovieChanges(selectedMovie)}>Cập nhật</button>
                        <button type="button" onClick={() => setIsEditModalOpen(false)}>Hủy</button>
                    </div>
                </div>
            </Modal>


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