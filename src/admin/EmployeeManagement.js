import React, { useState, useEffect } from 'react'; // Thêm useEffect
import './TheaterManagement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { addEmployee, checkEmployee, getAllEmployee, getAllRole, getUserById, updateStatusEmployee } from '../config/UserConfig';
import { getAllNameTheater } from '../config/TheaterConfig';

function EmployeeManagement() {
  const [employees, setEmployees] = useState([])
  const [roles, setRoles] = useState([]);
  const [theaters, setTheaters] = useState([])
  const [employeeFilter, setEmployeeFilter] = useState([])
  const [search, setSearch] = useState('');
  const [roleID, setRoleID] = useState(0);
  const [currentUser, setCurrentUser] = useState([]);
  const [bookingCustomer, setBookingCustomer] = useState([]);
  const [bookingAgent, setBookingAgent] = useState([]);

  const [employeeData, setEmployeeData] = useState({
    id: "",
    name: "",
    email: "",
    dob: "",
    phone: "",
    address: "",
    username: "",
    password: "",
    password2: "",
    position: "",
    accessLevel: "",
    theaterid: "",
    managerid: "",
    roleid: ""
  })

  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddInputModal, setShowAddInputModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);  // Số lượng nhân viên hiển thị mỗi trang


  useEffect(() => {
    const fetchEmployee = async () => {
      const response_employees = await getAllEmployee();
      const response_role = await getAllRole();
      const response_theater = await getAllNameTheater();
      setEmployees(response_employees);
      setEmployeeFilter(response_employees);
      setTheaters(response_theater.data);
      setRoles(response_role.filter(role => role.name !== 'CUSTOMER'));
      // console.log(response_employees);
    }
    fetchEmployee();
  }, []);

  useEffect(() => {
    setRoleID(0);
    setEmployeeFilter(employees.filter((employee) => employee.username.toLowerCase().includes(search.toLowerCase())));
  }, [search]);

  useEffect(() => {
    setSearch('');
    if (parseInt(roleID) !== 0) {
      setEmployeeFilter(employees.filter(employee => employee.role?.id === parseInt(roleID)));
    }
    else {
      setEmployeeFilter(employees);
    }
  }, [roleID]);

  const totalPages = Math.ceil(employeeFilter.length / postsPerPage); //  Tính toán số lượng trang
  // Cắt mảng nhân viên theo trang
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = employeeFilter.slice(indexOfFirstPost, indexOfLastPost);

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

  const handleViewModal = async (id) => {
    try {
      const response = await getUserById(id);
      // console.log(response);
      if (response) {
        setCurrentUser(response);
        setBookingCustomer(response.bookings.filter(booking => booking.typeBooking === 'ONLINE'))
        setBookingAgent(response.bookings.filter(booking => booking.typeBooking === 'OFFLINE'))
      }
    } catch (error) {
      console.error("Error api getCustomerInforById:", error);
    }
    setShowViewModal(true);
  }



  const handleCloseModal = () => {
    setEmployeeData({
      id: "",
      name: "",
      email: "",
      dob: "",
      phone: "",
      address: "",
      username: "",
      password: "",
      password2: "",
      position: "",
      accessLevel: "",
      theaterid: "",
      managerid: "",
      roleid: ""
    });
    setShowAddModal(false);
    setShowViewModal(false);
    setShowAddInputModal(false);
  }

  const handleSearch = async () => {
    if (employeeData.roleid === null || employeeData.roleid === "") {
      alert("Bạn chưa chọn vai trò!");
      return;
    }
    const usernameData = employeeData.username.trim();
    if (usernameData === null || usernameData === "") {
      alert("Bạn chưa nhập tên tài khoản!");
      return;
    }
    else {
      const response_user = await checkEmployee(usernameData);
      if (response_user) {
        if (response_user.roleid !== 4) {
          alert("Nhân viên đã tồn tại!");
          return;
        }
        setEmployeeData({
          id: response_user.id,
          name: response_user.name,
          email: response_user.email,
          dob: response_user.dob,
          phone: response_user.phone,
          address: response_user.address,
          username: response_user.username,
          password: "",
          password2: "",
          position: "",
          accessLevel: "",
          theaterid: "",
          managerid: "",
          roleid: employeeData.roleid
        });
      }
      else {
        setEmployeeData({ ...employeeData, email: employeeData.username });
      }
      setShowAddInputModal(true);
    }
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (employeeData.password !== employeeData.password2) {
      alert("Mật khẩu không trùng khớp!");
      return;
    }
    const response_employee = await addEmployee(employeeData);
    if (response_employee) {
      setEmployees((entry) => [...entry, response_employee]);
      alert("Thêm nhân viên mới thành công!");
      setSearch('');
      setRoleID(response_employee.role?.id);
      handleCloseModal();
      return;
    }
    else {
      alert("Lỗi khi thêm nhân viên mới!");
    }
    return;
  }

  const handleStatusChange = async (id) => {
    // console.log(id);
    const response_status = await updateStatusEmployee(id);
    const listEmployee = employees.map(empl => empl.id === id ? { ...empl, statusEmployee: response_status } : empl);
    setEmployees(listEmployee);
    setEmployeeFilter(listEmployee);
  }

  return (
    <div className="cinema-management-system">
      <h2>Quản lý nhân viên </h2>
      <div className="search-theater">
        <input
          type='text'
          placeholder='Tìm kiếm tài khoản ...'
          className='input-search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className='input-search'
          value={roleID}
          onChange={(e) => setRoleID(e.target.value)}
        >
          <option value={0}>Tất cả vai trò</option>
          {roles.map(role => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        <button className="button add-button"
          onClick={() => setShowAddModal(true)}
        >Thêm</button>
      </div>
      {currentPosts.length > 0 ? (
        <table className='cinema-table'>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên tài khoản </th>
              <th>Họ và tên </th>
              <th>Vai trò </th>
              <th>Trạng thái </th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((employee, index) => (
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
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (<p>Không có nhân viên </p>)}

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



      {showAddModal && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <div className="modal-header">Thêm nhân viên mới</div>
            <form
              className='modal-info'
              onSubmit={handleAddSubmit}
            >
              <div className="form-group form-row">
                <div className="form-column">
                  <label>
                    <strong>Vai trò:</strong>
                    <select
                      className='modal-input'
                      value={employeeData.roleid}
                      onChange={(e) => setEmployeeData({ ...employeeData, roleid: e.target.value })}
                    >
                      <option value="" disabled>---Chọn vai trò---</option>
                      {roles.map(role => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="form-column">
                  <label>
                    <strong>Tên tài khoản (Email):</strong>
                    <input
                      type="text"
                      name="username"
                      className="modal-input"
                      value={employeeData.username}
                      onChange={(e) => setEmployeeData({ ...employeeData, username: e.target.value })}
                      required
                    />
                  </label>

                </div>
                <button type='button' className="button search-button"
                  onClick={() => handleSearch()}
                >Tìm kiếm</button>
              </div>

              {showAddInputModal && (
                <>
                  <h4>Thông tin nhân viên </h4>

                  <div className="form-group form-row">
                    <div className="form-column">
                      <label>
                        <strong>Họ và tên:</strong>
                        <input
                          type="text"
                          name="name"
                          className="modal-input"
                          value={employeeData.name}
                          onChange={(e) => setEmployeeData({ ...employeeData, name: e.target.value })}
                          required
                        />
                      </label>
                    </div>
                    <div className="form-column">
                      <label>
                        <strong>Email:</strong>
                        <input
                          type="text"
                          name="email"
                          className="modal-input"
                          value={employeeData.email}
                          onChange={(e) => setEmployeeData({ ...employeeData, email: e.target.value })}
                          required
                        />
                      </label>
                    </div>
                  </div>

                  <div className="form-group form-row">
                    <div className="form-column">
                      <label>
                        <strong>Ngày sinh:</strong>
                        <input
                          type="date"
                          name="dob"
                          className="modal-input"
                          value={employeeData.dob}
                          onChange={(e) => setEmployeeData({ ...employeeData, dob: e.target.value })}
                          required
                        />
                      </label>
                    </div>
                    <div className="form-column">
                      <label>
                        <strong>Số điện thoại:</strong>
                        <input
                          type="text"
                          name="phone"
                          className="modal-input"
                          value={employeeData.phone}
                          onChange={(e) => setEmployeeData({ ...employeeData, phone: e.target.value })}
                          required
                        />
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-column">
                      <label>
                        <strong>Địa chỉ:</strong>
                        <input
                          type="text"
                          name="address"
                          className="modal-input input-long"
                          value={employeeData.address}
                          onChange={(e) => setEmployeeData({ ...employeeData, address: e.target.value })}
                          required
                        />
                      </label>
                    </div>
                  </div>

                  {employeeData.id === "" && (
                    <div className="form-group form-row">
                      <div className="form-column">
                        <label>
                          <strong>Mật khẩu:</strong>
                          <input
                            type="password"
                            name="password"
                            className="modal-input"
                            value={employeeData.password}
                            onChange={(e) => setEmployeeData({ ...employeeData, password: e.target.value })}
                            required
                          />
                        </label>
                      </div>
                      <div className="form-column">
                        <label>
                          <strong>Xác nhận mật khẩu:</strong>
                          <input
                            type="password"
                            name="password2"
                            className="modal-input"
                            value={employeeData.password2}
                            onChange={(e) => setEmployeeData({ ...employeeData, password2: e.target.value })}
                            required
                          />
                        </label>
                      </div>
                    </div>

                  )}

                  <div className="form-group form-row">
                    <div className="form-column">
                      <label>
                        <strong>Chức vụ:</strong>
                        <input
                          type="text"
                          name="position"
                          className="modal-input"
                          value={employeeData.position}
                          onChange={(e) => setEmployeeData({ ...employeeData, position: e.target.value })}
                          required
                        />
                      </label>
                    </div>

                    {parseInt(employeeData.roleid) === 1 && (
                      <div className="form-column">
                        <label>
                          <strong>Mức độ truy cập:</strong>
                          <input
                            type="text"
                            name="accessLevel"
                            className="modal-input"
                            value={employeeData.accessLevel}
                            onChange={(e) => setEmployeeData({ ...employeeData, accessLevel: e.target.value })}
                            required
                          />
                        </label>
                      </div>
                    )}

                    {parseInt(employeeData.roleid) === 2 && (
                      <div className="form-column">
                        <label>
                          <strong>Rạp:</strong>
                          <select
                            className='modal-input'
                            name='theaterid'
                            value={employeeData.theaterid}
                            onChange={(e) => setEmployeeData({ ...employeeData, theaterid: e.target.value })}
                          >
                            <option value="" disabled>---Chọn rạp---</option>
                            {theaters.map(theater => (
                              <option key={theater.id} value={theater.id}>
                                {theater.name}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    )}

                    {parseInt(employeeData.roleid) === 3 && (
                      <div className="form-column">
                        <label>
                          <strong>Người quản lý:</strong>
                          <select
                            className='modal-input'
                            name='managerid'
                            value={employeeData.managerid}
                            onChange={(e) => setEmployeeData({ ...employeeData, managerid: e.target.value })}
                          >
                            <option value="" disabled>---Chọn quản lý---</option>
                            {employees.filter(empl => empl.role?.name === "MANAGER")
                              .map(empl => (
                                <option key={empl.id} value={empl.id}>
                                  {empl.name}
                                </option>
                              ))}
                          </select>
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="modal-buttons">
                    <button type='button' className="close-button" onClick={handleCloseModal}>
                      Hủy
                    </button>
                    <button className="save-button" type="submit">
                      Lưu
                    </button>
                  </div>
                </>
              )}
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
              </tr>
            </thead>
            <tbody>
              {currentUser.agents.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{index + 1}</td>
                  <td>{employee.username}</td>
                  <td>{employee.name}</td>
                  <td>{employee.role?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {bookingCustomer && bookingCustomer.length > 0 && (
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
              {bookingCustomer.map((booking, index) => (
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
        </div>
      )}

      {bookingAgent && bookingAgent.length > 0 && (
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
              {bookingAgent.map((booking, index) => (
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
        </div>
      )}
          </div>

        </>
      )}
    </div>
  );
}

export default EmployeeManagement;
