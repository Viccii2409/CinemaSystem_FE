import React, { useEffect, useState } from "react";
import "./AccountPage.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { getCustomerInforById } from "../config/UserConfig";
import { creatPayOnline } from "../config/TicketConfig";

const AccountPage = () => {
  const navigate = useNavigate();
  const userid = 3;
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUserInfor = async () => {
      try {
        const response = await getCustomerInforById(userid);
        console.log(response);
        setUser(response);
      } catch (error) {
        console.error("Error api getCustomerInforById:", error);
      }
    };

    fetchUserInfor();
  }, [userid]);

  const handlePayment = async (barcodePayment) => {
    try {
      await creatPayOnline(barcodePayment);
    } catch (error) {
      console.error("Error api creatPayOnline:", error);
    }
  };

  const handleViewBooking = async (id) => {
    // console.log(id);
    navigate("/view-booking", { state: { id: id } });
    return;
  };

  return (
    <div className="account-page">
      <h2 className="page-title">Thông Tin Tài Khoản</h2>
      <div className="account-container">
        {/* Form chỉnh sửa thông tin */}
        <div className="edit-info">
          <h3>Chỉnh sửa thông tin</h3>
          <form>
            <div className="form-row">
              <div className="form-group">
                <label>Họ:</label>
                <input type="text" className="form-control" value={user.name} />
              </div>
              <div className="form-group">
                <label>Tên đệm:</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.name?.midName}
                />
              </div>
              <div className="form-group">
                <label>Tên:</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.name?.lastName}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  value={user.email}
                />
              </div>
              <div className="form-group">
                <label>Số điện thoại:</label>
                <input
                  type="phone"
                  className="form-control"
                  value={user.phone}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Ngày sinh:</label>
                <input type="date" className="form-control" value={user.dob} />
              </div>
              <div className="form-group">
                <label>Địa chỉ:</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.address}
                />
              </div>
            </div>
            <button className="btn btn-success">Cập nhật</button>
          </form>
        </div>
      </div>

      {/* Lịch sử giao dịch */}
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
            {user.bookings?.map((booking, index) => (
              <tr key={booking.id}>
                <td>{index + 1}</td>
                <td>{booking.dateBooking}</td>
                <td>{booking.nameMovie}</td>
                <td>{booking.amount.toLocaleString("vi-VN")} VND</td>
                <td>
                  {booking.statusPayment === "pending"
                    ? "Chưa thanh toán"
                    : booking.statusPayment === "confirmed"
                    ? "Đã thanh toán"
                    : booking.statusPayment === "expired"
                    ? "Đã hủy"
                    : ""}
                </td>
                <td>
                  <button
                    className="view-button"
                    onClick={() => handleViewBooking(booking.id)}
                  >
                    <FontAwesomeIcon icon={faEye} /> Xem
                  </button>
                  {booking.statusPayment === "pending" ? (
                    <button
                      className="payment-button"
                      onClick={() => handlePayment(booking.barcodePayment)}
                    >
                      <FontAwesomeIcon icon={faCreditCard} /> Thanh toán
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
    </div>
  );
};

export default AccountPage;
