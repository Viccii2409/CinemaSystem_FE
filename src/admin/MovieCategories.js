import React, { useState, useEffect } from 'react';
import './MovieCategoriesService'; // Đảm bảo đường dẫn chính xác, có thể bỏ nếu không cần
import './MovieCategories.css';
import MovieCategoriesService from './MovieCategoriesService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faChevronLeft, faChevronRight, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const MovieCategories = () => {
    const [genres, setGenres] = useState([]);
    const [filteredGenres, setFilteredGenres] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [newGenre, setNewGenre] = useState({ name: '', description: '' });
    const [selectedGenre, setSelectedGenre] = useState(null);
   
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    
    useEffect(() => {
        loadGenres();
    }, []);

    useEffect(() => {
        // Cập nhật danh sách thể loại đã lọc khi có thay đổi trong searchTerm hoặc genres
        const filtered = genres.filter(genre =>
            genre.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredGenres(filtered);
        setCurrentPage(1); // Reset về trang đầu khi có thay đổi
    }, [searchTerm, genres]);

    const loadGenres = async () => {
        try {
            const response = await MovieCategoriesService.getAllGenres();
            setGenres(response.data);
            setFilteredGenres(response.data); // Thiết lập danh sách ban đầu
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const handleAddGenre = async () => {
        if (!newGenre.name.trim()) {
            alert('Tên thể loại không được để trống!');
            return; // Ngừng thêm thể loại nếu tên rỗng
        }
    
        try {
            await MovieCategoriesService.addGenre(newGenre);
            await loadGenres();
            setShowAddModal(false);
            setNewGenre({ name: '', description: '' });
        } catch (error) {
            console.error('Error adding genre:', error);
        }
    };
    
    const handleUpdateGenre = async () => {
        if (selectedGenre) {
            try {
                await MovieCategoriesService.updateGenre(selectedGenre.id, selectedGenre);
                await loadGenres();
                setShowEditModal(false);
            } catch (error) {
                console.error('Error updating genre:', error);
            }
        }
    };

    const handleHideGenre = async (id) => {
        try {
            await MovieCategoriesService.hideGenre(id);
            await loadGenres(); // Tải lại danh sách thể loại nhưng không thay đổi trang hiện tại
            alert("Chuyển trạng thái thành công!")
        } catch (error) {
            console.error('Error hiding genre:', error);
        }
    };

    const handleViewGenre = (genre) => {
        setSelectedGenre(genre);
        setShowViewPopup(true);
    };

    const handleEditGenre = (genre) => {
        setSelectedGenre(genre);
        setShowEditModal(true); // Mở modal sửa
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa thể loại này?')) {
            try {
                await MovieCategoriesService.deleteGenre(id);
                setGenres(genres.filter(genre => genre.id !== id));
                alert("Xóa thể loại thành công!");
            } catch (error) {
                console.error("Error deleting the genre:", error);
                alert("Xóa thể loại thất bại!");
            }
        }
    };

    // Phân trang
    const totalPages = Math.ceil(filteredGenres.length / recordsPerPage);
    const currentRecords = filteredGenres.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="movie-categories-management">
            <h2>Quản lý thể loại</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Tên thể loại"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-button">Tìm kiếm</button>
            </div>
           
            <button className="add-button" onClick={() => setShowAddModal(true)}>Thêm</button>
            <table className="cinema-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên thể loại</th>
                        <th>Mô tả</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((genre, index) => (
                        <tr key={genre.id}>
                            <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                            <td>{genre.name}</td>
                            <td>{genre.description}</td>
                            <td>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        checked={genre.status}
                                        onChange={() => handleHideGenre(genre.id)}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </td>
                            <td>
                                <button className="view-button" onClick={() => handleViewGenre(genre)}>
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                                <button className="edit-button" onClick={() => handleEditGenre(genre)}>
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button className="delete-button" onClick={() => handleDelete(genre.id)}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Popup hiển thị thông tin thể loại */}
            {showViewPopup && selectedGenre && (
                <div className="popup">
                    <h2>Thông tin thể loại</h2>
                    <p><strong>Tên thể loại:</strong> {selectedGenre.name}</p>
                    <p><strong>Mô tả:</strong> {selectedGenre.description}</p>
                    <button onClick={() => setShowViewPopup(false)}>Đóng</button>
                </div>
            )}

            {/* Modal Thêm thể loại */}
            {showAddModal && (
                <div className="modal">
                    <h2>Thêm thể loại</h2>
                    <input
                        type="text"
                        placeholder="Tên thể loại"
                        value={newGenre.name}
                        onChange={(e) => setNewGenre({ ...newGenre, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Mô tả"
                        value={newGenre.description}
                        onChange={(e) => setNewGenre({ ...newGenre, description: e.target.value })}
                    />
                    <button onClick={handleAddGenre}>Thêm</button>
                    <button onClick={() => setShowAddModal(false)}>Đóng</button>
                </div>
            )}

            {/* Modal Sửa thể loại */}
            {showEditModal && selectedGenre && (
                <div className="modal">
                    <h2>Sửa thể loại</h2>
                    <input
                        type="text"
                        placeholder="Tên thể loại"
                        value={selectedGenre.name}
                        onChange={(e) => setSelectedGenre({ ...selectedGenre, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Mô tả"
                        value={selectedGenre.description}
                        onChange={(e) => setSelectedGenre({ ...selectedGenre, description: e.target.value })}
                    />
                    <button onClick={handleUpdateGenre}>Lưu</button>
                    <button onClick={() => setShowEditModal(false)}>Đóng</button>
                </div>
            )}

            {/* Phân trang */}
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span>Trang {currentPage} / {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
        </div>
    );
};

export default MovieCategories;