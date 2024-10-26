import React from 'react';
import './ScheduleManagement.css';

function ScheduleManagement() {
  return (
    <div className="schedule-management">
      <h2>Lên lịch chiếu</h2>
      <div className="schedule-table">
        <div className="schedule-header">
          <label>Rạp:</label>
          <input type="text" value="LAL THANH XUÂN" readOnly />
          <label>Ngày:</label>
          <input type="date" value="2024-10-10" readOnly />
        </div>
        <div className="schedule-list">
          {[1, 2].map((room) => (
            <div key={room} className="room-schedule">
              <div className="room-info">
                <span>Phòng {room}</span>
                <span>Loại phòng: {room === 1 ? '2D' : '3D'}</span>
                <span>Số ghế: 162</span>
              </div>
              <table className="schedule-detail">
                <thead>
                  <tr>
                    <th>Thời gian</th>
                    <th>Phim</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>8:00 - 10:15</td>
                    <td>Indiana Jones and the Last Crusade</td>
                    <td>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                      </label>
                    </td>
                    <td>
                      <button className="edit-button">Sửa</button>
                    </td>
                  </tr>
                  <tr>
                    <td>10:30 - 12:00</td>
                    <td>The Conjuring</td>
                    <td>
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </td>
                    <td>
                      <button className="edit-button">Sửa</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="add-button">Thêm</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScheduleManagement;
