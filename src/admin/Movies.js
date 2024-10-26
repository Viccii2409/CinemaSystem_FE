import React from 'react';
import './Movies.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';

const Movies = () => {
    return (
        <div className="movies-management">
            <h2>Quản lý phim</h2>
            <div className="search-bar">
                <input type="text" placeholder="Tên" />
                <select className="filter">
                    <option value="">Thể loại</option>
                    <option value="action">Phim hành động</option>
                    <option value="comedy">Phim hài</option>
                    <option value="drama">Phim tâm lý</option>
                </select>
                <button className="search-button">Tìm kiếm</button>
            </div>
            <button className="add-button">Thêm</button>
            <table className="cinema-table">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên phim</th>
                        <th>Tên thể loại</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(10)].map((_, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>Phim {index + 1}</td>
                            <td>Thể loại {index + 1}</td>
                            <td>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked={index % 2 === 0} />
                                    <span className="slider round"></span>
                                </label>
                            </td>
                            <td>
                                <button className="view-button">
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                                <button className="edit-button">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button className="previous-button">Previous</button>
                <span>1 2 3 ... 67 68</span>
                <button className="next-button">Next</button>
            </div>
        </div>
    );
};

export default Movies;