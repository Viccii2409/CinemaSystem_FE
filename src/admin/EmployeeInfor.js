import React, { useState, useEffect, useContext, useRef } from "react";
import "../customer/UserInfor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCreditCard, faUserCircle, faComment } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { addFeedback, changePassword, getUserById, updateImage, updateStatusEmployee, updateUser } from "../config/UserConfig";
import { creatPayOnline, getBookingById } from "../config/TicketConfig";
import { AuthContext } from '../context/AuthContext';
import BarcodeGenerator from "../BarcodeGenerator";

const EmployeeInfor = () => {
  const navigate = useNavigate();
  const { user, setUser, loading } = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState([]);
  const [bookingCustomer, setBookingCustomer] = useState([]);
  const [bookingAgent, setBookingAgent] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const passwordOldRef = useRef(null);
  const passwordNewRef = useRef(null);
  const passwordNew2Ref = useRef(null);
  const imageRef = useRef(null);
  const [agent, setAgent] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [bookingCustomerAgent, setBookingCustomerAgent] = useState([]);
  const [bookingAgentAgent, setBookingAgentAgent] = useState([]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDetail, setBookingDetail] = useState({});

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/login-page');
      return;
    }
    const fetchUserInfor = async () => {
      try {
        const response = await getUserById(user.id);
        console.log(response);
        if (response) {
          setCurrentUser(response);
          setBookingCustomer(response.bookings.filter(booking => booking.typeBooking === 'ONLINE').reverse())
          setBookingAgent(response.bookings.filter(booking => booking.typeBooking === 'OFFLINE').reverse())
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
    setShowViewModal(false);
    setShowBookingModal(false);
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

  const handleStatusChange = async (id) => {
    const response_status = await updateStatusEmployee(id);
    const agents = currentUser.agents.map(a => a.id === id ? { ...a, statusEmployee: response_status } : a);
    setCurrentUser({ ...currentUser, agents })
  };

  const handleViewModal = async (id) => {
    try {
      const response = await getUserById(id);
      // console.log(response);
      if (response) {
        setAgent(response);
        setBookingCustomerAgent(response.bookings.filter(booking => booking.typeBooking === 'ONLINE').reverse())
        setBookingAgentAgent(response.bookings.filter(booking => booking.typeBooking === 'OFFLINE').reverse())
      }
    } catch (error) {
      console.error("Error api getUserById:", error);
    }
    setShowViewModal(true);
  }

  const [text, setText] = useState("");
  const [star, setStar] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleFeedback = (bookingId) => {
    setSelectedBooking({ bookingId });
    console.log(bookingId);
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


  const [currentPage_1, setCurrentPage_1] = useState(1);
  const [postsPerPage_1] = useState(5);
  const totalPages_1 = Math.ceil(bookingCustomer.length / postsPerPage_1);
  const indexOfLastPost_1 = currentPage_1 * postsPerPage_1;
  const indexOfFirstPost_1 = indexOfLastPost_1 - postsPerPage_1;
  const currentBookingCustomer = bookingCustomer.slice(indexOfFirstPost_1, indexOfLastPost_1);

  const nextPage_1 = () => {
    if (currentPage_1 < totalPages_1) {
      setCurrentPage_1(currentPage_1 + 1);
    }
  };

  const prevPage_1 = () => {
    if (currentPage_1 > 1) {
      setCurrentPage_1(currentPage_1 - 1);
    }
  };

  const goToPage_1 = (pageNumber) => {
    setCurrentPage_1(pageNumber);
  };


  const [currentPage_2, setCurrentPage_2] = useState(1);
  const [postsPerPage_2] = useState(5);
  const totalPages_2 = Math.ceil(bookingAgent.length / postsPerPage_2);
  const indexOfLastPost_2 = currentPage_2 * postsPerPage_2;
  const indexOfFirstPost_2 = indexOfLastPost_1 - postsPerPage_2;
  const currentBookingAgent = bookingAgent.slice(indexOfFirstPost_2, indexOfLastPost_2);

  const nextPage_2 = () => {
    if (currentPage_2 < totalPages_2) {
      setCurrentPage_2(currentPage_2 + 1);
    }
  };

  const prevPage_2 = () => {
    if (currentPage_2 > 1) {
      setCurrentPage_2(currentPage_2 - 1);
    }
  };

  const goToPage_2 = (pageNumber) => {
    setCurrentPage_2(pageNumber);
  };


  const [currentPage_3, setCurrentPage_3] = useState(1);
  const [postsPerPage_3] = useState(5);
  const totalPages_3 = Math.ceil(bookingCustomerAgent.length / postsPerPage_3);
  const indexOfLastPost_3 = currentPage_3 * postsPerPage_3;
  const indexOfFirstPost_3 = indexOfLastPost_3 - postsPerPage_3;
  const currentBookingCustomerAgent = bookingCustomerAgent.slice(indexOfFirstPost_3, indexOfLastPost_3);

  const nextPage_3 = () => {
    if (currentPage_3 < totalPages_3) {
      setCurrentPage_3(currentPage_3 + 1);
    }
  };

  const prevPage_3 = () => {
    if (currentPage_3 > 1) {
      setCurrentPage_3(currentPage_3 - 1);
    }
  };

  const goToPage_3 = (pageNumber) => {
    setCurrentPage_3(pageNumber);
  };


  const [currentPage_4, setCurrentPage_4] = useState(1);
  const [postsPerPage_4] = useState(5);
  const totalPages_4 = Math.ceil(bookingAgentAgent.length / postsPerPage_4); // Tính toán số lượng trang

  // Cắt mảng nhân viên theo trang
  const indexOfLastPost_4 = currentPage_4 * postsPerPage_4;
  const indexOfFirstPost_4 = indexOfLastPost_4 - postsPerPage_4;
  const currentBookingAgentAgent = bookingAgentAgent.slice(indexOfFirstPost_4, indexOfLastPost_4);

  const nextPage_4 = () => {
    if (currentPage_4 < totalPages_4) {
      setCurrentPage_4(currentPage_4 + 1);
    }
  };

  const prevPage_4 = () => {
    if (currentPage_4 > 1) {
      setCurrentPage_4(currentPage_4 - 1);
    }
  };

  const goToPage_4 = (pageNumber) => {
    setCurrentPage_4(pageNumber);
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
                  Chức vụ: {currentUser.position}<br />
                  {currentUser.role?.id === 1 && (
                    <>
                      Mức độ truy cập: {currentUser.accessLevel}<br />
                    </>
                  )}
                  {currentUser.role?.id === 2 && (
                    <>
                      Rạp quản lý: {currentUser.nameTheater}<br />
                    </>
                  )}
                  {currentUser.role?.id === 3 && (
                    <>
                      Người quản lý: {currentUser.nameManager}<br />
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

      {currentUser && currentUser.agents && currentUser.agents.length > 0 && (
        <div className="transaction-history">
          <h3>Nhân viên</h3>
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên tài khoản </th>
                <th>Họ và tên </th>
                <th>Vai trò </th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {currentUser.agents.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{index + 1}</td>
                  <td>{employee.username}</td>
                  <td>{employee.name}</td>
                  <td>{employee.role?.name}</td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={employee.statusEmployee}
                        onChange={() => handleStatusChange(employee.id)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </td>
                  <td>
                    <button className="view-button"
                      onClick={() => handleViewModal(employee.id)}
                    >
                      <FontAwesomeIcon icon={faEye} /> Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {currentBookingCustomer && currentBookingCustomer.length > 0 && (
        <div className="transaction-history">
          <h3>Lịch sử giao dịch</h3>
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Ngày giao dịch</th>
                <th>Phim</th>
                <th>Số tiền</th>
                <th>Trạng thái vé </th>
                <th>Trạng thái thanh toán</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {currentBookingCustomer?.map((booking, index) => (
                <tr key={booking.id}>
                  <td>{index + 1}</td>
                  <td>{booking.dateBooking}</td>
                  <td>{booking.nameMovie}</td>
                  <td>{booking.amount.toLocaleString('vi-VN')} VND</td>
                  <td>{booking.statusBooking ? ("Còn hiệu lực") : ("Đã hết hạn")}</td>
                  <td>{booking.statusPayment === "pending" ? "Chưa thanh toán" :
                    (booking.statusPayment === "confirmed" ? "Đã thanh toán" :
                      (booking.statusPayment === "expired" ? "Đã hủy" : "")
                    )}</td>
                  <td>
                    <button className="view-button" onClick={() => handleViewBooking(booking.id)}>
                      <FontAwesomeIcon icon={faEye} /> Xem
                    </button>

                    {booking.statusPayment === "pending" && (
                      <button className="payment-button" onClick={() => handlePayment(booking.barcodePayment)}>
                        <FontAwesomeIcon icon={faCreditCard} /> Thanh toán
                      </button>

                    )}

                    {booking.statusPayment === "confirmed" && booking.feedback === null &&
                      new Date(`${booking.dateShowtime}T${booking.endTime}`).getTime() < new Date().getTime() ? (
                      <button
                        className="feedback-button"
                        onClick={() => handleFeedback(booking.id)}
                      >
                        <FontAwesomeIcon icon={faComment} /> Feedback
                      </button>
                    ) : null
                    }

                  </td>
                </tr>
              ))}
            </tbody>
          </table>



          <div className="pagination">
            <button onClick={prevPage_1} disabled={currentPage_1 === 1}>
              Prev
            </button>
            {[...Array(totalPages_1)].map((_, index) => {
              const startPage = Math.max(currentPage_1 - 2, 0);
              const endPage = Math.min(currentPage_1 + 2, totalPages_1 - 1);

              if (index >= startPage && index <= endPage) {
                return (
                  <button
                    key={index}
                    onClick={() => goToPage_1(index + 1)}
                    className={currentPage_1 === index + 1 ? 'active' : ''}
                  >
                    {index + 1}
                  </button>
                );
              }
              return null;
            })}
            <button onClick={nextPage_1} disabled={currentPage_1 === totalPages_1}>
              Next
            </button>
          </div>



        </div>
      )}

      {currentBookingAgent && currentBookingAgent.length > 0 && (
        <div className="transaction-history">
          <h3>Lịch sử bán vé </h3>
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
              {currentBookingAgent.map((booking, index) => (
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


          <div className="pagination">
            <button onClick={prevPage_2} disabled={currentPage_2 === 1}>
              Prev
            </button>
            {[...Array(totalPages_2)].map((_, index) => {
              const startPage = Math.max(currentPage_2 - 2, 0);
              const endPage = Math.min(currentPage_2 + 2, totalPages_2 - 1);

              if (index >= startPage && index <= endPage) {
                return (
                  <button
                    key={index}
                    onClick={() => goToPage_2(index + 1)}
                    className={currentPage_2 === index + 1 ? 'active' : ''}
                  >
                    {index + 1}
                  </button>
                );
              }
              return null;
            })}

            <button onClick={nextPage_2} disabled={currentPage_2 === totalPages_2}>
              Next
            </button>
          </div>

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

      {showViewModal && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <div className="modal-header">Thông tin nhân viên </div>
            <div className="profile-info">
              {agent.image === null ? (<FontAwesomeIcon
                icon={faUserCircle}
                className="customer-avatar"
                style={{ fontSize: "120px", marginRight: "20px", color: "black" }}
              />) : (<img
                src={agent.image}
                alt="Avatar"
                className="avatar"
              />)}
              <div className="profile-details">
                {/* <p className="user-name">{currentUser.name}</p> */}
                <p className="user-stats">
                  Tên đăng nhập: {agent.username}<br />
                  Vai trò: {agent.role?.name} <br />
                  Chức vụ: {agent.position}<br />
                  {agent.role?.id === 1 && (
                    <>
                      Mức độ truy cập: {agent.accessLevel}<br />
                    </>
                  )}
                  {agent.role?.id === 2 && (
                    <>
                      Rạp quản lý: {agent.nameTheater}<br />
                    </>
                  )}
                  {agent.role?.id === 3 && (
                    <>
                      Người quản lý: {agent.nameManager}<br />
                    </>
                  )}
                </p>
              </div>
            </div>
            <hr />
            <form className="modal-info">
              <div className="form-group">

                <div className="form-group form-row">
                  <div className="form-column">
                    <label>
                      <strong>Họ và Tên:</strong>
                      <input
                        type="text"
                        value={agent.name}
                        className="modal-input"
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                  <div className="form-column">
                    <label>
                      <strong>Email:</strong>
                      <input type="email"
                        value={agent.email}
                        className="modal-input"
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
                        value={agent.phone || ""}
                        className="modal-input"
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                  <div className="form-column">
                    <label>
                      <strong>Giới tính:</strong>
                      <input
                        type="text"
                        value={
                          agent.gender === 'male' ? 'Nam' :
                            agent.gender === 'female' ? 'Nữ' :
                              agent.gender === 'other' ? 'Khác' :
                                ''
                        }
                        className="modal-input"
                        readOnly
                      />

                      <br />
                    </label>
                  </div>
                </div>

                <div className="form-group form-row">
                  <div className="form-column">
                    <label>
                      <strong>Ngày sinh:</strong>
                      <input
                        type="text"
                        value={agent.dob || ""}
                        className="modal-input"
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                  <div className="form-column">
                    <label>
                      <strong>Tỉnh/Thành phố:</strong>
                      <input type="text"
                        value={agent.address || ""}
                        className="modal-input"
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                </div>
              </div>
            </form>

            {currentBookingCustomerAgent && currentBookingCustomerAgent.length > 0 && (
              <div className="transaction-history">
                <h3>Lịch sử mua vé </h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Ngày giao dịch</th>
                      <th>Phim</th>
                      <th>Số tiền</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBookingCustomerAgent.map((booking, index) => (
                      <tr key={booking.id}>
                        <td>{index + 1}</td>
                        <td>{booking.dateBooking}</td>
                        <td>{booking.nameMovie}</td>
                        <td>{booking.amount.toLocaleString('vi-VN')} VND</td>
                        <td>{booking.statusPayment === "pending" ? "Chưa thanh toán" :
                          (booking.statusPayment === "confirmed" ? "Đã thanh toán" :
                            (booking.statusPayment === "expired" ? "Đã hủy" : "")
                          )}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="pagination">
                  <button onClick={prevPage_3} disabled={currentPage_3 === 1}>
                    Prev
                  </button>
                  {[...Array(totalPages_3)].map((_, index) => {
                    const startPage = Math.max(currentPage_3 - 2, 0);
                    const endPage = Math.min(currentPage_3 + 2, totalPages_3 - 1);

                    if (index >= startPage && index <= endPage) {
                      return (
                        <button
                          key={index}
                          onClick={() => goToPage_3(index + 1)}
                          className={currentPage_3 === index + 1 ? 'active' : ''}
                        >
                          {index + 1}
                        </button>
                      );
                    }
                    return null;
                  })}

                  <button onClick={nextPage_3} disabled={currentPage_3 === totalPages_3}>
                    Next
                  </button>
                </div>



              </div>
            )}

            {currentBookingAgentAgent && currentBookingAgentAgent.length > 0 && (
              <div className="transaction-history">
                <h3>Lịch sử bán vé </h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Ngày giao dịch</th>
                      <th>Phim</th>
                      <th>Số tiền</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBookingAgentAgent.map((booking, index) => (
                      <tr key={booking.id}>
                        <td>{index + 1}</td>
                        <td>{booking.dateBooking}</td>
                        <td>{booking.nameMovie}</td>
                        <td>{booking.amount.toLocaleString('vi-VN')} VND</td>
                        <td>{booking.statusPayment === "pending" ? "Chưa thanh toán" :
                          (booking.statusPayment === "confirmed" ? "Đã thanh toán" :
                            (booking.statusPayment === "expired" ? "Đã hủy" : "")
                          )}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="pagination">
                  <button onClick={prevPage_4} disabled={currentPage_4 === 1}>
                    Prev
                  </button>
                  {[...Array(totalPages_4)].map((_, index) => {
                    const startPage = Math.max(currentPage_4 - 2, 0);
                    const endPage = Math.min(currentPage_4 + 2, totalPages_4 - 1);

                    if (index >= startPage && index <= endPage) {
                      return (
                        <button
                          key={index}
                          onClick={() => goToPage_4(index + 1)}
                          className={currentPage_4 === index + 1 ? 'active' : ''}
                        >
                          {index + 1}
                        </button>
                      );
                    }
                    return null;
                  })}

                  <button onClick={nextPage_4} disabled={currentPage_4 === totalPages_4}>
                    Next
                  </button>
                </div>


              </div>
            )}
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

export default EmployeeInfor;
