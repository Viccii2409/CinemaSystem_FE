import React, { useEffect, useState } from 'react';
import './ViewBooking.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { getBookingById } from '../config/TicketConfig';
import BarcodeGenerator from "../BarcodeGenerator";

const ViewBooking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || '';
    const [bookingDto, setBookingDto] = useState({});

    useEffect(() => {
        const getBookingInfor = async () => {
            if (!id) {
                console.warn("ID của vé không tồn tại.");
                navigate('/home');
                return;
            }
            try {
                const response_ticket = await getBookingById(id);
                setBookingDto(response_ticket);
                console.log(response_ticket);
            } catch (error) {
                console.error("Error api", error);
                setBookingDto({});
            }
        }
        getBookingInfor();
    }, [id]);

    return (
        <div className="ticket-info-section">
            <h2 className="ticket-info-title">Thông Tin Vé Của Bạn</h2>
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
                    <span className="ticket-label">Tên khách hàng:</span>
                    <span className="ticket-value">{bookingDto.nameCustomer || "N/A"}</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-label">Số điện thoại:</span>
                    <span className="ticket-value">{bookingDto.phone || "N/A"}</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-label">Email:</span>
                    <span className="ticket-value">{bookingDto.email || "N/A"}</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-label">Ngày Đặt Vé:</span>
                    <span className="ticket-value">{bookingDto.dateBooking ? new Date(bookingDto.dateBooking).toLocaleString() : "N/A"}</span>
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
            </div>
        </div>
    );
};

export default ViewBooking;
