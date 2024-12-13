import React, { useState, useEffect, useContext, useRef } from "react";
import "./UserInfor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCreditCard, faUserCircle, faEdit, faComment } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { addGenreFauvorite, changePassword, getCustomerById, getUserById, updateImage, updateUser, addFeedback } from "../config/UserConfig";
import { creatPayOnline, getBookingById } from "../config/TicketConfig";
import { AuthContext } from '../context/AuthContext';
import BarcodeGenerator from "../BarcodeGenerator";
import { getAllGenreCustomer } from "../config/MovieConfig";

const AccountPage = () => {
  const { user, setUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState([]);
  const [bookingCustomer, setBookingCustomer] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const passwordOldRef = useRef(null);
  const passwordNewRef = useRef(null);
  const passwordNew2Ref = useRef(null);
  const imageRef = useRef(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDetail, setBookingDetail] = useState({});
  const [showGenreModal, setShowGenreModal] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/login-page');
      return;
    }
    console.log(user);
    const fetchUserInfor = async () => {
      try {
        const response = await getUserById(user.id);
        console.log(response);
        setBookingCustomer(response.bookings.filter(booking => booking.typeBooking === 'ONLINE'))
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
        const response_genre = await getAllGenreCustomer();
        setGenres(response_genre);
        setSelectedGenres(response.genres.map(genre => genre.id));
      } catch (error) {
        console.error("Error api getCustomerInforById:", error);
      }
    };

    fetchUserInfor();
  }, [user, navigate]);

  useEffect(() => {
    console.log(selectedGenres);
  }, [selectedGenres]);

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
    setShowBookingModal(false);
    setShowGenreModal(false);
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
    try {
      const response_ticket = await getBookingById(id);
      setBookingDetail(response_ticket);
      setShowBookingModal(true);
      console.log(response_ticket);
      // console.log(id);
    } catch (error) {
      console.error("Error api", error);
      setBookingDetail({});
    }
  }

  const handleCheckboxChange = (e) => {
    const genreId = e.target.value;
    if (e.target.checked) {
      setSelectedGenres([...selectedGenres, parseInt(genreId)]);
    } else {
      setSelectedGenres(selectedGenres.filter(id => id !== parseInt(genreId)));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const genreData = {
      customerid: user.id,
      genres: selectedGenres
    }
    try {
      await addGenreFauvorite(genreData);
      setCurrentUser({...currentUser, genres : genres.filter(genre => selectedGenres.includes(genre.id))});
      handleCloseModal();
    } catch (error) {
      console.error("Error addGenreFauvorite api", error);
      alert("Lỗi chỉnh sửa thể loại yêu thích!");
    }

  }

  const formattedDate = new Date(currentUser.startDate).toLocaleDateString();

  //FEEDBACK
    const [text, setText] = useState("");
    const [star, setStar] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const handleFeedback = (bookingId) => {
      setSelectedBooking({ bookingId });
      setShowFeedbackForm(true);
    };

    const handleFeedbackSubmit = async (bookingID) => {
      setSuccess(false);

      if (!text || !star) {
        setError("Vui lòng nhập đầy đủ thông tin.");
        return;
      }

      const feedbackData = { text, star, bookingId: selectedBooking.bookingId };
      console.log(feedbackData);
      try {
        const response = await addFeedback(feedbackData);

        setSuccess(true);
        setText("");
        setStar(null);

        alert("Feedback đã được gửi!");
        handleCloseModal();
        window.location.reload();
      } catch (error) {
        setError(error.message || "Có lỗi xảy ra.");
      }
    };

  return (
    <div className="account-page">
      <h2 className="title">Thông tin tài khoản</h2>

      {currentUser ? (
        <div className="account-container">
          <div className="account-form">
            <div className="profile-info">
              <Link onClick={handleChangeImage}>
                {currentUser.image === null ? (<FontAwesomeIcon
                  icon={faUserCircle}
                  className="customer-avatar"
                  style={{ fontSize: "120px", marginRight: "20px", color: "black" }}
                />) : (<img
                  src={currentUser.image}
                  alt="Avatar"
                  className="avatar"
                />)}
              </Link>
              <div className="profile-details">
                <p className="user-name">{currentUser.name}</p>
                <p className="user-stats">
                  Tên đăng nhập: {currentUser.username}<br />
                  Vai trò: {currentUser.role?.name} <br />
                  {currentUser.role?.id === 1 && (
                    <>
                      Chức vụ: {currentUser.position}<br />
                      Mức độ truy cập: {currentUser.accessLevel}<br />
                    </>
                  )}
                  {currentUser.role?.id === 2 && (
                    <>
                      Chức vụ: {currentUser.position}<br />
                      Rạp quản lý: {currentUser.nameTheater}<br />
                    </>
                  )}
                  {currentUser.role?.id === 3 && (
                    <>
                      Chức vụ: {currentUser.position}<br />
                      Người quản lý: {currentUser.nameManager}<br />
                    </>
                  )}
                  {currentUser.role?.id === 4 && (
                    <>
                      Điểm: {currentUser.points} |
                      Tổng chi tiêu: {currentUser.revenue}<br />
                    </>
                  )}
                </p>
              </div>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Họ và Tên *</label>
                <input
                  type="text"
                  value={currentUser.name}
                  className="modal-input"
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group form-row">
                <div className="form-column">

                  <label>Thể loại yêu thích </label>
                  <input
                    type="text"
                    value={
                      Array.isArray(currentUser.genres) && currentUser.genres.length > 0
                        ? currentUser.genres.map((genre) => genre.name).join(', ')
                        : "Không có thể loại yêu thích"
                    }
                    className="modal-input"
                    readOnly
                  />
                </div>
                <div className="form-column">
                  <button className="genre-button" type="button"
                    onClick={() => setShowGenreModal(true)}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Chỉnh sửa
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input type="email"
                  value={currentUser.email}
                  className="modal-input"
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, email: e.target.value })
                  }
                  required />
              </div>

              <div className="form-group">
                <label>Số điện thoại *</label>
                <input
                  type="text"
                  value={currentUser.phone || ""}
                  className="modal-input"
                  placeholder="Vui lòng điền số điện thoại"
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, phone: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group form-row">
                <div className="form-column">
                  <label>Ngày sinh *</label>
                  <input
                    type="date"
                    className="modal-input"
                    value={currentUser.dob || ""}
                    onChange={(e) =>
                      setCurrentUser({ ...currentUser, dob: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-column">
                  <label>Giới tính *</label>
                  <select
                    value={currentUser.gender || ""}
                    className="modal-input"
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
              </div>

              <div className="form-group">
                <label>Tỉnh/Thành phố *</label>
                <input
                  type="text"
                  className="modal-input"
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

      {bookingCustomer && bookingCustomer.length > 0 && (
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
              {bookingCustomer?.map((booking, index) => (
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
                                            <button
                                              className="payment-button"
                                              onClick={() => handlePayment(booking.barcodePayment)}
                                            >
                                              <FontAwesomeIcon icon={faCreditCard} /> Thanh toán
                                            </button>
                                          ) : booking.statusPayment === "confirmed"
                                             && booking.feedback === null
                                             && new Date(
                                              new Date(
                                                `${booking.dateShowtime}T${booking.endTime}`
                                              ).getTime() +
                                                10 * 60 * 1000
                                            ) < new Date()
                                            ? (
                                            <button
                                              className="feedback-button"
                                              onClick={() => handleFeedback(booking.id)}
                                            >
                                              <FontAwesomeIcon icon={faComment} /> Feedback
                                            </button>
                                          ) : (
                                            ""
                                          )}
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
          <div className="modal modal-pass">
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

      {showGenreModal && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal  modal-pass">
            <div className="modal-header">Chọn thể loại yêu thích </div>
            <hr />
            <form
              onSubmit={handleEditSubmit}
            >
              <div className="checkbox-group">
                {genres.map((genre) => (
                  <label key={genre.id} className="checkbox-button">
                    <input
                      type="checkbox"
                      name="genreid"
                      value={genre.id}
                      checked={selectedGenres.includes(genre.id)}
                      onChange={handleCheckboxChange}
                    />
                    <span>{genre.name}</span>
                  </label>
                ))}
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
          <div className="modal modal-pass">
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

      {showBookingModal && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <div className="modal-header">Thông tin vé đặt </div>
            <form className="modal-info">
              <div className="form-group">
                <div className="form-group form-row">
                  <div className="form-column">
                    <label>
                      <strong>Hình ảnh:</strong>
                      <img
                        src={bookingDetail.image}
                        alt="Movie"
                        className="image-booking"
                      />
                    </label>
                  </div>

                  <div className="form-column">
                    <label>
                      <strong>Tên rạp:</strong>
                      <input
                        type="text"
                        className="modal-input"
                        value={bookingDetail.nameTheater}
                        readOnly
                      />
                      <br />
                    </label>
                    <label>
                      <strong>Tên phim:</strong>
                      <input
                        type="text"
                        className="modal-input"
                        value={bookingDetail.nameMovie}
                        readOnly
                      />
                      <br />
                    </label>
                    <label>
                      <strong>Phòng Chiếu:</strong>
                      <input
                        type="text"
                        className="modal-input"
                        value={bookingDetail.nameRoom}
                        readOnly
                      />
                      <br />
                    </label>
                    <label>
                      <strong>Lịch Chiếu:</strong>
                      <input
                        type="text"
                        className="modal-input"
                        value={
                          bookingDetail.dateShowtime
                            ? `${new Date(bookingDetail.dateShowtime).toLocaleDateString()} ${bookingDetail.startTime} - ${bookingDetail.endTime}`
                            : "N/A"
                        }
                        readOnly
                      />
                      <br />
                    </label>
                    <label>
                      <strong>Ghế Đặt:</strong>
                      <input
                        type="text"
                        className="modal-input"
                        value={Array.isArray(bookingDetail.nameSeats) ? bookingDetail.nameSeats.join(", ") : "Không có ghế ngồi"}
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-column">
                    <label>
                      <strong>Địa chỉ rạp:</strong>
                      <input
                        type="text"
                        className="modal-input input-long"
                        value={bookingDetail.address}
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                </div>
                <div className="form-group form-row">
                  <div className="form-column">
                    <label>
                      <strong>Ngày Đặt Vé:</strong>
                      <input
                        type="text"
                        className="modal-input"
                        value={bookingDetail.dateBooking}
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                  <div className="form-column">
                    <label>
                      <strong>Tên khách hàng:</strong>
                      <input
                        type="text"
                        className="modal-input"
                        value={bookingDetail.nameCustomer}
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                </div>
                <div className="form-group form-row">
                  <div className="form-column">
                    <label>
                      <strong>Số điện thoại:</strong>
                      <input
                        type="text"
                        className="modal-input"
                        value={bookingDetail.phone}
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                  <div className="form-column">
                    <label>
                      <strong>Email:</strong>
                      <input
                        type="text"
                        className="modal-input"
                        value={bookingDetail.email}
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                </div>

                <div className="form-group  form-row">
                  <div className="form-column">
                    <label>
                      <strong>Tổng tiền:</strong>
                      <input
                        type="text"
                        className="modal-input"
                        value={bookingDetail.totalPrice ? bookingDetail.totalPrice.toLocaleString('vi-VN') : "0"}
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                  <div className="form-column">
                    <label>
                      <strong>Giảm giá:</strong>
                      <input
                        type="text"
                        className="modal-input"
                        value={bookingDetail.discountPrice ? bookingDetail.discountPrice.toLocaleString('vi-VN') : "0"}
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-column">
                    <label>
                      <strong>Thành tiền:</strong>
                      <input
                        type="text"
                        className="modal-input input-long"
                        value={bookingDetail.amount ? bookingDetail.amount.toLocaleString('vi-VN') : "0"}
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-column">
                    <label>
                      <strong>Mã Barcode:</strong>
                      <BarcodeGenerator code={bookingDetail.barcode || "N/A"} />
                      <br />
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </>
      )}

      {showFeedbackForm && (
              <div class="feedback-modal">
                <div class="feedback-form">
                  {error && <p className="error">{error}</p>}
                  {success && (
                    <p className="success">Feedback đã được gửi thành công!</p>
                  )}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleFeedbackSubmit();
                    }}
                  >
                    <div>
                      <label>
                        Nhận xét:
                        <textarea
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          placeholder="Nhập nhận xét của bạn"
                          required
                        ></textarea>
                      </label>
                    </div>
                    <div>
                      <label>
                        Đánh giá sao:
                        <select
                          value={star || ""}
                          onChange={(e) => setStar(e.target.value)}
                          required
                        >
                          <option value="" disabled>
                            Chọn số sao
                          </option>
                          <option value="1">1 Sao</option>
                          <option value="2">2 Sao</option>
                          <option value="3">3 Sao</option>
                          <option value="4">4 Sao</option>
                          <option value="5">5 Sao</option>
                        </select>
                      </label>
                    </div>
                    <button type="submit" className="submit-btn">
                      Gửi Feedback
                    </button>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setShowFeedbackForm(false)}
                    >
                      Hủy
                    </button>
                  </form>
                </div>
              </div>
            )}
    </div>
  );
};

export default AccountPage;
