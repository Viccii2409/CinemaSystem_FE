import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { verifyaccount } from "../config/UserConfig";

const VerificationSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get("username");
    const password = queryParams.get("token");
    const [notifi, setNotifi] = useState(false);
  useEffect(() => {
    const fetchVerify = async () => {
      const data = {username, password};
      const response = await verifyaccount(data);
      if(response) {
        setNotifi(true);
      }
    }
    fetchVerify();
  }, []);

  return (
    <div style={styles.container}>
      {notifi ? (
        <>
        <h1 style={styles.title}>Xác Thực Thành Công!</h1>
        <p style={styles.message}>
          Tài khoản của bạn đã được xác thực thành công. Bạn có thể đăng nhập và bắt đầu sử dụng dịch vụ của chúng tôi.
        </p>
        <Link to='/login-page' style={styles.button}>
          Đăng Nhập
        </Link>
        </>
      ) : (
        <h1 style={styles.title}>Xác Thực Thất BạiBại!</h1>
      )}
    </div>
  );
};

// CSS nội tuyến
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
    textAlign: "center",
  },
  title: {
    color: "#4CAF50",
    fontSize: "36px",
    marginBottom: "20px",
  },
  message: {
    color: "#333",
    fontSize: "18px",
    marginBottom: "30px",
    maxWidth: "400px",
  },
  button: {
    display: "inline-block",
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#4CAF50",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  },
};

export default VerificationSuccess;
