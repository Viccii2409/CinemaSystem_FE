import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChair, faTicketAlt, faFilm, faCalendarAlt, faGift, faUser, faChartBar, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="header-title">
        LAL CINEMA
      </div>
      <ul>
        <li><Link to="/admin/cinema-management"><FontAwesomeIcon icon={faHome} /> Rạp</Link></li>
        <li><Link to="/admin/rooms-and-seats"><FontAwesomeIcon icon={faChair} /> Phòng và ghế</Link></li>
        <li><Link to="/admin/ticket-prices"><FontAwesomeIcon icon={faTicketAlt} /> Giá vé</Link></li>
        <li><Link to="/admin/movie-categories"><FontAwesomeIcon icon={faFilm} /> Thể loại phim</Link></li>
        <li><Link to="/admin/movies"><FontAwesomeIcon icon={faFilm} /> Phim</Link></li>
        <li><Link to="/admin/showtimes"><FontAwesomeIcon icon={faCalendarAlt} /> Lịch chiếu</Link></li>
        <li><Link to="/admin/promotions"><FontAwesomeIcon icon={faGift} /> Ưu đãi</Link></li>
        <li><Link to="/admin/ticket-sales"><FontAwesomeIcon icon={faTicketAlt} /> Bán vé</Link></li>
        <li><Link to="/admin/staff"><FontAwesomeIcon icon={faUser} /> Nhân viên</Link></li>
        <li><Link to="/admin/customers"><FontAwesomeIcon icon={faUser} /> Khách hàng</Link></li>
        <li><Link to="/admin/statistics"><FontAwesomeIcon icon={faChartBar} /> Thống kê</Link></li>
        <li><Link to="/admin/account"><FontAwesomeIcon icon={faUser} /> Tài khoản</Link></li>
        <li><Link to="/admin/logout"><FontAwesomeIcon icon={faSignOutAlt} /> Thoát</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
