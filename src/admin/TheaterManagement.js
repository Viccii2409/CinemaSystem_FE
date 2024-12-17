
import React, { useState, useEffect } from 'react'; 
import './TheaterManagement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { updateStatusTheater, addTheater, getTheaterById, editTheater, deleteTheater, getTheater, getAllTheater } from '../config/TheaterConfig.js';


const CinemaManagement = () => {
  const [theaters, setTheaters] = useState([]); 
  const [formDataState, setFormDataState] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchTheater = async () => {
      const response = await getAllTheater();
      if(response) {
        setTheaters(response);
      }
      else {
        console.error("Lỗi khi lấy danh sách rạp:");
        return;
      }
    };

    fetchTheater(); 
  }, []); 

  const handleStatusChange = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus; 
      await updateStatusTheater(id); 
      setTheaters(
        theaters.map((theater) =>
          theater.id === id ? { ...theater, status: updatedStatus } : theater
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };


  const handleAddCinema = () => {
    setShowAddModal(true);
  };

  const handleViewCinema = async (id) => {
    const response = await getTheaterById(id);
    if (response) {
      setFormDataState(response);
      setShowViewModal(true);
    }
  };

  const handleEditCinema = async (id) => {
    const response = await getTheaterById(id);
    if (response) {
      setFormDataState(response);
      setShowEditModal(true);
    }
  };

  const handleDeleteCinema = async (id) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa phòng không?");
    if (confirmed) {
      const response = await deleteTheater(id);
      if(response) {
        setTheaters(prevTheaters => prevTheaters.filter(theater => theater.id !== parseInt(id)));
        alert("Phòng đã được xóa thành công.");
        return;
      }
      else {
        alert("Xóa phòng thất bại.");
        return;
      }
    } else {
      alert("Hủy xóa phòng.");
    }
  }

  const handleCloseModal = () => {
    setFormDataState([]);
    setShowAddModal(false);
    setShowViewModal(false);
    setShowEditModal(false);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const newTheater = await addTheater(formDataState);
      if(newTheater) {
        setTheaters((prevList) => [...prevList, newTheater]);
        handleCloseModal();
        alert("Thêm rạp thành công!");
      }
      else {
        alert("Thêm rạp thất bạibại!");
        return;
      }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedTheater = await editTheater(formDataState);
      if(updatedTheater) {
        setTheaters((prevList) =>
          prevList.map((theater) =>
            theater.id === updatedTheater.id ? updatedTheater : theater
          )
        );
        handleCloseModal();
        alert("Sửa rạp thành công!");
      }
      else {
        alert("Sửa rạp thất bại!");
        return;
      }
  };

  return (
    <div className="cinema-management-system">
      <h2>Quản lý rạp</h2>
      <button className="add-button button" onClick={handleAddCinema}>Thêm</button>
      {theaters.length > 0 ? (
        <table className="cinema-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên rạp</th>
              <th>Địa chỉ</th>
              <th>Số phòng</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {theaters.map((theater, index) => (
              <tr key={theater.id}>
                <td>{index + 1}</td>
                <td>{theater.name}</td>
                <td>{theater.address}</td>
                <td>{theater.quantityRoom}</td>
                <td>
                  <label className="switch"> {/* Thay class thành className */}
                    <input
                      type="checkbox"
                      checked={theater.status}
                      onChange={() => handleStatusChange(theater.id, theater.status)}
                    />
                    <span className="slider round"></span> {/* Thay class thành className */}
                  </label>
                </td>
                <td>
                  <button className="view-button" onClick={() => handleViewCinema(theater.id)}>
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button className="edit-button" onClick={() => handleEditCinema(theater.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  {theater.quantityRoom === 0 && (
                    <button className="delete-button" onClick={() => handleDeleteCinema(theater.id)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>) : (
        <p>Không có rạp</p>
      )}

      {showAddModal && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <div className="modal-header">Thêm rạp mới</div>
            <form
              className="modal-info"
              onSubmit={handleAddSubmit}
              encType="multipart/form-data"
            >
              <div className="form-group">
                <div className="form-group form-row">
                  <div className="form-column">
                    <label>
                      <strong>Tên:</strong>
                      <input
                        type="text"
                        name="name"
                        className="modal-input"
                        value={formDataState.name}
                        onChange={(e) => setFormDataState({ ...formDataState, name: e.target.value.toUpperCase() })}
                        required
                      />
                      <br />
                    </label>
                  </div>
                  <div className="form-column">
                    <label>
                      <strong>Số điện thoại:</strong>
                      <input
                        type="phone"
                        name="phone"
                        className="modal-input"
                        value={formDataState.phone}
                        onChange={(e) => setFormDataState({ ...formDataState, phone: e.target.value })}
                        required
                      />
                      <br />
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group form-row">
                <div className="form-column">
                  <label>
                    <strong>Email:</strong>
                    <input
                      type="email"
                      name="email"
                      className="modal-input"
                      value={formDataState.email}
                      onChange={(e) => setFormDataState({ ...formDataState, email: e.target.value })}
                      required
                    />
                    <br />
                  </label>
                </div>
                <div className="form-column">
                  <label>
                    <strong>Hình ảnh:</strong>
                    <input
                      type="file"
                      name="image"
                      className="modal-input"
                      onChange={(e) => setFormDataState({ ...formDataState, image: e.target.files[0] })}
                      required
                    />
                    <br />
                  </label>
                </div>
              </div>

              <div className="form-group form-row">
                <div className="form-column">
                  <label>
                    <strong>Địa chỉ chi tiết:</strong>
                    <input
                      type="text"
                      name="address"
                      className="modal-input"
                      value={formDataState.address}
                      onChange={(e) => setFormDataState({ ...formDataState, address: e.target.value })}
                      required
                    />
                    <br />
                  </label>
                </div>
                <div className="form-column">
                  <label>
                    <strong>Xã:</strong>
                    <input
                      type="text"
                      name="ward"
                      className="modal-input"
                      value={formDataState.ward}
                      onChange={(e) => setFormDataState({ ...formDataState, ward: e.target.value })}
                      required
                    />
                    <br />
                  </label>
                </div>
              </div>

              <div className="form-group form-row">
                <div className="form-column">
                  <label>
                    <strong>Huyện:</strong>
                    <input
                      type="text"
                      name="district"
                      className="modal-input"
                      value={formDataState.district}
                      onChange={(e) => setFormDataState({ ...formDataState, district: e.target.value })}
                      required
                    />
                    <br />
                  </label>
                </div>
                <div className="form-column">
                  <label>
                    <strong>Thành phố:</strong>
                    <input
                      type="text"
                      name="city"
                      className="modal-input"
                      value={formDataState.city}
                      onChange={(e) => setFormDataState({ ...formDataState, city: e.target.value })}
                      required
                    />
                    <br />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <strong>Mô tả:</strong>
                  <textarea
                    name="description"
                    className="modal-input"
                    rows="10"
                    value={formDataState.description}
                    onChange={(e) => setFormDataState({ ...formDataState, description: e.target.value })}
                  ></textarea>
                  <br />
                </label>
              </div>

              <div className="modal-buttons">
                <button className="close-button" onClick={handleCloseModal}>
                  Hủy
                </button>
                <button className="save-button" type="submit">
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {showViewModal && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <div className="modal-header">Xem rạp</div>
            <form className="modal-info">
              <div className="form-group">
                <div className="form-group form-row">
                  <div className="form-column">
                    <label>
                      <strong>Hình ảnh:</strong>
                      <img
                        src={formDataState.image}
                        alt="Theater"
                        className="modal-image"
                      />
                    </label>
                  </div>
                  <div className="form-column">
                    <label>
                      <strong>Tên:</strong>
                      <input
                        type="text"
                        name="name"
                        className="modal-input"
                        value={formDataState.name}
                        readOnly
                      />
                      <br />
                    </label>
                    <label>
                      <strong>Số phòng:</strong>
                      <input
                        type="text"
                        name="quantityRoom"
                        className="modal-input"
                        value={
                          formDataState.quantityRoom > 0
                            ? formDataState.quantityRoom
                            : "0"
                        }
                        readOnly
                      />
                      <br />
                    </label>
                    <label>
                      <strong>Tình trạng:</strong>
                      <input
                        type="text"
                        name="status"
                        className="modal-input"
                        value={
                          formDataState.status === true
                            ? "Đang hoạt động"
                            : "Không hoạt động"
                        }
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                </div>
                <div className="form-group form-row">
                  <div className="form-column">
                    <label>
                      <strong>Email:</strong>
                      <input
                        type="text"
                        name="email"
                        className="modal-input"
                        value={formDataState.email}
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                  <div className="form-column">
                    <label>
                      <strong>Số điện thoại:</strong>
                      <input
                        type="text"
                        name="phone"
                        className="modal-input"
                        value={formDataState.phone}
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group form-row">
                <div className="form-column">
                  <label>
                    <strong>Địa chỉ chi tiết:</strong>
                    <input
                      type="text"
                      name="address"
                      className="modal-input"
                      value={formDataState.address}
                      readOnly
                    />
                    <br />
                  </label>
                </div>
                <div className="form-column">
                  <label>
                    <strong>Xã:</strong>
                    <input
                      type="text"
                      name="ward"
                      className="modal-input"
                      value={formDataState.ward}
                      readOnly
                    />
                    <br />
                  </label>
                </div>
              </div>

              <div className="form-group form-row">
                <div className="form-column">
                  <label>
                    <strong>Huyện:</strong>
                    <input
                      type="text"
                      name="district"
                      className="modal-input"
                      value={formDataState.district}
                      readOnly
                    />
                    <br />
                  </label>
                </div>
                <div className="form-column">
                  <label>
                    <strong>Thành phố:</strong>
                    <input
                      type="text"
                      name="city"
                      className="modal-input"
                      value={formDataState.city}
                      readOnly
                    />
                    <br />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <strong>Mô tả:</strong>
                  <textarea
                    name="description"
                    className="modal-input"
                    rows="10"
                    value={formDataState.description}
                    readOnly
                  ></textarea>
                  <br />
                </label>
              </div>

              <div className="modal-buttons">
                <button className="close-button" onClick={handleCloseModal}>
                  Thoát
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {showEditModal && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <div className="modal-header">Sửa rạp</div>
            <form
              className="modal-info"
              onSubmit={handleEditSubmit}
              encType="multipart/form-data"
            >
              <div className="form-group">
                <div className="form-group form-row">
                  <div className="form-column">
                    <label>
                      <strong>Tên:</strong>
                      <input
                        type="text"
                        name="name"
                        className="modal-input"
                        value={formDataState.name}
                        onChange={(e) => setFormDataState({ ...formDataState, name: e.target.value.toUpperCase() })}
                        required
                      />
                      <br />
                    </label>
                  </div>
                  <div className="form-column">
                    <label>
                      <strong>Số điện thoại:</strong>
                      <input
                        type="text"
                        name="phone"
                        className="modal-input"
                        value={formDataState.phone}
                        onChange={(e) => setFormDataState({ ...formDataState, phone: e.target.value })}
                        required
                      />
                      <br />
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group form-row">
                <div className="form-column">
                  <label>
                    <strong>Email:</strong>
                    <input
                      type="text"
                      name="email"
                      className="modal-input"
                      value={formDataState.email}
                      onChange={(e) => setFormDataState({ ...formDataState, email: e.target.value })}
                      required
                    />
                    <br />
                  </label>
                </div>
                <div className="form-column image_old">
                  <label>
                    <strong>Hình ảnh:</strong><br />

                    <img src={formDataState.image} alt="Theater" className="modal-image_2" />
                    <input
                      type="file"
                      name="image"
                      className='fileImage'
                      onChange={(e) => setFormDataState({ ...formDataState, image: e.target.files[0] })}
                    /><br />
                  </label>
                </div>
              </div>

              <div className="form-group form-row">
                <div className="form-column">
                  <label>
                    <strong>Địa chỉ chi tiết:</strong>
                    <input
                      type="text"
                      name="address"
                      className="modal-input"
                      value={formDataState.address}
                      onChange={(e) => setFormDataState({...formDataState, address : e.target.value})}
                      required
                    />
                    <br />
                  </label>
                </div>
                <div className="form-column">
                  <label>
                    <strong>Xã:</strong>
                    <input
                      type="text"
                      name="ward"
                      className="modal-input"
                      value={formDataState.ward}
                      onChange={(e) => setFormDataState({...formDataState, ward : e.target.value})}
                      required
                    />
                    <br />
                  </label>
                </div>
              </div>

              <div className="form-group form-row">
                <div className="form-column">
                  <label>
                    <strong>Huyện:</strong>
                    <input
                      type="text"
                      name="district"
                      className="modal-input"
                      value={formDataState.district}
                      onChange={(e) => setFormDataState({...formDataState, district : e.target.value})}
                      required
                    />
                    <br />
                  </label>
                </div>
                <div className="form-column">
                  <label>
                    <strong>Thành phố:</strong>
                    <input
                      type="text"
                      name="city"
                      className="modal-input"
                      value={formDataState.city}
                      onChange={(e) => setFormDataState({...formDataState, city : e.target.value})}
                      required
                    />
                    <br />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <strong>Mô tả:</strong>
                  <textarea
                    name="description"
                    className="modal-input"
                    rows="10"
                    value={formDataState.description}
                    onChange={(e) => setFormDataState({...formDataState, description : e.target.value})}
                  ></textarea>
                  <br />
                </label>
              </div>

              <div className="modal-buttons">
                <button className="close-button" onClick={handleCloseModal}>
                  Hủy
                </button>
                <button className="save-button" type="submit">
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default CinemaManagement;
