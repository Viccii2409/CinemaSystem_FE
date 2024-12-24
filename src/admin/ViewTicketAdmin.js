import React, { useEffect, useState, useRef } from 'react';
import '../customer/ViewBooking.css';
import { useNavigate, useLocation } from 'react-router-dom';
import BarcodeGenerator from "../BarcodeGenerator";
import { exportBooking, getBookingByBarcode, getBookingById, updatePayOnline } from '../config/TicketConfig';

const ViewTicketAdmin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || '';
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get("orderId");
    const resultCode = queryParams.get("resultCode");
    const [bookingDto, setBookingDto] = useState({});
    const hasApiBeenCalled = useRef(false);

    useEffect(() => {
        const getBookingInfor = async () => {
            // Kiểm tra nếu đã gọi API hoặc chưa có đủ thông tin để gọi API
            if (!hasApiBeenCalled.current && (orderId && resultCode || id)) {
                hasApiBeenCalled.current = true; // Đánh dấu là API đã gọi

                try {
                    if (orderId && resultCode) {
                        await updatePayOnline(orderId, resultCode); // Gọi API cập nhật thanh toán
                        const response_ticket = await getBookingByBarcode(orderId); // Gọi API lấy thông tin vé
                        setBookingDto(response_ticket);
                        console.log(response_ticket);
                    }
                    if (id) {
                        const response_ticket = await getBookingById(id); // Gọi API lấy thông tin vé theo id
                        setBookingDto(response_ticket);
                    }
                } catch (error) {
                    console.error("Error api", error);
                    setBookingDto({});
                }
            }
        };

        getBookingInfor();
    }, [orderId, resultCode, id]);

    const handleBackToHome = () => {
        navigate('/admin/ticket-sales');
        return;
    }
    
      const handleExport = async () => {
        const response = await exportBooking(bookingDto.id);
        if(response) {
          alert("Bạn đã xuất vé thành công!");
        }
        else {
          alert("Xuất vé thất bại!");
          return;
        }
      }

    

    return (
        <div className="ticket-info-section">
            {orderId && resultCode && (<h2 className="ticket-info-title">{Number(resultCode) === 0 ? "Thanh toán thành công" : "Thanh toán thất bại"}</h2>)}
            {id && <h2 className="ticket-info-title">Thông tin vé của bạn</h2>}
            <div className="ticket-main">
                {/* Hình ảnh bên trái */}
                <div className="ticket-image-container">
                    <img className="ticket-image" src={bookingDto.image || "https://via.placeholder.com/200"} alt={bookingDto.nameMovie || "Ảnh phim"} />
                </div>

                {/* Thông tin chính bên phải */}
                <div className="ticket-details">
                    <div className="ticket-row">
                        <span className="ticket-label">Tên Phim:</span>
                        <span className="ticket-value">{bookingDto.nameMovie || "N/A"}</span>
                    </div>
                    <div className="ticket-row">
                        <span className="ticket-label">Phòng Chiếu:</span>
                        <span className="ticket-value">{bookingDto.nameRoom || "N/A"} - {bookingDto.typeRoom}</span>
                    </div>
                    <div className="ticket-row">
                        <span className="ticket-label">Lịch Chiếu:</span>
                        <span className="ticket-value">{bookingDto.dateShowtime ? new Date(bookingDto.dateShowtime).toLocaleDateString() : "N/A"} {bookingDto.startTime} - {bookingDto.endTime}</span>
                    </div>
                    <div className="ticket-row">
                        <span className="ticket-label">Ghế Đặt:</span>
                        <span className="ticket-value">{Array.isArray(bookingDto.nameSeats) ? bookingDto.nameSeats.join(", ") : "Không có ghế ngồi"}</span>
                    </div>
                </div>
            </div>

            {/* Các thông tin khác */}
            <div className="ticket-other-info">
                <div className="ticket-row">
                    <span className="ticket-label">Rạp:</span>
                    <span className="ticket-value">{bookingDto.nameTheater || "N/A"}</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-label">Địa Chỉ Rạp:</span>
                    <span className="ticket-value">{bookingDto.address || "N/A"}</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-label">Ngày Đặt Vé:</span>
                    <span className="ticket-value">{bookingDto.dateBooking}</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-label">Tổng tiền:</span>
                    <span className="ticket-value">
                        {bookingDto.totalPrice ? bookingDto.totalPrice.toLocaleString('vi-VN') : "0"} VND
                    </span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-label">Giảm giá:</span>
                    <span className="ticket-value">
                        {bookingDto.discountPrice ? bookingDto.discountPrice.toLocaleString('vi-VN') : "0"} VND
                    </span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-label">Thành tiền:</span>
                    <span className="ticket-value">
                        {bookingDto.amount ? bookingDto.amount.toLocaleString('vi-VN') : "0"} VND
                    </span>
                </div>
                <div className="ticket-row barcode-row">
                    <span className="ticket-label">Mã Barcode:</span>
                    <BarcodeGenerator code={bookingDto.barcode || "N/A"} />
                </div>
                <div className="ticket-actions">
                    <button className="btn-secondary"
                        onClick={handleExport}
                    >Xuất vé</button>
                </div>
            </div>
        </div>
    );
};

export default ViewTicketAdmin;
