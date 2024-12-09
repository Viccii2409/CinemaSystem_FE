import React, { useState, useEffect, useContext, useRef } from "react";
import "./UserInfor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { changePassword, getCustomerById, updateImage, updateUser } from "../config/UserConfig";
import { creatPayOnline } from "../config/TicketConfig";
import { AuthContext } from '../context/AuthContext';

const AccountPage = () => {
  const { user, setUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const passwordOldRef = useRef(null);
  const passwordNewRef = useRef(null);
  const passwordNew2Ref = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/login-page');
      return;
    }
    console.log(user);
    const fetchUserInfor = async () => {
      try {
        const response = await getCustomerById(user.id);
        console.log(response);
        if (response) {
          const revenue = response.bookings.reduce((total, entry) => {
            if (entry.statusPayment === "confirmed") {
              return total + entry.amount; 
            }
            return total; 
          }, 0);
          
          setCurrentUser({ ...response, revenue });

        }
      } catch (error) {
        console.error("Error api getCustomerInforById:", error);
      }
    };

    fetchUserInfor();
  }, [user, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    // localStorage.setItem("user", JSON.stringify(currentUser));
    console.log(currentUser);
    const formData = {
      "id": currentUser.id,
      "name": currentUser.name,
      "email": currentUser.email,
      "phone": currentUser.phone,
      "gender": currentUser.gender,
      "dob": currentUser.dob,
      "address": currentUser.address
    }


    console.log(formData);
    const response_check = await updateUser(formData);
    if (response_check) {
      setUser({ ...user, name: currentUser.name, email: currentUser.email, phone: currentUser.phone, gender: currentUser.gender, dob: currentUser.dob, address: currentUser.address });
      alert("Cập nhật thông tin thành công!");
    } else {
      alert("Lỗi khi cập nhật thông tin!");
    }
    return;
  };

  const handleChangePass = () => {
    setShowPasswordModal(true);
  }

  const handleChangeImage = () => {
    setShowImageModal(true);
  }

  const handleCloseModal = () => {
    setShowPasswordModal(false);
    setShowImageModal(false);
  }

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const passwordOld = passwordOldRef.current.value;
    const passwordNew = passwordNewRef.current.value;
    const passwordNew2 = passwordNew2Ref.current.value;
    if (passwordNew !== passwordNew2) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    const formPassData = {
      passwordOld,
      passwordNew,
      "username": currentUser.username,
    };
    // console.log(formPassData);

    const response_change = await changePassword(formPassData);
    if (response_change) {
      alert("Đổi mật khẩu thành công!");
      setShowPasswordModal(false);
    }
    else {
      alert("Mật khẩu không đúng!");
    }

    passwordOldRef.current.value = "";
    passwordNewRef.current.value = "";
    passwordNew2Ref.current.value = "";


  }

  const handleSubmitChangeImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const file = imageRef.current.files[0];
    formData.append('file', file);
    formData.append('id', currentUser.id);
    const response_image = await updateImage(formData);
    if (response_image) {
      setCurrentUser({ ...currentUser, image: response_image });
      setUser({ ...user, image: response_image });
      alert("Đổi hình ảnh thành công!");
    } else {
      alert("Đổi hình ảnh thất bại!");
    }
    imageRef.current.value = "";
  }

  const handlePayment = async (barcodePayment) => {
    try {
      await creatPayOnline(barcodePayment);
    } catch (error) {
      console.error("Error api creatPayOnline:", error);
    }
  }

  const handleViewBooking = async (id) => {
    // console.log(id);
    navigate('/view-booking', { state: { id: id } });
    return;
  }

  const formattedDate = new Date(currentUser.startDate).toLocaleDateString();

  return (
    <div className="account-page">
      <h2 className="title">Thông tin tài khoản</h2>

      {currentUser ? (
        <div className="account-container">
          <div className="account-form">
            <div className="profile-info">
              <Link onClick={handleChangeImage}>
                <img
                  src={currentUser.image}
                  alt="Avatar"
                  className="avatar"
                />
              </Link>
              <div className="profile-details">
                <p className="user-name">{currentUser.name}</p>
                <p className="user-stats">
                  Tên đăng nhập: {currentUser.username}<br />
                  Điểm: {currentUser.points} | Tổng chi tiêu: {currentUser.revenue} VND <br />
                  Ngày bắt đầu: {formattedDate}
                </p>
              </div>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Họ và Tên *</label>
                <input
                  type="text"
                  value={currentUser.name}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input type="email" value={currentUser.email} readOnly />
              </div>

              <div className="form-group">
                <label>Số điện thoại *</label>
                <input
                  type="text"
                  value={currentUser.phone || ""}
                  placeholder="Vui lòng điền số điện thoại"
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, phone: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Giới tính *</label>
                <select
                  value={currentUser.gender || ""}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, gender: e.target.value })
                  }
                  required
                >
                  <option value="female">Nữ</option>
                  <option value="male">Nam</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div className="form-group">
                <label>Ngày sinh *</label>
                <input
                  type="date"
                  value={currentUser.dob || ""}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, dob: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Tỉnh/Thành phố *</label>
                <input
                  type="text"
                  value={currentUser.address || ""}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, address: e.target.value })
                  }
                  required
                />
              </div>

              <button type="submit" className="btn btn-update">
                Cập nhật thông tin
              </button>

              <button type="button" className="btn btn-change" onClick={handleChangePass}>
                Đổi mật khẩu
              </button>
            </form>
          </div>
        </div>
      ) : (
        <p>Chưa đăng nhập. Vui lòng đăng nhập để xem thông tin.</p>
      )}

      {currentUser && currentUser.bookings && currentUser.bookings.length > 0 && (
        <div className="transaction-history">
          <h3>Lịch sử giao dịch</h3>
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Ngày giao dịch</th>
                <th>Phim</th>
                <th>Số tiền</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {currentUser.bookings?.map((booking, index) => (
                <tr key={booking.id}>
                  <td>{index + 1}</td>
                  <td>{booking.dateBooking}</td>
                  <td>{booking.nameMovie}</td>
                  <td>{booking.amount.toLocaleString('vi-VN')} VND</td>
                  <td>{booking.statusPayment === "pending" ? "Chưa thanh toán" :
                    (booking.statusPayment === "confirmed" ? "Đã thanh toán" :
                      (booking.statusPayment === "expired" ? "Đã hủy" : "")
                    )}</td>
                  <td>
                    <button className="view-button" onClick={() => handleViewBooking(booking.id)}>
                      <FontAwesomeIcon icon={faEye} /> Xem
                    </button>
                    {booking.statusPayment === "pending" ? (
                      <button className="payment-button" onClick={() => handlePayment(booking.barcodePayment)}>
                        <FontAwesomeIcon icon={faCreditCard} /> Thanh toán
                      </button>

                    ) : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}



      {showPasswordModal && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <div className="modal-header">Đổi mật khẩu</div>
            <form className="modal-info" onSubmit={handleChangePassword}>
              <div className="form-group">
                <label>
                  <strong>Mật khẩu cũ: </strong>
                  <input
                    type="password"
                    name="password_old"
                    className="modal-input"
                    ref={passwordOldRef}
                    required
                  />
                  <br />
                </label>
              </div>
              <div className="form-group">
                <label>
                  <strong>Mật khẩu mới: </strong>
                  <input
                    type="password"
                    name="password_new"
                    className="modal-input"
                    ref={passwordNewRef}
                    required
                  />
                  <br />
                </label>
              </div>
              <div className="form-group">
                <label>
                  <strong>Xác nhận mật khẩu mới: </strong>
                  <input
                    type="password"
                    name="password_new_2"
                    className="modal-input"
                    ref={passwordNew2Ref}
                    required
                  />
                  <br />
                </label>
              </div>
              <div className="modal-buttons">
                <button type="button" className="close-button" onClick={handleCloseModal}>
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


      {showImageModal && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <div className="modal-header">Chỉnh sửa hình ảnh </div>
            <form className="modal-info" onSubmit={handleSubmitChangeImage}
              encType="multipart/form-data">
              <div className="form-group">
                <label>
                  <strong>Hình ảnh:</strong>
                  <img
                    src={currentUser.image}
                    alt="User"
                    className="modal-image"
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  <strong>Hình ảnh mới: </strong>
                  <input
                    type="file"
                    name="image"
                    className="modal-input"
                    ref={imageRef}
                    required
                  />
                  <br />
                </label>
              </div>
              <div className="modal-buttons">
                <button type="button" className="close-button" onClick={handleCloseModal}>
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

export default AccountPage;
