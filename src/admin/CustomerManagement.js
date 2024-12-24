import React, { useState, useEffect } from 'react'; // Thêm useEffect
import './TheaterManagement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { getAllCustomer, getUserById, updateStatusUser } from '../config/UserConfig';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [customerFilter, setCustomerFilter] = useState([])
  const [search, setSearch] = useState('');
  const [currentUser, setCurrentUser] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [bookingCustomer, setBookingCustomer] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await getAllCustomer();
        console.log(response);
        setCustomers(response);
        setCustomerFilter(response);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách khách hàng:", error);
      }
    };
    fetchCustomer();
  }, []);

  useEffect(() => {
    setCustomerFilter(customers.filter((user) => user.username.toLowerCase().includes(search.toLowerCase())));
  }, [search]);

  const handleStatusChange = async (id) => {
    const response_status = await updateStatusUser(id);
    const listcustomer = customers.map(user => user.id === id ? { ...user, status: response_status } : user);
    setCustomers(listcustomer);
    setCustomerFilter(listcustomer);
  }

  const handleCloseModal = () => {
    setShowViewModal(false);
  }

  const totalPages = Math.ceil(customerFilter.length / postsPerPage); //  Tính toán số lượng trang
  // Cắt mảng nhân viên theo trang
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = customerFilter.slice(indexOfFirstPost, indexOfLastPost);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const [currentPage_2, setCurrentPage_2] = useState(1);
  const [postsPerPage_2] = useState(5);
  const totalPages_2 = Math.ceil(bookingCustomer.length / postsPerPage_2); // Tính toán số lượng trang

  // Cắt mảng nhân viên theo trang
  const indexOfLastPost_2 = currentPage_2 * postsPerPage_2;
  const indexOfFirstPost_2 = indexOfLastPost_2 - postsPerPage_2;
  const currentBookingCustomer = bookingCustomer.slice(indexOfFirstPost_2, indexOfLastPost_2);

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

  const handleViewModal = async (id) => {
    try {
      const response = await getUserById(id);
      // console.log(response);
      if (response) {
        const revenue = response.bookings.reduce((total, entry) => {
          if (entry.statusPayment === "confirmed") {
            return total + entry.amount;
          }
          return total;
        }, 0);

        setCurrentUser({ ...response, revenue });
        setBookingCustomer(response.bookings.filter(booking => booking.typeBooking === 'ONLINE').reverse())
      }
    } catch (error) {
      console.error("Error api getCustomerInforById:", error);
    }
    setShowViewModal(true);
  }

  return (
    <div className="cinema-management-system">
      <h2>Quản lý khách hàng </h2>
      <div className="search-theater">
        <input
          type='text'
          placeholder='Tìm kiếm tài khoản ...'
          className='input-search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {currentPosts.length > 0 ? (
        <table className='cinema-table'>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên tài khoản </th>
              <th>Họ và tên </th>
              <th>Số điện thoại </th>
              <th>Trạng thái </th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={user.status}
                      onChange={() => handleStatusChange(user.id)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td>
                  <button className="view-button"
                    onClick={() => handleViewModal(user.id)}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (<p>Không có khách hàng </p>)}

      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>


      {showViewModal && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <div className="modal-header">Thông tin chi tiết của khách hàng </div>
            <div className="profile-info">
              {currentUser.image === null ? (<FontAwesomeIcon
                icon={faUserCircle}
                className="customer-avatar"
                style={{ fontSize: "120px", marginRight: "20px", color: "black" }}
              />) : (<img
                src={currentUser.image}
                alt="Avatar"
                className="avatar"
              />)}
              <div className="profile-details">
                {/* <p className="user-name">{currentUser.name}</p> */}
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
            <hr />
            <form className="modal-info">
              <div className="form-group">

                <div className="form-group form-row">
                  <div className="form-column">
                    <label>
                      <strong>Họ và Tên:</strong>
                      <input
                        type="text"
                        value={currentUser.name}
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
                        value={currentUser.email}
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
                        value={currentUser.phone || ""}
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
                          currentUser.gender === 'male' ? 'Nam' :
                            currentUser.gender === 'female' ? 'Nữ' :
                              currentUser.gender === 'other' ? 'Khác' :
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
                        value={currentUser.dob || ""}
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
                        value={currentUser.address || ""}
                        className="modal-input"
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                </div>
              </div>
            </form>

            {currentBookingCustomer && currentBookingCustomer.length > 0 && (
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
                    {currentBookingCustomer.map((booking, index) => (
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
          </div>

        </>
      )}

    </div>
  );
};

export default CustomerManagement;
