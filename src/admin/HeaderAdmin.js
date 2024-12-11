// src/components/HeaderAdmin.js
import React, { useEffect, useContext } from 'react';
import './HeaderAdmin.css';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from '../context/AuthContext';

const Header = () => {

  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/login-page');
      return;
    }
  }, [user]);
  return (
    <header className="header">
      <div className="header-content">
        {user && (
          <Link to="/home" className="user-info">
            {user.image ? (
              // Nếu có hình ảnh, hiển thị ảnh
              <img
                src={user.image}
                alt="User Avatar"
                className="customer-avatar"
                style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }}
              />
            ) : (
              // Nếu không có hình ảnh, hiển thị biểu tượng mặc định
              <FontAwesomeIcon
                icon={faUserCircle}
                className="customer-avatar"
                style={{ fontSize: "22px", marginRight: "10px" , color: "black"}}
              />
            )}
            {user && (<span className="user-name">{user.name}</span>)}
            {/* <span className="user-name">{user.name}</span> */}

          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
