import React, { useState, useEffect } from 'react';
import './MovieCategoriesService'; // Đảm bảo đường dẫn chính xác, có thể bỏ nếu không cần
import './MovieCategories.css';
import MovieCategoriesService from './MovieCategoriesService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getAllGenres } from '../config/MovieConfig.js';

const MovieCategories = () => {
    
    const recordsPerPage  = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [currentRecords, setCurrentRecords] = useState([]);
    const [statusUpdate, setStatusUpdate] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewPopup, setShowViewPopup] = useState(false);
    const [newGenre, setNewGenre] = useState({ name: '', description: '' });
    const [selectedGenre, setSelectedGenre] = useState(null);
   

    useEffect(() => {
        const fetchTheater = async () => {
            const response = await getAllGenres();
            // console.log(response.data);
    
            // Sử dụng response.data trực tiếp để lọc và phân trang
            const filtered = response.data.filter(genre =>
                genre.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            // console.log(filtered);
            const totalPages = Math.ceil(filtered.length / recordsPerPage);
            setTotalPages(totalPages);
    
            
            // console.log(recordsPerPage);
            const currentRecords = filtered.slice(
                (currentPage - 1) * recordsPerPage,
                currentPage * recordsPerPage
            );
            // console.log(currentRecords);
            setCurrentRecords(currentRecords);
        };
        fetchTheater();
        setStatusUpdate(false);
    }, [currentPage, searchTerm, recordsPerPage, statusUpdate]);
    
    


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

    // useEffect(() => {
    //     // Cập nhật danh sách thể loại đã lọc khi có thay đổi trong searchTerm hoặc genres
    //     const filtered = genres.filter(genre =>
    //         genre.name.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    //     setFilteredGenres(filtered);
    //     setCurrentPage(1); // Reset về trang đầu khi có thay đổi
    // }, [searchTerm, genres]);

    // const loadGenres = () => {
    //     MovieCategoriesService.getAllGenres()
    //         .then(response => {
    //             setGenres(response.data);
    //             setFilteredGenres(response.data); // Thiết lập danh sách ban đầu
    //         })
    //         .catch(error => console.error('Error fetching genres:', error));
    // };

    const handleAddGenre = () => {
        MovieCategoriesService.addGenre(newGenre)
            .then(() => {
                setStatusUpdate(true);
                setShowAddModal(false);
                setNewGenre({ name: '', description: '' });
            })
            .catch(error => console.error('Error adding genre:', error));
    };

    const handleUpdateGenre = () => {
        if (selectedGenre) {
            MovieCategoriesService.updateGenre(selectedGenre.id, selectedGenre)
                .then(() => {
                    // loadGenres();
                    setStatusUpdate(true);
                    setShowEditModal(false);
                })
                .catch(error => console.error('Error updating genre:', error));
        }
    };

    const handleHideGenre = (id) => {
        MovieCategoriesService.hideGenre(id)
            .then(() => {
                setStatusUpdate(true);})
            .catch(error => console.error('Error hiding genre:', error));
    };

    const handleViewGenre = (genre) => {
        setSelectedGenre(genre);
        setShowViewPopup(true);
    };

    const handleEditGenre = (genre) => {
        setSelectedGenre(genre);
        setShowEditModal(true); // Mở modal sửa
    };

    // Phân trang
    

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
