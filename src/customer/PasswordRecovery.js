import React, { useContext,  useEffect,  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordRecovery.css'; // Đảm bảo bạn đã thêm CSS tùy chỉnh
import { changePasswordCustomer, forgotPassword } from '../config/UserConfig';
import { AuthContext } from '../context/AuthContext';

const PasswordRecovery = ({ onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [customer, setCustomer] = useState([]);
    const { handleLogin } = useContext(AuthContext);

  // Hàm xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra email hợp lệ
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Email không hợp lệ');
      return;
    }
    const response_check = await forgotPassword(email);
    if (response_check) {
      setCode(response_check);
      setSuccess(true);
      setError('');
      // setTimeout(() => {
      //   setSuccess(true);
      //   setError('');
      // }, 1000);
    }
    else {
      setError("Lỗi gửi email phục hồi mật khẩu!");
      return;
    }
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (code !== parseInt(verifyCode)) {
      alert("Mã xác minh không trùng khớp!");
      return;
    }
    setCustomer({username : email, password : "", password_2: ""});
    setChangePassword(true);
    setError('');
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if(customer.password !== customer.password_2) {
      alert("Mật khẩu không trùng khớp!");
      return;
    }
    const token = await changePasswordCustomer(customer);
    if(token) {
      alert("Thay đổi mật khẩu thành công!");
      const response = await handleLogin(token);
      if (response.statusEmployee) {
        navigate("/admin/account");
      }
      else {
        if (response.countGenre != null && response.countGenre === 0) {
          navigate("/genre-favourite");
        }
        else {
          navigate("/home");
        }
      }
    }
  }

  return (
    <div className="password-recovery-container">
      <div className="password-recovery-form">

        {success ? (
          !changePassword ? (
            <div className="success-message">
              <h2>Xác minh tài khoản</h2>
              <p>Chúng tôi đã gửi email phục hồi mật khẩu của bạn. Vui lòng kiểm tra hộp thư đến.</p>
              <form onSubmit={handleCodeSubmit}>
                <div className="form-group">
                  <label htmlFor="verifyCode">Mã xác minh</label>
                  <input
                    type="text"
                    id="verifyCode"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    placeholder="Nhập mã xác minh"
                    required
                  />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" className="submit-button">Gửi xác nhận</button>

                <div className="go-back">
                  <button type="button" onClick={onClose}>Quay lại trang đăng nhập</button>
                </div>
              </form>
            </div>
          ) : (
            <div className="change-password">
              <h2>Thay đổi mật khẩu</h2>
              <form onSubmit={handlePasswordChange}>
                <div className="form-group">
                  <label htmlFor="newPassword">Mật khẩu mới</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={customer.password}
                    onChange={(e) => setCustomer({...customer, password: e.target.value})}
                    placeholder="Nhập mật khẩu mới"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={customer.password_2}
                    onChange={(e) => setCustomer({...customer, password_2: e.target.value})}
                    placeholder="Xác nhận mật khẩu mới"
                    required
                  />
                </div>

                <button type="submit" className="submit-button">Thay đổi mật khẩu</button>
              </form>
            </div>
          )
        ) : (
          <>
            <h2>Quên Mật Khẩu</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>

              {error && <p className="error-message">{error}</p>}

              <button type="submit" className="submit-button">Gửi yêu cầu phục hồi</button>

              <div className="go-back">
                <button type="button" onClick={onClose}>Quay lại trang đăng nhập</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordRecovery;
