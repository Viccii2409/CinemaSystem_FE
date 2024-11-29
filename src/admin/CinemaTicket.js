import React, { useEffect, useState } from 'react';
import './CinemaTicket.css';
import { getShowtime } from '../config/TicketConfig';
import { useNavigate } from 'react-router-dom';


const CinemaTicket = () => {
  const navigate = useNavigate();
  const [days, setDays] = useState([]);
  const [theaters, setTheaters] = useState([])
  const [selectedTheater, setSelectedTheater] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [visibleDays, setVisibleDays] = useState([]);

  const [startIndex, setStartIndex] = useState(0);
  const maxDaysToShow = 5;

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
        console.log(convertData(listtheater));
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

  return (
    <div className="cinema-ticket-container">
      <h1>Bán Vé Xem Phim</h1>

      <div className="theater-selection">
        <label htmlFor="theater">Rạp chiếu: </label>
        <select name="id" value={selectedTheater?.id || ''} onChange={(e) => handleSelectTheater(e.target.value)}>
          <option value="" disabled>---Chọn rạp---</option>
          {theaters.map((theater) => (
            <option key={theater.id} value={theater.id}>
              {theater.name}
            </option>
          ))}
        </select>
      </div>

      {/* Chọn ngày */}
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
  );
};

export default CinemaTicket;
