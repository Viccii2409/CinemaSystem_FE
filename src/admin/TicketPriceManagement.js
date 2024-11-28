import React, { useEffect, useState } from 'react';
import './TicketPriceManagement.css';
import { getBasePrice, getDayOfWeek, getTimeFrame, getTypeCustomer, updatePrice } from '../config/TicketConfig.js';
import { getTypeSeat, getTypeRoom } from '../config/TheaterConfig.js';

function TicketPriceManagement() {

  const [typeCustomer, setTypeCustomer] = useState([]);
  const [typeSeat, setTypeSeat] = useState([]);
  const [typeRoom, setTypeRoom] = useState([]);
  const [timeFrame, setTimeFrame] = useState([]);
  const [dayOfWeek, setDayOfWeek] = useState([]);
  const [price, setPrice] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    typeCustomer: {},
    dayOfWeek: {},
    timeFrame: {},
    typeRoom: {},
    typeSeat: {}
  });

  const fetchPriceTicket = async () => {
    try {
      const listtypecustomer = await getTypeCustomer();
      setTypeCustomer(listtypecustomer);
      const listtypeseat = await getTypeSeat();
      setTypeSeat(listtypeseat.filter(tr => tr.id !== 1));
      const listtyperoom = await getTypeRoom();
      setTypeRoom(listtyperoom.filter(tr => tr.id !== 1));
      const listtimeframe = await getTimeFrame();
      setTimeFrame(listtimeframe);
      // console.log(listtimeframe);
      const listdayofweek = await getDayOfWeek();
      setDayOfWeek(listdayofweek);
      // console.log(listdayofweek);
      const baseprice = await getBasePrice();
      setPrice(baseprice.defaultPrice);
      // console.log(baseprice.defaultPrice);

    } catch (error) {
      console.error("Not found");
    }

  }

  useEffect(() => {
    fetchPriceTicket();
  }, [])

  const handleEditPrice = () => {
    setShowEditModal(true);
  }

  const handleCloseModal = () => {
    setShowEditModal(false);
  }

  const handleInputChange = (event, category, key) => {
    const { value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [key]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ngăn chặn hàng động mặc định của form 
    console.log(formData); // In ra dữ liệu đã thu thập
    // Xử lý formData ở đây, ví dụ như gửi lên API
    try {
      await updatePrice(formData);
      await fetchPriceTicket();
      handleCloseModal();
      alert("Giá đã cập nhật thành công!");
    } catch (error) {
      console.error("Error update");
    }
    console.log(JSON.stringify(formData, null, 2));
  };

  return (
    <div className="ticket-price-management">
      <h2>Quản lý giá vé</h2>
      <button className="add-button button" onClick={handleEditPrice}>Chỉnh sửa</button>
      <div className="price-table">
        <table>
          <thead>
            <tr>
              <th>Ngày chiếu</th>
              <th>Khung giờ</th>
              {typeCustomer.map(tc => (
                <th key={tc.id}>{tc.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dayOfWeek.map(day => (
              timeFrame.map(tf => (
                <tr key={`${day.id}-${tf.id}`}>
                  <td>{day.name}</td>
                  <td>{tf.name}</td>
                  {typeCustomer.map(tc => (
                    <td key={`${day.id}-${tf.id}-${tc.id}`}>
                      <input
                        type="text"
                        value={
                          new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                            (parseFloat(price || 0) + Number(day.surcharge || 0) + Number(tf.surcharge || 0)) * (1 - (parseFloat(tc.discount || 0) / 100))
                          )
                        }
                        disabled
                      />
                    </td>
                  ))}
                </tr>
              ))
            ))}
          </tbody>
        </table>
        <div className="additional-fees">

          <div className="surcharge-list">
            <h3>Phụ thu phòng</h3>
            {typeRoom.map(tr => (
              <div className="surcharge-item" key={tr.id}>
                <label>{tr.name}</label>
                <input
                  type="text"
                  value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tr.surcharge)}
                  disabled
                />
              </div>
            ))}
          </div>
          <div className="surcharge-list">
            <h3>Phụ thu ghế</h3>
            {typeSeat.map(ts => (
              <div className="surcharge-item" key={ts.id}>
                <label>{ts.name}</label>
                <input
                  type="text"
                  value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(ts.surcharge)}
                  disabled
                />
              </div>
            ))}
          </div>
        </div>
      </div>





      {
        showEditModal && (
          <>
            <div className="modal-overlay" onClick={handleCloseModal}></div>
            <div className="modal">
              <form className="modal-info"  onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="form-group form-row">
                    <div className="form-column">
                      <div className="modal-header">Ưu đãi (Giảm %)</div>
                      {typeCustomer.map((tc) => (
                        <label key={tc.name}>
                          <strong>{tc.name}</strong>
                          <input
                            type="number"
                            name="discount"
                            className="modal-input"
                            value={formData.typeCustomer[tc.id] || tc.discount || 0}
                            onChange={(e) => handleInputChange(e, 'typeCustomer', tc.id)}
                          />
                          <br />
                        </label>
                      ))}
                    </div>

                    <div className="form-column">
                      <div className="modal-header">Phụ phí (Thêm VND)</div>
                      {dayOfWeek.map((tc) => (
                        <label key={tc.name}>
                          <strong>{tc.name}</strong>
                          <input
                            type="number"
                            className="modal-input"
                            value={formData.dayOfWeek[tc.id] || tc.surcharge || 0}
                            onChange={(e) => handleInputChange(e, 'dayOfWeek', tc.id)}
                          />
                          <br />
                        </label>
                      ))}
                      {timeFrame.map((tc) => (
                        <label key={tc.name}>
                          <strong>{tc.name}</strong>
                          <input
                            type="number"
                            className="modal-input"
                            value={formData.timeFrame[tc.id] || tc.surcharge || 0}
                            onChange={(e) => handleInputChange(e, 'timeFrame', tc.id)}
                          />
                          <br />
                        </label>
                      ))}
                    </div>

                    <div className="form-column">
                      <div className="modal-header">Phòng - Ghế (Thêm VND)</div>
                      {typeRoom.map((tc) => (
                        <label key={tc.name}>
                          <strong>{tc.name}</strong>
                          <input
                            type="number"
                            className="modal-input"
                            value={formData.typeRoom[tc.id] || tc.surcharge || 0}
                            onChange={(e) => handleInputChange(e, 'typeRoom', tc.id)}
                          />
                          <br />
                        </label>
                      ))}
                      {typeSeat.map((tc) => (
                        <label key={tc.name}>
                          <strong>{tc.name}</strong>
                          <input
                            type="number"
                            className="modal-input"
                            value={formData.typeSeat[tc.id] || tc.surcharge || 0}
                            onChange={(e) => handleInputChange(e, 'typeSeat', tc.id)}
                          />
                          <br />
                        </label>
                      ))}
                    </div>


                  </div>
                </div>


                <div className="modal-buttons">
                  <button className="close-button" onClick={handleCloseModal}>
                    Hủy
                  </button>
                  <button className="save-button" type="submit">
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </>
        )
      }

    </div>
  );
}

export default TicketPriceManagement;
