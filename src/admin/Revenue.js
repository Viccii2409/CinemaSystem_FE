import React, { useState, useEffect } from 'react';
import { DatePicker, Table, Select, Button, message } from 'antd';
import axios from 'axios';
import moment from 'moment';
import 'antd/dist/antd.css';
import { getAllMovies } from "../config/MovieConfig"; 
import { getTheater } from "../config/TheaterConfig"; 
import { fetchRevenueData } from '../config/TicketConfig';
import "./Revenue.css";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
const { RangePicker } = DatePicker;
const { Option } = Select;

const Revenue = () => {
  const [data, setData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState('time'); 
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const [theaterId, setTheaterId] = useState(null);
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    // Lấy dữ liệu phim và rạp từ API
    const fetchMovies = async () => {
      try {
        const response = await getAllMovies();
        setMovies(response); 
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phim:", error);
      }
    };

    const fetchTheaters = async () => {
      try {
        const response = await getTheater();
        console.log('Dữ liệu rạp:', response); 
        console.log(response.data);
        setTheaters(response.data); 
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu rạp:", error);
      }
    };

    fetchMovies();
    fetchTheaters();
  }, []);

  const fetchRevenue = async () => {
    setLoading(true);
    setData([]); 
    setTotalRevenue(0); 
  
    try {
      const startDateFormatted = startDate ? moment(startDate).format('YYYY-MM-DDT00:00:00') : undefined;
      const endDateFormatted = endDate ? moment(endDate).format('YYYY-MM-DDT23:59:59') : undefined;
        const response = await fetchRevenueData(filterType, {
        movieId,
        theaterId,
        startDate: startDateFormatted,
        endDate: endDateFormatted,
      });
  
      console.log('Dữ liệu trả về từ response:', response);
  
      if (response.details && response.details.length > 0) {
        console.log('response.details',response.details )
        // Xử lý dữ liệu nếu response có phần `details`
        const monthData = response.details.map(item => ({
          month: item.month || '-',
          year: item.year || '-',
          totalRevenue: item.totalRevenue,
          movieTitle: item.movieTitle || item.theaterName || '-',
          theaterName: item.theaterName || item.movieTitle || '-',
          date: '-',
        }));
  
        setData(monthData);
        setTotalRevenue(response.totalRevenue);
      } else if (Array.isArray(response)) {
        const filteredData = response.filter(item =>
          item.date !== 'Total' && item.movieTitle !== 'Total' && item.theaterName !== 'Total'
        );
      
        // Tính tổng doanh thu từ tất cả các mục trong response, loại trừ mục 'Total'
        const totalRevenue = response
          .filter(item => item.date !== 'Total' && item.movieTitle !== 'Total' && item.theaterName !== 'Total') // Loại bỏ mục 'Total'
          .reduce((acc, item) => acc + (item.totalRevenue || 0), 0);
      
        setData(filteredData);
        setTotalRevenue(totalRevenue); 
  
      
      
      } else {
        message.warning("Không có dữ liệu!");
      }
  
      message.success('Dữ liệu đã được tải thành công!');
    } catch (error) {
      message.error('Không thể tải dữ liệu!');
      console.error('Lỗi:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Chức năng xuất Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data); // data dữ liệu xuất
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Doanh thu');
  
    // Tạo đối tượng Blob và xuất tệp Excel
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  
    saveAs(excelBlob, 'Doanh_Thu.xlsx');
  };

  // Render cột ngày/tháng
  const columns = [
    { 
      title: filterType === 'time' ? 'Ngày' : 'Tháng/Năm',  
      dataIndex: 'date',
      key: 'date',
      render: (value, record) => {

        if (filterType === 'movie' || filterType === 'theater') {
          if (!movieId && filterType === 'movie') return '-';  
          if (!theaterId && filterType === 'theater') return '-';  
        }
        
        if(!startDate || !endDate)
            return record.month && record.year ? `${record.month}/${record.year}` : '-';
        else {const dateToDisplay = (startDate || endDate) ? moment(record.date).format('DD/MM/YYYY') : moment().format('DD/MM/YYYY');
          return dateToDisplay; 
          } 
      },
    },
    {
      title: filterType === 'movie' ? 'Tên phim' : (filterType === 'theater' ? 'Tên rạp' : 'Ngày'),
      dataIndex: filterType === 'movie' ? 'movieTitle' : (filterType === 'theater' ? 'theaterName' : 'date'),
      key: 'name',
      className: filterType === 'time' ? 'hidden-column' : '', 
    },
    { 
      title: 'Doanh thu (VND)', 
      dataIndex: 'totalRevenue', 
      key: 'totalRevenue', 
      render: (value) => value.toLocaleString(),
    },
  ];
  
  

// Xử lý khi chọn bộ lọc
const handleFilterChange = (value) => {
  setFilterType(value);
  setData([]); 
  setTotalRevenue(0);
  setMovieId(null);
  setTheaterId(null);

  if (value !== 'time') {
    setStartDate(null);
    setEndDate(null);
  }

  // Nếu chuyển sang 'movie' hoặc 'theater', reset lại movieId và theaterId
  if (value === 'movie') {
    setMovieId(null);  
  } else if (value === 'theater') {
    setTheaterId(null); 
  }
};
    

  return (
    <div style={{ padding: '20px' }}>
      <h2>Thống kê doanh thu</h2>
      <div style={{ marginBottom: '20px' }}>
        {/* Bộ lọc */}
        <Select value={filterType} onChange={handleFilterChange} style={{ width: 200, marginRight: 10 }}>
          <Option value="time">Theo thời gian</Option>
          <Option value="movie">Theo phim</Option>
          <Option value="theater">Theo rạp</Option>
        </Select>

        {/* Chọn khoảng thời gian */}
        <RangePicker
          format="YYYY-MM-DD"
          onChange={(dates) => {
            setStartDate(dates ? dates[0].format('YYYY-MM-DD') : null);
            setEndDate(dates ? dates[1].format('YYYY-MM-DD') : null);
          }}
          style={{ marginRight: 10 }}
          disabledDate={(current) => filterType === 'time' && current && current > moment().endOf('day')} 
        />

        {/* Chọn phim */}
        {filterType === 'movie' && (
          <Select
            placeholder="Chọn phim"
            onChange={(value) => setMovieId(value)}
            style={{ width: 200, marginRight: 10 }}
          >
            {movies.map(movie => (
              <Option key={movie.id} value={movie.id}>{movie.title}</Option>
            ))}
          </Select>
        )}

        {/* Chọn rạp */}
        {filterType === 'theater' && (
          <Select
            placeholder="Chọn rạp"
            onChange={(value) => setTheaterId(value)}
            style={{ width: 200, marginRight: 10 }}
          >
            {Array.isArray(theaters) && theaters.length > 0 ? (
              theaters.map(theater => (
                <Option key={theater.id} value={theater.id}>{theater.name}</Option>
              ))
            ) : (
              <Option disabled>No theaters available</Option>
            )}
          </Select>
        )}

        {/* Nút tải dữ liệu */}
        <Button type="primary" onClick={fetchRevenue} loading={loading}>
          Thống kê
        </Button>

        {/* Nút xuất Excel */}
        <Button type="default" onClick={exportToExcel} style={{ marginLeft: 10 }}>
          Xuất Excel
        </Button>
      </div>

      {/* Bảng doanh thu */}
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record.date || record.movieTitle || record.theaterName}
        pagination={{ pageSize: 5 }}
      />

      {/* Tổng doanh thu */}
      <h3>Tổng doanh thu: {totalRevenue.toLocaleString()} VND</h3>
    </div>
  );
};

export default Revenue;
