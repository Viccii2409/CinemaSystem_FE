import React, { useEffect, useState } from 'react';
import './CinemaTicket_2.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { addPayCash, addSelectedSeat, getSelectedSeatByShowtime, getShowtimeByID, getTypeCustomer, updateSelectedSeat } from '../config/TicketConfig';
import moment from 'moment-timezone';
import { getTypeSeat } from '../config/TheaterConfig';

function CinemaTicket_2() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || '';
    const userid = 1;
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [currentDateTimeEnd, setCurrentDateTimeEnd] = useState('');
    const [timeLeft, setTimeLeft] = useState(10 * 60);
    const [showtime, setShowtime] = useState([]);
    const [seats, setSeats] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState([]);
    const [booking, setBooking] = useState([]);
    const [typeCustomer, setTypeCustomer] = useState([]);
    const [priceSeat, setPriceSeat] = useState([]);

    const [viewSeat, setViewSeat] = useState(false);
    const [viewTypeCustomer, setViewTypeCustomer] = useState(false);
    const [viewTypePay, setViewTypePay] = useState(false);

    const [seatCounts, setSeatCounts] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('');
    const [showPayCashModal, setShowPayCashModal] = useState(false);

    const [amountDue, setAmountDue] = useState(0);
    const [customerPaid, setCustomerPaid] = useState('');
    const [change, setChange] = useState(0);




    useEffect(() => {
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
                const response_showtime = await getShowtimeByID(id);
                setShowtime(response_showtime);
                setSelectedSeat(response_showtime.selectedSeats.filter(seat => seat.userid !== userid  || seat.status === "confirmed"));
                const roomInfor = response_showtime.room;
                if (roomInfor && Array.isArray(roomInfor.seat)) {
                    const response_price = response_showtime.priceTicket;
                    const response_typeseat = await getTypeSeat();
                    const priceSeatData = {};
                    response_typeseat.forEach(typeseat => {
                        priceSeatData[typeseat.id] = typeseat.surcharge + response_price;
                    })
                    setPriceSeat(priceSeatData);
                    const formattedSeatsData = formattedSeats(roomInfor.seat, roomInfor.numRows, roomInfor.numColumn);
                    const seatsWithTypes = changeTypeSeat(formattedSeatsData, response_price);
                    setSeats(seatsWithTypes || []);
                } else {
                    console.warn("Không có thông tin ghế hoặc dữ liệu ghế không phải là mảng.");
                    setSeats([]);
                }

                const response_typecustomer = await getTypeCustomer();
                const filteredTypeCustomer = response_typecustomer.filter(item => item.id !== 5);
                setTypeCustomer(filteredTypeCustomer);
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
        navigate('/admin/ticket-sales');
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
        if (viewSeat === true && viewTypeCustomer === false && viewTypePay === false) {
            if(booking.length === 0) {
              alert("Bạn chưa chọn ghế!");
              return;
            }
            setViewSeat(false);

            if (!typeCustomer.length || !Object.keys(seatGroups).length) return;

            const initialData = {};
            typeCustomer.forEach(customer => {
                initialData[customer.id] = {};
                if (customer.id === 3) {
                    initialData[customer.id][1] = seatGroups['regular'].length || 0;
                    initialData[customer.id][2] = seatGroups['vip'].length || 0;
                    initialData[customer.id][3] = seatGroups['double-seat'].length || 0;
                    initialData[customer.id]["discount"] = customer.discount;
                } else {
                    initialData[customer.id][1] = 0;
                    initialData[customer.id][2] = 0;
                    initialData[customer.id][3] = 0;
                    initialData[customer.id]["discount"] = customer.discount;
                }
            });

            setSeatCounts(initialData);

            setViewTypeCustomer(true);

        }
        else if (viewSeat === false && viewTypeCustomer === true && viewTypePay === false) {
            setViewTypeCustomer(false);
            setViewTypePay(true);

        }
        else if (viewSeat === false && viewTypeCustomer === false && viewTypePay === true) {
            if (!paymentMethod) {
                alert('Vui lòng chọn hình thức thanh toán!');
                return;
            }
            
            setAmountDue(totalPrice - calculateTotalDiscount(seatCounts, priceSeat));
            if(paymentMethod === "PAYCASH") {
                setShowPayCashModal(true);
            }
            console.log('Phương thức thanh toán:', paymentMethod);
        }
    };


    const handleInputChange = (customerId, seatType, value) => {
        const newValue = parseInt(value) || 0;

        setSeatCounts(prevCounts => {
            // Lấy giá trị hiện tại của số ghế cho khách hàng đang sửa và ID = 3
            const currentCount = prevCounts[customerId][seatType] || 0;
            const difference = newValue - currentCount;
            const remainingSeatsForId3 = prevCounts[3][seatType] || 0;

            // Kiểm tra nếu giá trị chênh lệch lớn hơn ghế khả dụng của ID = 3
            if (customerId !== 3 && remainingSeatsForId3 - difference < 0) {
                alert('Không đủ ghế để phân bổ!');
                return prevCounts; // Không cập nhật nếu ghế không đủ
            }

            // Cập nhật số ghế cho loại khách hàng đang chỉnh sửa
            const updatedCounts = {
                ...prevCounts,
                [customerId]: {
                    ...prevCounts[customerId],
                    [seatType]: newValue
                }
            };

            // Trừ số lượng ghế từ loại khách hàng ID = 3
            if (customerId !== 3) {
                updatedCounts[3] = {
                    ...updatedCounts[3],
                    [seatType]: remainingSeatsForId3 - difference
                };
            }

            return updatedCounts;
        });
    };

    const calculateTotalDiscount = (seatCounts, priceSeat) => {
        const calculateForType = (seatType) =>
            (seatCounts[1]?.[seatType] * seatCounts[1]?.discount * priceSeat[seatType] +
                seatCounts[2]?.[seatType] * seatCounts[2]?.discount * priceSeat[seatType] +
                seatCounts[3]?.[seatType] * seatCounts[3]?.discount * priceSeat[seatType] +
                seatCounts[4]?.[seatType] * seatCounts[4]?.discount * priceSeat[seatType]) / 100 || 0;

        return calculateForType(1) + calculateForType(2) + calculateForType(3);
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

    const handleAddSubmit = async () => {
        console.log("payment");
        // const response_bookingid = await addBooking(showtime.id);

        const paymentCash = {
            showtimeid: showtime.id,
            agentid : userid,
            amount : amountDue,
            received : customerPaid,
            moneyReturned : change,
            paytypecustomer: filterGreaterThanZero(seatCounts),
            ticket: booking
        }
        // console.log(JSON.stringify(paymentCash, null, 2));
        try {
            const response = await addPayCash(paymentCash);
            if (response) {
                alert("Bạn đã đặt ghế thành công!");
                navigate('/admin/ticket-sales');
                return;
            } else {
                alert("Lỗi khi đặt ghế!");
                return;
            }
        } catch (error) {
            console.error("Error addPayCash api", error);
        }
         
    }


    const filterGreaterThanZero = (data) => {
        const result = {};
        for (const key in data) {
            result[key] = {};
            for (const subKey in data[key]) {
                // Lọc các giá trị lớn hơn 0, bỏ qua key "discount"
                if (subKey !== "discount" && data[key][subKey] > 0) {
                    result[key][subKey] = data[key][subKey];
                }
            }
            // Kiểm tra nếu result[key] rỗng thì xóa
            if (Object.keys(result[key]).length === 0) {
                delete result[key];
            }
        }
        return result;
    };


    const handleExitType = () => {
        if (viewSeat === true && viewTypeCustomer === false && viewTypePay === false) {
            navigate('/admin/ticket-sales');
            return;
        }
        else if (viewSeat === false && viewTypeCustomer === true && viewTypePay === false) {
            setViewSeat(true);
            setViewTypeCustomer(false);
            return;
        }
        else if (viewSeat === false && viewTypeCustomer === false && viewTypePay === true) {
            setViewTypeCustomer(true);
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

                {viewTypeCustomer && (
                    <div className="booking-table-container">
                        <h2>Chọn loại khách hàng đặt vé</h2>
                        <table className="booking-table">
                            <thead>
                                <tr>
                                    <th>Loại Khách Hàng</th>
                                    <th>Ghế thường</th>
                                    <th>Ghế vip</th>
                                    <th>Ghế đôi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {typeCustomer
                                    .filter((type) => type.id !== 3)
                                    .map(type => (
                                        <tr key={type.id}>
                                            <td>{type.name}</td>
                                            {[1, 2, 3].map((num) => (
                                                <td key={num}>
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        value={seatCounts[type.id]?.[num] ?? 0}
                                                        onChange={(e) =>
                                                            handleInputChange(type.id, num, e.target.value)
                                                        }
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                <tr>
                                    <td>Người lớn</td>
                                    {[1, 2, 3].map((num) => (
                                        <td key={num}>
                                            <input
                                                type="number"
                                                min={0}
                                                value={seatCounts[3]?.[num] ?? 0}
                                                disabled
                                            />
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {viewTypePay && (
                    <>
                        <h3>Hình thức thanh toán</h3>
                        <div className="payment-methods">
                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="PAYCARD"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                Thẻ tín dụng/Thẻ ghi nợ
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="PAYQR"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                Ví điện tử Momo
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="PAYCASH"
                                    onChange={(e) => setPaymentMethod(e.target.value)}
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
                                    {(viewTypeCustomer || viewTypePay) && (
                                        type === "regular" ? (
                                            <p className="discount-price">
                                                Giảm giá: {((seatCounts[1]?.[1] * seatCounts[1]["discount"] * priceSeat[1] +
                                                    seatCounts[2][1] * seatCounts[2]["discount"] * priceSeat[1] +
                                                    seatCounts[3][1] * seatCounts[3]["discount"] * priceSeat[1] +
                                                    seatCounts[4][1] * seatCounts[4]["discount"] * priceSeat[1]) / 100 ?? 0).toLocaleString('vi-VN')} VND
                                            </p>
                                        ) : type === "vip" ? (
                                            <p className="discount-price">
                                                Giảm giá: {((seatCounts[1]?.[2] * seatCounts[1]["discount"] * priceSeat[2] +
                                                    seatCounts[2][2] * seatCounts[2]["discount"] * priceSeat[2] +
                                                    seatCounts[3][2] * seatCounts[3]["discount"] * priceSeat[2] +
                                                    seatCounts[4][2] * seatCounts[4]["discount"] * priceSeat[2]) / 100 ?? 0).toLocaleString('vi-VN')} VND
                                            </p>
                                        ) : type === "double-seat" ? (
                                            <p className="discount-price">
                                                Giảm giá: {((seatCounts[1]?.[3] * seatCounts[1]["discount"] * priceSeat[3] +
                                                    seatCounts[2][3] * seatCounts[2]["discount"] * priceSeat[3] +
                                                    seatCounts[3][3] * seatCounts[3]["discount"] * priceSeat[3] +
                                                    seatCounts[4][3] * seatCounts[4]["discount"] * priceSeat[3]) / 100 ?? 0).toLocaleString('vi-VN')} VND
                                            </p>
                                        ) : (
                                            <p className="discount-price">Không xác định loại ghế</p>
                                        )
                                    )}
                                </div>
                            </div>
                            <hr className="seat-divider" />
                        </div>
                    ) : null
                )}

                <h3>Tổng tiền:</h3>
                <h3 className="total-price">{totalPrice.toLocaleString('vi-VN')} VND</h3>
                {(viewTypeCustomer || viewTypePay) && (
                    <>
                        {/* Tính giảm giá */}
                        <p className="discount-price">
                            Giảm giá áp dụng: {calculateTotalDiscount(seatCounts, priceSeat).toLocaleString('vi-VN')} VND
                        </p>
                        {/* Thành tiền */}
                        <h3>Thành tiền: </h3>
                        <h3 className="total-price">
                            {(totalPrice - calculateTotalDiscount(seatCounts, priceSeat)).toLocaleString('vi-VN')} VND
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

export default CinemaTicket_2;
