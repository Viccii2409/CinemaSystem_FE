import React, { useEffect, useState, useContext } from 'react';
import './Sidebar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChair, faTicketAlt, faFilm, faCalendarAlt, faGift, faUser, faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, loading, handleLogout } = useContext(AuthContext);
  const [permission, setPermission] = useState([]);
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const getPermissionInfor = () => {
      if (loading) return;
      if (user == null) {
        navigate('/login-page');
        return;
      }
      setPermission(user.role?.permissions);
    };
    getPermissionInfor();
  }, [user, loading, navigate]);

  // Function to check if the current path includes the link path
  const isActive = (path) => {
    return location.pathname.includes(path) ? 'active' : ''; // Check if the path is part of the current location
  };

  return (
    <aside className="sidebar">
      <div className="header-title">
        LAL CINEMA
      </div>
      <ul>
        {permission.some(entry => entry.name === "MANAGER_THEATER") && (
          <li><Link to="/admin/cinema-management" className={isActive('/admin/cinema-management')}><FontAwesomeIcon icon={faHome} /> Rạp</Link></li>
        )}
        {permission.some(entry => entry.name === "MANAGER_ROOM") && (
          <li><Link to="/admin/rooms-and-seats" className={isActive('/admin/rooms-and-seats')}><FontAwesomeIcon icon={faChair} /> Phòng và ghế</Link></li>
        )}
        {permission.some(entry => entry.name === "MANAGER_PRICETICKET") && (
          <li><Link to="/admin/ticket-prices" className={isActive('/admin/ticket-prices')}><FontAwesomeIcon icon={faTicketAlt} /> Giá vé</Link></li>
        )}
        {permission.some(entry => entry.name === "MANAGER_GENRE") && (
          <li><Link to="/admin/movie-categories" className={isActive('/admin/movie-categories')}><FontAwesomeIcon icon={faFilm} /> Thể loại phim</Link></li>
        )}
        {permission.some(entry => entry.name === "MANAGER_MOVIE") && (
          <li><Link to="/admin/movies" className={isActive('/admin/movies')}><FontAwesomeIcon icon={faFilm} /> Phim</Link></li>
        )}
        {permission.some(entry => entry.name === "MANAGER_SHOWTIME") && (
          <li><Link to="/admin/showtimes" className={isActive('/admin/showtimes')}><FontAwesomeIcon icon={faCalendarAlt} /> Lịch chiếu</Link></li>)}
        {permission.some(entry => entry.name === "MANAGER_DISCOUNT") && (
          <li><Link to="/admin/promotions" className={isActive('/admin/promotions')}><FontAwesomeIcon icon={faGift} /> Ưu đãi</Link></li>
        )}
        {permission.some(entry => entry.name === "MANAGER_SELLING") && (
          <li><Link to="/admin/ticket-sales" className={isActive('/admin/ticket-sales')}><FontAwesomeIcon icon={faTicketAlt} /> Bán vé</Link></li>
        )}
        {permission.some(entry => entry.name === "MANAGER_ROLE") && (
          <li><Link to="/admin/role" className={isActive('/admin/role')}><FontAwesomeIcon icon={faUser} /> Vai trò và quyền </Link></li>)}
        {permission.some(entry => entry.name === "MANAGER_EMPLOYEE") && (
          <li><Link to="/admin/staff" className={isActive('/admin/staff')}><FontAwesomeIcon icon={faUser} /> Nhân viên</Link></li>)}
        {permission.some(entry => entry.name === "MANAGER_CUSTOMER") && (
          <li><Link to="/admin/customers" className={isActive('/admin/customers')}><FontAwesomeIcon icon={faUser} /> Khách hàng</Link></li>)}
        {permission.some(entry => entry.name === "MANAGER_REVENUE") && (
          <li><Link to="/admin/statistics" className={isActive('/admin/statistics')}><FontAwesomeIcon icon={faChartBar} /> Thống kê</Link></li>)}
        <li><Link to="/admin/account" className={isActive('/admin/account')}><FontAwesomeIcon icon={faUser} /> Tài khoản</Link></li>
        <li><Link to="" onClick={handleLogout} className="logout"><FontAwesomeIcon icon={faSignOutAlt} /> Thoát</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
