import React, { useEffect, useState } from 'react';
import './TheaterManagement.css';
import { exportBooking, getShowtime, searchBooking } from '../config/TicketConfig';
import { useNavigate } from 'react-router-dom';
import BarcodeGenerator from "../BarcodeGenerator";


const CinemaTicket = () => {
  const navigate = useNavigate();
  const [days, setDays] = useState([]);
  const [theaters, setTheaters] = useState([])
  const [search, setSearch] = useState('');
  const [selectedTheater, setSelectedTheater] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [visibleDays, setVisibleDays] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const maxDaysToShow = 5;

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDetail, setBookingDetail] = useState([]);

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  const convertData = (theaterList) => {
    const updatedTheaters = theaterList.map((theater) => {
      const listDay = [];
      const movies = theater.movie.map((movie) => {
        const showtime = movie.showtime.reduce((acc, show) => {
          const timeObj = { startTime: show.startTime, endTime: show.endTime, id: show.id };

          // Thêm ngày vào listDay nếu chưa có
          if (!listDay.includes(show.date)) {
            listDay.push(show.date);
          }

          const existingDay = acc.find((item) => item.day === show.date);
          if (existingDay) {
            existingDay.times.push(timeObj);
          } else {
            acc.push({ day: show.date, times: [timeObj] });
          }
          return acc;
        }, []);
        return { ...movie, showtime };
      });
      return { ...theater, movies, availableDays: listDay };
    });

    return updatedTheaters;
  };


  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const listtheater = await getShowtime();
        setTheaters(convertData(listtheater));
      } catch (error) {
        console.error("Error get showtime api", error);
      }
    }
    fetchTheater();
  }, [])

  const handleSelectTheater = (theaterid) => {
    const theater = theaters.find((item) => item.id === Number(theaterid));
    setSelectedTheater(theater);

    // Lấy danh sách ngày từ rạp đã chọn
    if (theater) {
      const sortedDays = [...theater.availableDays].sort((a, b) => new Date(a) - new Date(b));
      setDays(sortedDays);
      const listDayVisible = sortedDays.slice(0, maxDaysToShow);
      setVisibleDays(listDayVisible);
    }
  };


  const handlePrevClick = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNextClick = () => {
    if (startIndex + maxDaysToShow < days.length) setStartIndex(startIndex + 1);
  };

  useEffect(() => {
    const listDay = days.slice(startIndex, startIndex + maxDaysToShow);
    setVisibleDays(listDay);
  }, [startIndex]);

  const handleShowtimeSelect = (showtimeid) => {
    console.log(showtimeid);
    navigate('booking-seat', { state: { id: showtimeid } });
  }

  const handleSearch = async () => {
    const response = await searchBooking(search);
    if (response) {
      setBookingDetail(response);
      setSearch('');
      setShowBookingModal(true);
    }
    else {
      alert(`Không tìm thấy vé có mã: ${search}`);
      return;
    }
  }

  useEffect(() => {
    console.log(search);
  }, [search]);

  const handleCloseModal = () => {
    setBookingDetail([]);
    setShowBookingModal(false);
  }

  const handleExportSubmit = async (e) => {
    e.preventDefault();
    const response = await exportBooking(bookingDetail.id);
    if(response) {
      alert("Bạn đã xuất vé thành công!");
      handleCloseModal();
    }
    else {
      alert("Xuất vé thất bại!");
      return;
    }
  }

  return (
    <div className="cinema-management-system">
      <h2>Bán Vé Xem Phim</h2>

      <div className="search-theater">
        <select name="id" className='input-search' value={selectedTheater?.id || ''} onChange={(e) => handleSelectTheater(e.target.value)}>
          <option value="" disabled>---Chọn rạp---</option>
          {theaters.map((theater) => (
            <option key={theater.id} value={theater.id}>
              {theater.name}
            </option>
          ))}
        </select>

        <input
          type='text'
          placeholder='Nhập mã vé ...'
          className='input-search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="button search-button"
          onClick={handleSearch}
        >Tìm kiếm </button>
      </div>

      <div className="cinema-ticket-container">
        {selectedTheater && visibleDays.length > 0 ? (
          <div className="days-list-container">
            <button onClick={handlePrevClick} disabled={startIndex === 0}>
              &lt;
            </button>
            {visibleDays.map((day) => (
              <button
                key={day}
                onClick={() => handleDaySelect(day)}
                className={selectedDay === day ? 'selected' : ''}
              >
                {day}
              </button>
            ))}
            <button onClick={handleNextClick} disabled={startIndex + maxDaysToShow >= days.length}>
              &gt;
            </button>
          </div>
        ) : (
          <p>Không có ngày chiếu</p>
        )}

        {selectedTheater && selectedDay && (
          <div className="movies-list">
            {selectedTheater.movies
              .filter((movie) =>
                movie.showtime.some((showtime) => showtime.day === selectedDay)
              )
              .map((movie) => (
                <div key={movie.id} className="movie-item">
                  <div className="movie-item-img">
                    <img src={movie.image || 'https://via.placeholder.com/150'} alt={movie.title} />
                  </div>
                  <div className="movie-item-infor">
                    <h3>{movie.title}</h3>
                    <p>Thời lượng: {movie.duration} phút</p>
                    <p>Mô tả: {movie.description}</p>
                    <div className="showtimes">
                      <p>Chọn giờ chiếu:</p>
                      {movie.showtime
                        .filter((showtime) => showtime.day === selectedDay)
                        .flatMap((showtime) => showtime.times)
                        .sort((a, b) => a.startTime.localeCompare(b.startTime))
                        .map((showtime, index) => (
                          <button
                            key={index}
                            onClick={() => handleShowtimeSelect(showtime.id)}
                          >
                            {showtime.startTime}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            {selectedTheater.movies
              .filter((movie) =>
                movie.showtime.some((showtime) => showtime.day === selectedDay)
              ).length === 0 && (
                <p>Không có phim nào có suất chiếu vào ngày đã chọn.</p>
              )}
          </div>
        )}

      </div>

      {showBookingModal && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <div className="modal-header">Thông tin vé đặt </div>
            <form className="modal-info"
              onSubmit={handleExportSubmit}>
              <div className="form-group">
                <div className="form-group form-row">
                  <div className="form-column">
                    <label>
                      <strong>Hình ảnh:</strong>
                      <img
                        src={bookingDetail.image}
                        alt="Movie"
                        className="image-booking"
                      />
                    </label>
                  </div>

                  <div className="form-column">
                    <label>
                      <strong>Tên rạp:</strong>
                      <input
                        type="text"
                        className="modal-input"
                        value={bookingDetail.nameTheater}
                        readOnly
                      />
                      <br />
                    </label>
                    <label>
                      <strong>Tên phim:</strong>
                      <input
                        type="text"
                        className="modal-input"
                        value={bookingDetail.nameMovie}
                        readOnly
                      />
                      <br />
                    </label>
                    <label>
                      <strong>Phòng Chiếu:</strong>
                      <input
                        type="text"
                        className="modal-input"
                        value={bookingDetail.nameRoom}
                        readOnly
                      />
                      <br />
                    </label>
                    <label>
                      <strong>Lịch Chiếu:</strong>
                      <input
                        type="text"
                        className="modal-input"
                        value={
                          bookingDetail.dateShowtime
                            ? `${new Date(bookingDetail.dateShowtime).toLocaleDateString()} ${bookingDetail.startTime} - ${bookingDetail.endTime}`
                            : "N/A"
                        }
                        readOnly
                      />
                      <br />
                    </label>
                    <label>
                      <strong>Ghế Đặt:</strong>
                      <input
                        type="text"
                        className="modal-input"
                        value={Array.isArray(bookingDetail.nameSeats) ? bookingDetail.nameSeats.join(", ") : "Không có ghế ngồi"}
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-column">
                    <label>
                      <strong>Địa chỉ rạp:</strong>
                      <input
                        type="text"
                        className="modal-input input-long"
                        value={bookingDetail.address}
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                </div>
                <div className="form-group form-row">
                  <div className="form-column">
                    <label>
                      <strong>Ngày Đặt Vé:</strong>
                      <input
                        type="text"
                        className="modal-input"
                        value={bookingDetail.dateBooking}
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                  {bookingDetail.nameCustomer && (
                    <div className="form-column">
                      <label>
                        <strong>Tên khách hàng:</strong>
                        <input
                          type="text"
                          className="modal-input"
                          value={bookingDetail.nameCustomer}
                          readOnly
                        />
                        <br />
                      </label>
                    </div>
                  )}

                </div>
                {bookingDetail.phone && bookingDetail.email && (
                  <div className="form-group form-row">
                    <div className="form-column">
                      <label>
                        <strong>Số điện thoại:</strong>
                        <input
                          type="text"
                          className="modal-input"
                          value={bookingDetail.phone}
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
                          className="modal-input"
                          value={bookingDetail.email}
                          readOnly
                        />
                        <br />
                      </label>
                    </div>
                  </div>
                )}

                <div className="form-group  form-row">
                  <div className="form-column">
                    <label>
                      <strong>Tổng tiền:</strong>
                      <input
                        type="text"
                        className="modal-input"
                        value={bookingDetail.totalPrice ? bookingDetail.totalPrice.toLocaleString('vi-VN') : "0"}
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                  <div className="form-column">
                    <label>
                      <strong>Giảm giá:</strong>
                      <input
                        type="text"
                        className="modal-input"
                        value={bookingDetail.discountPrice ? bookingDetail.discountPrice.toLocaleString('vi-VN') : "0"}
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-column">
                    <label>
                      <strong>Thành tiền:</strong>
                      <input
                        type="text"
                        className="modal-input input-long"
                        value={bookingDetail.amount ? bookingDetail.amount.toLocaleString('vi-VN') : "0"}
                        readOnly
                      />
                      <br />
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-column">
                    <label>
                      <strong>Mã Barcode:</strong>
                      <BarcodeGenerator code={bookingDetail.barcode || "N/A"} />
                      <br />
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-buttons">
                <button type='button' className="close-button" onClick={handleCloseModal}>
                  Thoát
                </button>
                <button className="save-button" type="submit">
                  Xuất vé
                </button>
              </div>
            </form>
          </div>
        </>
      )}

    </div>
  );
};

export default CinemaTicket;
