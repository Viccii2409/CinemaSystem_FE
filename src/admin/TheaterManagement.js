
import React, { useState, useEffect } from 'react'; // Thêm useEffect
import './TheaterManagement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { updateStatusTheater, addTheater, getTheaterById, editTheater, deleteTheater, getTheater } from '../config/TheaterConfig.js';


const CinemaManagement = () => {
  const [theaters, setTheaters] = useState([]); // Khởi tạo state cinemas để lưu dữ liệu từ API

  // Hàm gọi API lấy danh sách rạp
  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const response = await getTheater();
        setTheaters(response.data); // Lưu dữ liệu vào state cinemas
      } catch (error) {
        console.error("Lỗi khi lấy danh sách rạp:", error);
      }
    };

    fetchTheater(); // Gọi hàm fetchTheater khi component được render lần đầu
  }, []); // Đóng ngoặc vuông để hoàn tất dependency array và gọi chỉ khi component render lần đầu

  const handleStatusChange = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus; // Đảo ngược trạng thái hiện tại
      await updateStatusTheater(id); // Gọi API PUT để cập nhật trạng thái
      // Cập nhật lại danh sách theaters sau khi trạng thái đã thay đổi thành công
      setTheaters(
        theaters.map((theater) =>
          theater.id === id ? { ...theater, status: updatedStatus } : theater
        )
      );
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };

  const [formDataState, setFormDataState] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    ward: "",
    district: "",
    city: "",
    description: "",
    image: null,
    quantityRoom: "",
    status: "",
    id: "",
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleAddCinema = () => {
    setShowAddModal(true);
  };

  const handleViewCinema = async (id) => {
    if (!id) {
      console.error("ID không hợp lệ:", id);
      return;
    }

    try {
      const response = await getTheaterById(id);
      const theaterData = response.data;

      if (theaterData) {
        // Kiểm tra và trích xuất các giá trị, đảm bảo các giá trị lồng không bị null hoặc undefined
        console.log(theaterData);
        setFormDataState({
          name: theaterData.name || "",
          phone: theaterData.phone || "",
          email: theaterData.email || "",
          address: theaterData.address?.addressDetail || "",
          ward: theaterData.address?.ward?.name || "", // Sử dụng optional chaining để tránh lỗi khi address hoặc ward là null/undefined
          district: theaterData.address?.district?.name || "",
          city: theaterData.address?.city?.name || "",
          description: theaterData.description || "",
          image: theaterData.image || "",
          quantityRoom: theaterData.quantityRoom || "",
          status: theaterData.status || "",
          id: theaterData.id || "",
        });

        setShowViewModal(true);
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "Lỗi từ server:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("Không nhận được phản hồi từ server:", error.request);
      } else {
        console.error("Lỗi khi thiết lập yêu cầu:", error.message);
      }
    }
  };

  const handleEditCinema = async (id) => {
    if (!id) {
      console.error("ID không hợp lệ:", id);
      return;
    }

    try {
      const response = await getTheaterById(id);
      const theaterData = response.data;

      if (theaterData) {
        // Kiểm tra và trích xuất các giá trị, đảm bảo các giá trị lồng không bị null hoặc undefined
        console.log(theaterData);
        console.log(theaterData.addressDetail);
        setFormDataState({
          name: theaterData.name || "",
          phone: theaterData.phone || "",
          email: theaterData.email || "",
          address: theaterData.address?.addressDetail || "",
          ward: theaterData.address?.ward?.name || "", // Sử dụng optional chaining để tránh lỗi khi address hoặc ward là null/undefined
          district: theaterData.address?.district?.name || "",
          city: theaterData.address?.city?.name || "",
          description: theaterData.description || "",
          image: theaterData.image || "",
          quantityRoom: theaterData.quantityRoom || "",
          status: theaterData.status || "",
          id: theaterData.id || "",
        });

        setShowEditModal(true);
      }
    } catch (error) {
      if (error.response) {
        console.error(
          "Lỗi từ server:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        console.error("Không nhận được phản hồi từ server:", error.request);
      } else {
        console.error("Lỗi khi thiết lập yêu cầu:", error.message);
      }
    }
  };

  const handleDeleteCinema = async (id) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa phòng không?");
    if (confirmed) {
      await deleteTheater(id);
      setTheaters(prevTheaters => prevTheaters.filter(theater => theater.id !== parseInt(id)));
      alert("Phòng đã được xóa thành công.");
    } else {
      alert("Hủy xóa phòng.");
    }
  }



  const handleCloseModal = () => {
    setFormDataState({
      name: "",
      phone: "",
      email: "",
      address: "",
      commune: "",
      district: "",
      city: "",
      description: "",
      image: null,
      quantityRoom: "",
      status: "",
      id: "",
    });
    setShowAddModal(false);
    setShowViewModal(false);
    setShowEditModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataState({
      ...formDataState,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormDataState({
      ...formDataState,
      image: e.target.files[0],
    });
  };

  // const validateFormData = (data) => {
  //   for (let key in data) {
  //     if (data[key] === '' || data[key] === null) {
  //       alert('Vui lòng điền đầy đủ thông tin');
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  const validateFormData = (data) => {
    let check = true;

    // Kiểm tra tên rạp (name)
    if (!data.name || data.name.trim() === "") {
      check = false;
    }

    // Kiểm tra số điện thoại (phone)
    if (!data.phone || data.phone.trim() === "") {
      check = false;
    } else if (!validatePhoneNumber(data.phone)) {
      alert("Số điện thoại không hợp lệ. Vui lòng nhập từ 9 đến 11 chữ số.");
      return false;
    }

    // Kiểm tra email (email)
    if (!data.email || data.email.trim() === "") {
      check = false;
    } else if (!validateEmail(data.email)) {
      alert("Email không hợp lệ. Vui lòng nhập đúng định dạng email.");
      return false;
    }

    // Kiểm tra địa chỉ chi tiết (address)
    if (!data.address || data.address.trim() === "") {
      check = false;
    }

    // Kiểm tra xã (ward)
    if (!data.ward || data.ward.trim() === "") {
      check = false;
    }

    // Kiểm tra huyện (district)
    if (!data.district || data.district.trim() === "") {
      check = false;
    }

    // Kiểm tra thành phố (city)
    if (!data.city || data.city.trim() === "") {
      check = false;
    }

    if (!data.image) {
      check = false;
    }

    if (!check) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return false;
    }
    return true;
  };

  // Hàm kiểm tra định dạng email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Hàm kiểm tra định dạng số điện thoại
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{9,11}$/; // Số điện thoại có từ 9 đến 11 chữ số
    return phoneRegex.test(phone);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateFormData(formDataState)) {
        return;
      }
      const newTheater = await addTheater(formDataState);

      // Sau khi thêm thành công có thể thêm hành động khác (đóng modal, thông báo)
      setTheaters((prevList) => [...prevList, newTheater]);

      // Xóa form sau khi thành công (reset lại state của form)
      setFormDataState({
        name: "",
        phone: "",
        email: "",
        address: "",
        commune: "",
        district: "",
        city: "",
        description: "",
        image: null,
        quantityRoom: "",
        status: "",
        id: "",
      });

      handleCloseModal();
      alert("Thêm rạp thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm rạp:", error);
      // Xử lý lỗi tại đây (hiển thị thông báo lỗi cho người dùng)
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateFormData(formDataState)) {
        return;
      }
      const updatedTheater = await editTheater(formDataState);

      setTheaters((prevList) =>
        prevList.map((theater) =>
          theater.id === updatedTheater.id ? updatedTheater : theater
        )
      );

      // Xóa form sau khi thành công (reset lại state của form)
      setFormDataState({
        name: "",
        phone: "",
        email: "",
        address: "",
        commune: "",
        district: "",
        city: "",
        description: "",
        image: null,
        quantityRoom: "",
        status: "",
        id: "",
      });

      handleCloseModal();
      alert("Sửa rạp thành công!");
    } catch (error) {
      console.error("Lỗi khi sửa rạp:", error);
      // Xử lý lỗi tại đây (hiển thị thông báo lỗi cho người dùng)
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
                  <button className="delete-button" onClick={() => handleDeleteCinema(theater.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleFileChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                    onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                      onChange={handleChange}
                    />
                    <br />
                  </label>
                </div>
                <div className="form-column image_old">
                  <label>
                    <strong>Hình ảnh:</strong><br />

                    <img src={formDataState.image} alt="Theater" className="modal-image_2" />
                    <input type="file" name="image" className='fileImage' onChange={handleFileChange} /><br />
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                    onChange={handleChange}
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
