import React, { useEffect, useState, useContext } from 'react';
import '../admin/CinemaTicket_2.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { TheaterContext } from "../TheaterContext";
import { addPayCashCustomer, addSelectedSeat, getAllDiscount, getSelectedSeatByShowtime, getShowtimeByID, getTypeCustomer, updateSelectedSeat } from '../config/TicketConfig';
import moment from 'moment-timezone';
import { getCustomerById } from '../config/UserConfig';

function SeatSelection() {
  const { selectedTheater } = useContext(TheaterContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state || '';
  const userid = 3;
  const [customer, setCustomer] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [currentDateTimeEnd, setCurrentDateTimeEnd] = useState('');
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [showtime, setShowtime] = useState([]);
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [booking, setBooking] = useState([]);

  const [viewSeat, setViewSeat] = useState(false);
  const [viewTypePay, setViewTypePay] = useState(false);

  const [discounts, setDiscounts] = useState('');
  const [discount, setDiscount] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPayCashModal, setShowPayCashModal] = useState(false);

  const [amountDue, setAmountDue] = useState(0);
  const [customerPaid, setCustomerPaid] = useState('');
  const [change, setChange] = useState(0);




  useEffect(() => {
    // if(selectedTheater === null){
    //   handleExit();
    //   return;
    // }
    // Hàm đếm ngược thời gian
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          handleExit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const getRoomInfor = async () => {
      const hanoiTime = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DDTHH:mm:ss");
      const hanoiTimeEnd = moment().tz("Asia/Ho_Chi_Minh").add(10, 'minutes').format("YYYY-MM-DDTHH:mm:ss");

      setCurrentDateTime(hanoiTime);
      setCurrentDateTimeEnd(hanoiTimeEnd);

      if (!id) {
        console.warn("ID của phòng không tồn tại.");
        navigate('/admin/ticket-sales');
        return;
      }
      try {
        const response_customer = await getCustomerById(Number(userid));
        setCustomer(response_customer);
        console.log(response_customer);

        const response_discount = await getAllDiscount();
        const discountActive = response_discount.filter(entry => entry.status);
        const customerDiscountIds = response_customer.discounts.map(discount => discount.id);
        const discountNotInCustomer = discountActive.filter(
          discount => !customerDiscountIds.includes(discount.id)
        );
        setDiscounts(discountNotInCustomer);
        console.log(discountNotInCustomer);

        const response_showtime = await getShowtimeByID(id);
        setShowtime(response_showtime);
        setSelectedSeat(response_showtime.selectedSeats.filter(seat => seat.userid !== userid || seat.status === "confirmed"));
        const roomInfor = response_showtime.room;

        const response_typecustomer = await getTypeCustomer();
        const typeCustomer = response_typecustomer.find(item => item.id === 5);

        if (roomInfor && Array.isArray(roomInfor.seat)) {
          const response_price = response_showtime.priceTicket * (100 - typeCustomer.discount) / 100;
          const formattedSeatsData = formattedSeats(roomInfor.seat, roomInfor.numRows, roomInfor.numColumn);
          const seatsWithTypes = changeTypeSeat(formattedSeatsData, response_price);
          setSeats(seatsWithTypes || []);
        } else {
          console.warn("Không có thông tin ghế hoặc dữ liệu ghế không phải là mảng.");
          setSeats([]);
        }
      } catch (error) {
        console.error("Error get showtime by id api", error);
      }
    };
    getRoomInfor();
    setViewSeat(true);
  }, []);

  useEffect(() => {
    const stopListen = getSelectedSeatByShowtime(id, (selectedSeatData) => {
      console.log("Received seat data:", selectedSeatData);

      setSelectedSeat((prevSelectedSeat) => {
        // Kiểm tra xem ghế đã tồn tại trong danh sách chưa
        const seatExists = prevSelectedSeat.some(seat => seat.id === selectedSeatData.id);

        if (!seatExists) {
          // Nếu ghế chưa tồn tại và có trạng thái "pending" hoặc "confirmed"
          if (
            selectedSeatData.userid !== userid &&
            (selectedSeatData.status === "pending" || selectedSeatData.status === "confirmed")
          ) {
            return [...prevSelectedSeat, selectedSeatData];
          }
        } else {
          // Nếu ghế đã tồn tại và có trạng thái "expired", loại bỏ nó khỏi danh sách
          if (selectedSeatData.status === "expired") {
            return prevSelectedSeat.filter(seat => seat.id !== selectedSeatData.id);
          }
        }

        return prevSelectedSeat; // Không thay đổi nếu không thỏa điều kiện
      });
    });

    return () => stopListen(); // Ngắt kết nối WebSocket khi component bị unmounted
  }, [id, userid]);



  const handleExit = () => {
    alert("Bạn đã hết thời gian đặt ghế!");
    navigate('/home');
    return;
  }

  const formattedSeats = (listseat, numRows, numSeats) => {
    if (!Array.isArray(listseat)) {
      console.warn("Dữ liệu ghế không phải là mảng.");
      console.log(listseat);
      return {};
    }
    const listseat_reduce = listseat.reduce((newlistseat, seat) => {
      const rowIndex = seat.rowNum;

      if (!newlistseat[rowIndex]) {
        newlistseat[rowIndex] = [];
      }

      newlistseat[rowIndex].push(seat);
      return newlistseat;
    }, []);

    for (let row = 0; row < numRows; row++) {
      if (!listseat_reduce[row]) listseat_reduce[row] = [];

      for (let column = 0; column < numSeats; column++) {
        const seat = listseat_reduce[row].find((s) => s.seatNum === column);
        if (!seat) {
          listseat_reduce[row].push({
            rowNum: row,
            seatNum: column,
            status: false,
          });
        }
      }

      // Sắp xếp các ghế trong mỗi hàng theo thứ tự seatNum để giữ đúng thứ tự
      listseat_reduce[row].sort((a, b) => a.seatNum - b.seatNum);
    }

    return listseat_reduce;
  };


  const changeTypeSeat = (listseat, price) => {
    if (!Array.isArray(listseat)) {
      console.warn("listseat không phải là mảng hai chiều.");
      return [];
    }

    return listseat.map(row => row.map(seat => {
      // Kiểm tra xem seat.typeSeat có tồn tại và có surcharge hay không
      const surcharge = seat.typeSeat?.surcharge ?? 0; // Giá trị mặc định là 0 nếu surcharge không tồn tại

      let typeSeat;
      switch (seat.typeSeat?.id) { // Kiểm tra tồn tại của typeSeat và id
        case 1:
          typeSeat = 'regular';
          break;
        case 2:
          typeSeat = 'vip';
          break;
        case 3:
          typeSeat = 'double-seat';
          break;
        default:
          typeSeat = null;
      }

      // Trả về seat với giá cập nhật và loại ghế
      return { ...seat, price: surcharge + price, typeSeat };
    }));
  };


  const handleBookingSeat = async (id) => {
    // Tạo dữ liệu selectedSeat
    const selectedSeat = {
      user: { id: userid },
      showtime: { id: showtime.id },
      seat: { id: id },
      start: currentDateTime,
      end: currentDateTimeEnd,
      status: "pending"
    };

    // Kiểm tra nếu ghế đã được chọn
    const existingSeat = booking.find((seat) => seat.id === id);

    if (existingSeat) {
      try {
        // Gọi API để cập nhật ghế (hủy ghế)
        const response = await updateSelectedSeat(existingSeat.selectedSeatID);

        if (response) {
          // Xóa ghế khỏi danh sách booking
          setBooking((prevBooking) => prevBooking.filter((seat) => seat.id !== id));
        } else {
          console.error("Failed to update selected seat");
        }
      } catch (error) {
        console.error("Error updateSelectedSeat API", error);
      }
    } else {
      try {
        // Gọi API để thêm ghế mới
        const selectedSeatID = await addSelectedSeat(selectedSeat);

        if (selectedSeatID) {
          // Thêm ghế vào danh sách booking
          setBooking((prevBooking) => [...prevBooking, { id, selectedSeatID }]);
        } else {
          console.error("Failed to add selected seat");
        }
      } catch (error) {
        console.error("Error addSelectedSeat API", error);
      }
    }
  };



  const groupSeatsByType = (booking, seats) => {
    // Chuyển đổi danh sách ghế thành Map
    const seatMap = new Map(seats.flat().map(seat => [seat.id, seat]));

    const seatGroups = { 'regular': [], 'vip': [], 'double-seat': [] };
    booking.forEach(({ id }) => { // Duyệt qua `booking` chứa {id, response}
      const seat = seatMap.get(id); // Tìm kiếm nhanh qua Map
      if (seat && seatGroups[seat.typeSeat]) {
        seatGroups[seat.typeSeat].push(seat);
      }
    });
    return seatGroups;
  };


  const seatGroups = groupSeatsByType(booking, seats);

  const totalPrice = Object.values(seatGroups).flat().reduce(
    (total, seat) => total + (seat.price ?? 0),
    0
  );


  const handleChooseType = () => {
    if (viewSeat === true && viewTypePay === false) {
      if (booking.length === 0) {
        alert("Bạn chưa chọn ghế!");
        return;
      }
      setViewSeat(false);
      setViewTypePay(true);

    }
    else if (viewSeat === false && viewTypePay === true) {
      if (!paymentMethod) {
        alert('Vui lòng chọn hình thức thanh toán!');
        return;
      }

      setAmountDue(totalPrice - discountPrice);
      if (paymentMethod === "PAYCASH") {
        setShowPayCashModal(true);
      }
      console.log('Phương thức thanh toán:', paymentMethod);
    }
  };

  const handleCustomerPaidChange = (value) => {
    const sanitizedValue = parseFloat(value.replace(/,/g, '')) || 0; // Loại bỏ dấu phẩy, chuyển sang số
    setCustomerPaid(sanitizedValue);

    // Tính toán tiền trả lại
    const newChange = sanitizedValue - amountDue;
    setChange(newChange > 0 ? newChange : 0); // Đảm bảo tiền trả lại không âm
  };


  const handleCloseModal = () => {
    setShowPayCashModal(false);
  };

  const handleDiscountCode = (id) => {
    const discount = discounts.find(entry => entry.id === Number(id));
    setDiscount(discount);
    if(discount.typeDiscount.id === 1){
      setDiscountPrice(totalPrice * (discount.reducedValue) / 100);
    }
    else if(discount.typeDiscount.id === 2) {
      setDiscountPrice(discount.reducedValue);
    }
    console.log(discount);
  }

  const handleAddSubmit = async () => {
    const initialData = {};
    initialData[5] = {};
    if (seatGroups['regular'].length > 0) {
      initialData[5][1] = seatGroups['regular'].length;
    }
    if (seatGroups['vip'].length > 0) {
      initialData[5][2] = seatGroups['vip'].length;
    }
    if (seatGroups['double-seat'].length > 0) {
      initialData[5][3] = seatGroups['double-seat'].length;
    }
    const paymentCash = {
      showtimeid: showtime.id,
      customerid: userid,
      discountid: discount.id,
      amount: amountDue,
      received: customerPaid,
      moneyReturned: change,
      paytypecustomer: initialData,
      ticket: booking
    }
    console.log(JSON.stringify(paymentCash, null, 2));
    try {
      const response = await addPayCashCustomer(paymentCash);
      if (response) {
        alert("Bạn đã đặt ghế thành công!");
        navigate('/view-booking', { state: { id: response } });
        return;
      } else {
        alert("Lỗi khi đặt ghế!");
        return;
      }
    } catch (error) {
      console.error("Error addPayCash api", error);
    }

  }


  const handleExitType = () => {
    if (viewSeat === true && viewTypePay === false) {
      navigate('/admin/ticket-sales');
      return;
    }
    else if (viewSeat === false && viewTypePay === true) {
      setViewSeat(true);
      setViewTypePay(false);
      return;
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className='cinema-ticket-2'>
      <div className="left-panel">
        {viewSeat && (
          <div className='booking-seat'>

            <div className="note-seat">
              <div className="input-group">
                <div className="seat regular">
                  <input type="text" disabled value=" " />
                </div>
                <h4>Ghế Thường</h4>
              </div>
              <div className="input-group">
                <div className="seat vip">
                  <input type="text" disabled value=" " />
                </div>
                <h4>Ghế Vip</h4>
              </div>
              <div className="input-group">
                <div className="seat double-seat">
                  <input type="text" disabled value=" " />
                </div>
                <h4>Ghế Đôi</h4>
              </div>
              <div className="input-group">
                <div className="seat selected-seat">
                  <input type="text" disabled value=" " />
                </div>
                <h4>Ghế Đã đặt</h4>
              </div>
              <div className="input-group">
                <div className="seat booking-seat">
                  <input type="text" disabled value=" " />
                </div>
                <h4>Ghế đã chọn</h4>
              </div>
            </div>


            <div className="seat-grid">
              {seats.map((row, rowIndex) => (
                <div key={rowIndex} className="seat-row">
                  {row.map((seat, seatIndex) => {
                    const isSeatSelected = selectedSeat.some((selectedSeat) => selectedSeat.seatid === seat.id);
                    const isSeatBooked = booking.some((selectedSeat) => selectedSeat.id === seat.id);
                    const isSeatUnavailable = !seat.status;

                    return (
                      <div
                        key={seatIndex}
                        className={`seat ${seat.typeSeat} ${isSeatUnavailable ? 'deleted' : ''} ${isSeatSelected ? 'choose-seat' : ''
                          }`}
                      >
                        <button
                          className={`${isSeatBooked ? 'selected-seat' : ''}`}
                          onClick={() => handleBookingSeat(seat.id)}
                          disabled={isSeatUnavailable || isSeatSelected} // Vô hiệu hóa ghế đã chọn
                        >
                          {seat.name}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

          </div>

        )}

        {viewTypePay && (
          <>
            <h3>Thông tin khách hàng</h3>
            <div className="form-group form-row">
              <div className="form-column">
                <label>
                  <strong>Tên khách hàng:</strong>
                  <input
                    type="text"
                    name="reducedValue"
                    className="modal-input"
                    value={customer.fullname}
                    readOnly
                  />
                  <br />
                </label>
              </div>
              <div className="form-column">
                <label>
                  <strong>Email:</strong>
                  <input
                    type="text"
                    name="discountCode"
                    className="modal-input"
                    value={customer.email}
                    readOnly
                  />
                  <br />
                </label>
              </div>
              <div className="form-column">
                <label>
                  <strong>Số điện thoại:</strong>
                  <input
                    type="text"
                    name="discountCode"
                    className="modal-input"
                    value={customer.phone}
                    readOnly
                  />
                  <br />
                </label>
              </div>
            </div>
            <div className="discount-section">
              <h3 className="discount-title">Chọn Mã Giảm Giá:</h3>
              <div className="discount-options">
                {discounts.map((discount) => (
                  <label key={discount.id} className="discount-option">
                    <input
                      type="radio"
                      name="id"
                      value={discount.id}
                      onChange={(e) => handleDiscountCode(e.target.value)}
                      className="discount-radio"
                    />
                    <div className="discount-details">
                      <span className="discount-name">{discount.name}</span>
                      <span className="discount-code">{discount.discountCode}</span>
                    </div>
                  </label>
                ))}
              </div>
              <div className="selected-discount">
                <label>Mã giảm giá đã chọn:</label>
                <input
                  type="text"
                  name="discountCode"
                  className="input-field"
                  value={discount.discountCode}
                  readOnly
                />
              </div>
            </div>


            <h3 className="section-title">Hình thức thanh toán</h3>
            <div className="payment-methods">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="PAYCARD"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="payment-radio"
                />
                Thẻ tín dụng/Thẻ ghi nợ
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="PAYQR"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="payment-radio"
                />
                Ví điện tử Momo
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="PAYCASH"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="payment-radio"
                />
                Thanh toán tiền mặt
              </label>
            </div>
          </>
        )}



      </div>

      <div className="right-panel booking-info">
        <h4>{showtime.room?.theaterName}</h4>
        <h5>
          <span style={{ color: '#4caf50' }}>
            {showtime.room?.name} - {showtime.room?.typeRoom.name}
          </span>
          <span>&emsp;</span>
          <span>
            {showtime.date} {showtime.startTime}
          </span>
        </h5>
        <hr />

        <h2 style={{ color: '#4caf50' }}>{showtime.movie?.title}</h2>
        {Object.entries(seatGroups).map(([type, seats]) =>
          seats.length > 0 ? (
            <div key={type} className="seat-group">
              <div className="seat-info">
                <div className="seat-type">
                  <p>{seats.length} x Ghế {type}</p>
                  <p>{seats.map((seat) => seat.name).join(', ')}</p>
                </div>
                <div>
                  <p className="seat-price">
                    {seats.reduce((total, seat) => total + (seat.price ?? 0), 0).toLocaleString('vi-VN')} VND
                  </p>
                </div>
              </div>
              <hr className="seat-divider" />
            </div>
          ) : null
        )}

        <h3>Tổng tiền:</h3>
        <h3 className="total-price">{totalPrice.toLocaleString('vi-VN')} VND</h3>
        {(viewTypePay) && (
          <>
            {/* Tính giảm giá */}
            <p className="discount-price">
              Giảm giá áp dụng: {discountPrice.toLocaleString('vi-VN')} VND
            </p>
            {/* Thành tiền */}
            <h3>Thành tiền: </h3>
            <h3 className="total-price">
              {(totalPrice - discountPrice).toLocaleString('vi-VN')} VND
            </h3>
          </>
        )}
        <button className="next-button" onClick={handleChooseType}>TIẾP THEO</button>
        <button className="back-button" onClick={handleExitType}>Trở lại</button>
        <div className="countdown-timer">Thời gian còn lại: {formatTime(timeLeft)}</div>
      </div>



      {showPayCashModal && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <div className="modal-header">
              <h2>Thanh toán bằng tiền mặt</h2>
              <button className="modal-close" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>
                  <strong>Số tiền cần thanh toán:</strong>
                  <input
                    type="text"
                    name="amountDue"
                    className="modal-input"
                    value={amountDue.toLocaleString('vi-VN')} // Hiển thị giá trị từ state
                    readOnly
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  <strong>Tiền khách hàng trả:</strong>
                  <input
                    type="text"
                    name="customerPaid"
                    className="modal-input"
                    placeholder="Nhập số tiền khách hàng trả"
                    value={customerPaid}
                    onChange={(e) => handleCustomerPaidChange(e.target.value)} // Hàm xử lý khi nhập tiền
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  <strong>Tiền trả lại khách:</strong>
                  <input
                    type="text"
                    name="change"
                    className="modal-input"
                    value={change.toLocaleString('vi-VN')} // Hiển thị tiền trả lại từ state
                    readOnly
                  />
                </label>
              </div>
              <div className="modal-buttons">
                <button className="cancel-button" onClick={handleCloseModal}>
                  Hủy
                </button>
                <button className="submit-button" onClick={handleAddSubmit}>
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </>
      )}



    </div>
  );
}

export default SeatSelection;
