import React, { useState } from 'react';
import './AccessPermission.css';

const AccessPermission = () => {
  const [permissions, setPermissions] = useState({
    manageEmployees: false,
    manageCustomers: false,
    managePromotions: false,
    manageMovies: false,
    manageCategories: false,
    scheduleShows: false,
    sellTickets: false,
    generateReports: false,
  });

  const handlePermissionChange = (permission) => {
    setPermissions({
      ...permissions,
      [permission]: !permissions[permission],
    });
  };

  return (
    <div className="access-permission">
      <h2>Chỉnh sửa quyền truy cập</h2>
      <form>
        <label>Mã nhân viên:</label>
        <input type="text" value="S001" disabled />

        <label>Tên nhân viên:</label>
        <input type="text" value="Nguyễn Minh Tâm" disabled />

        <label>Vị trí:</label>
        <input type="text" value="Quản lý" disabled />

        <label>Quyền truy cập:</label>
        <div className="permission-list">
          <label>
            <input
              type="checkbox"
              checked={permissions.manageEmployees}
              onChange={() => handlePermissionChange('manageEmployees')}
            />
            Quản lý nhân viên
          </label>
          <label>
            <input
              type="checkbox"
              checked={permissions.manageCustomers}
              onChange={() => handlePermissionChange('manageCustomers')}
            />
            Quản lý khách hàng
          </label>
          <label>
            <input
              type="checkbox"
              checked={permissions.managePromotions}
              onChange={() => handlePermissionChange('managePromotions')}
            />
            Quản lý ưu đãi
          </label>
          <label>
            <input
              type="checkbox"
              checked={permissions.manageMovies}
              onChange={() => handlePermissionChange('manageMovies')}
            />
            Quản lý phim
          </label>
          <label>
            <input
              type="checkbox"
              checked={permissions.manageCategories}
              onChange={() => handlePermissionChange('manageCategories')}
            />
            Quản lý thể loại
          </label>
          <label>
            <input
              type="checkbox"
              checked={permissions.scheduleShows}
              onChange={() => handlePermissionChange('scheduleShows')}
            />
            Lên lịch chiếu
          </label>
          <label>
            <input
              type="checkbox"
              checked={permissions.sellTickets}
              onChange={() => handlePermissionChange('sellTickets')}
            />
            Bán vé
          </label>
          <label>
            <input
              type="checkbox"
              checked={permissions.generateReports}
              onChange={() => handlePermissionChange('generateReports')}
            />
            Báo cáo và thống kê
          </label>
        </div>
        <div className="form-buttons">
          <button type="button" className="cancel-button">Hủy</button>
          <button type="submit" className="save-button">Lưu</button>
        </div>
      </form>
    </div>
  );
};

export default AccessPermission;
