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
        <Link to="/home" className="user-info">
          <FontAwesomeIcon
            icon={faUserCircle}
            className="user-icon"
          />
          {user && (<span className="user-name">{user.name}</span>)}
          {/* <span className="user-name">{user.name}</span> */}
          
        </Link>
      </div>
    </header>
  );
};

export default Header;
