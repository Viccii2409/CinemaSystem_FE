import React, { useState, useEffect } from "react";
import "./UserInfor.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
const AccountPage = () => {
  // State quản lý thông tin người dùng
  const [currentUser, setCurrentUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  // Lấy thông tin người dùng từ localStorage
  useEffect(() => {
    const fetchUser = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      }
    };
    fetchUser();
  }, []);

  // Hàm xử lý cập nhật thông tin
  const handleUpdate = (e) => {
    e.preventDefault();
    // Lưu thông tin mới vào localStorage
    localStorage.setItem("user", JSON.stringify(currentUser));
    alert("Cập nhật thông tin thành công!");
  };

  return (
    <div className="account-page">
      <h2 className="title">Tài khoản</h2>

      {currentUser ? (
        <div className="account-container">
          <div className="account-form">
            <div className="profile-info">
              <img
                src="https://via.placeholder.com/200"
                alt="Avatar"
                className="avatar"
              />
              <div className="profile-details">
                <p className="user-name">{currentUser.name}</p>
                <p>
                  Điểm RP: 0 | Tổng visit: 0 | Active visit: 0
                  <br />
                  Expired visit: 0 | Tổng chi tiêu: 0 VND
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
                <label>Mật khẩu *</label>
                {/* Trường nhập mật khẩu */}
                <input
                  type={showPassword} // Hiển thị dưới dạng text hoặc password
                  value={currentUser.password || ""}
                  required
                />
                <button className="btn">Đổi mật khẩu</button>
              </div>
              <div className="form-group">
                <label>Số điện thoại *</label>
                <input
                  type="text"
                  value={currentUser.phone || ""}
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
                  <option value="Nữ">Nữ</option>
                  <option value="Nam">Nam</option>
                  <option value="Khác">Khác</option>
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
                Cập nhật
              </button>
            </form>
          </div>
        </div>
      ) : (
        <p>Chưa đăng nhập. Vui lòng đăng nhập để xem thông tin.</p>
      )}
    </div>
  );
};

export default AccountPage;
