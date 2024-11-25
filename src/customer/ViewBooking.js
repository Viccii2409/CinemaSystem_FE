import React, { useEffect, useState } from 'react';
import './ViewBooking.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { getBookingById } from '../config/TicketConfig';

const ViewBooking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || '';
    const [ticket, setTicket] = useState([]);

    useEffect(() => {
        const getBookingInfor = async () => {
            if (!id) {
                console.warn("ID của vé không tồn tại.");
                navigate('/home');
                return;
            }
            try {
                const response_ticket = await getBookingById(id);
                setTicket(response_ticket);
            } catch (error) {
                console.error("Error api", error);
                setTicket([]);
            }
        }
        getBookingInfor();
    }, [id]);

    return (
        <div className="ticket-info-section">
            <h2 className="ticket-info-title">Thông Tin Vé Của Bạn</h2>
            <div className="ticket-info">
                <div className="ticket-row">
                    <span className="ticket-label">Tên Khách Hàng:</span>
                    <span className="ticket-value">{ticket.customerName}</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-label">Email:</span>
                    <span className="ticket-value">{ticket.customerEmail}</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-label">Số Điện Thoại:</span>
                    <span className="ticket-value">{ticket.customerPhone}</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-label">Tên Phim:</span>
                    <span className="ticket-value">{ticket.movieName}</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-label">Rạp:</span>
                    <span className="ticket-value">{ticket.cinema}</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-label">Suất Chiếu:</span>
                    <span className="ticket-value">{ticket.showtime}</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-label">Ghế:</span>
                    <span className="ticket-value">{ticket.seats.join(", ")}</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-label">Mã Giảm Giá:</span>
                    <span className="ticket-value">{ticket.discountCode || "Không áp dụng"}</span>
                </div>
                <div className="ticket-row">
                    <span className="ticket-label">Tổng Tiền:</span>
                    <span className="ticket-value">{ticket.totalAmount} VND</span>
                </div>
            </div>
            <div className="ticket-actions">
                {/* <button className="btn-primary" onClick={handleDownloadTicket}>Tải Vé</button>
                <button className="btn-secondary" onClick={handleBackToHome}>Quay Về Trang Chủ</button> */}
            </div>
        </div>

    );
}

export default ViewBooking;