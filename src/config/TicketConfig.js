import api from '../Api.js';
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import moment from 'moment';


// export const getDiscount = () => api.get("/ticket/public/discount");

export const getTimeFrame = async () => {
    return api.get('/movie/timeframe')
        .then(response => response.data)
        .catch(error => {
            console.error("Error get timeframe", error);
            return null;
        })
};

export const getDayOfWeek = async () => {
    return api.get('/movie/dayofweek')
        .then(response => response.data)
        .catch(error => {
            console.error("Error get dayofweek", error);
            return null;
        })
};

export const getTypeCustomer = async () => {
    return api.get('/ticket/typecustomer')
        .then(response => response.data)
        .catch(error => {
            console.error("Error get typecustomer", error);
            return null;
        })
};

export const getTypeDiscount = async () => {
    return api.get('/ticket/typediscount')
        .then(response => response.data)
        .catch(error => {
            console.error("Error get typediscount", error);
            return null;
        })
};

export const getAllDiscount = async () => {
    return api.get('/ticket/public/discount')
    .then(response => response.data)
    .catch(error => {
        console.error("Error getAllDiscount", error);
        return null;
    })
}

export const getAllDiscountActive = async () => {
    return api.get('/ticket/public/discount/active')
    .then(response => response.data)
    .catch(error => {
        console.error("Error getAllDiscount", error);
        return null;
    })
}

export const getBasePrice = async () => {
    return api.get('/movie/baseprice')
        .then(response => response.data)
        .catch(error => {
            console.error("Error get baseprice", error);
            return null;
        })
};

export const updatePrice = async (price) => {
    return api.put('/ticket/baseprice/update', price)
        .then(response => response.data)
        .catch(error => {
            console.error("Error update price", error)
            return false;
        })
}

export const getShowtime = async () => {
    return api.get('/ticket/showtime')
        .then(response => response.data)
        .catch(error => {
            console.error("Error ger showtime", error)
            return null;

        })
}

export const getShowtimeByID = async (id) => {
    return api.get(`/ticket/showtime/${id}`)
        .then(response => response.data)
        .catch((error) => {
            console.error("Error getShowtimeByID", error);
            return null;
        });
};

export const getSelectedSeatByShowtime = (id, callback) => {
    // Tạo WebSocket và STOMP client
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);

    // Kết nối WebSocket
    stompClient.connect({}, () => {
        stompClient.subscribe(`/topic/showtime/${id}/seat`, (message) => {
            const selectedSeatData = JSON.parse(message.body);
            callback(selectedSeatData); // Gọi callback với dữ liệu nhận được qua WebSocket
        });
    });
    return () => stompClient.disconnect();
};

export const getBookingById = async (id) => {
    return api.get(`/ticket/booking/${id}`)
    .then(response => response.data)
    .catch(error => {
        console.error("Error getBookingById", error);
        return null;
    })
}

export const searchBooking = async (barcode) => {
    return api.get(`/ticket/booking/search/${barcode}`)
    .then(response => response.data)
    .catch(error => {
        console.error("Error searchBooking", error);
        return null;
    })
}

export const exportBooking = async (id) => {
    return api.get(`/ticket/booking/export/${id}`)
    .then(response => response.data)
    .catch(error => {
        console.error("Error exportBooking", error);
        return null;
    })
}

export const getBookingByBarcode = async (barcode) => {
    return api.get(`/ticket/booking/payonline/${barcode}`)
    .then(response => response.data)
    .catch(error => {
        console.error("Error getBookingByBarcode", error);
        return null;
    })
}



export const addSelectedSeat = async (selectedSeat) => {
    return api.post('/ticket/showtime/selectedseat/reserve', selectedSeat)
        .then(response => response.data)
        .catch(error => {
            console.error("Error seat pending", error)
            return null;
        })
}

export const addPayCash = async (payment) => {
    return api.post('ticket/booking/paycash/add', payment)
        .then(response => response.data)
        .catch(error => {
            console.error("Error addPayCash", error)
            return null;
        })
}

export const addPayCashCustomer = async (payment) => {
    return api.post('ticket/customer/booking/paycash/add', payment)
        .then(response => response.data)
        .catch(error => {
            console.error("Error addPayCashCustomer", error)
            return null;
        })
}

export const addPayOnline = async (payment) => {
    return api.post('ticket/booking/payonline/add', payment)
        .then(response => {
            if (response.data) {
                const paymentUrl = response.data;
                window.open(paymentUrl, '_blank'); // Hoặc sử dụng window.location.href
            } else {
                alert("Không nhận được URL thanh toán. Vui lòng thử lại.");
                console.error("Error: Payment URL not found in response");
            }
            return response.data;
        })
        .catch(error => {
            alert("Đã xảy ra lỗi khi xử lý thanh toán. Vui lòng thử lại.");
            console.error("Error addPayOnlineCustomer", error);
            return null;
        });
};

export const addPayOnlineAdmin = async (payment) => {
    return api.post('ticket/admin/booking/payonline/add', payment)
        .then(response => {
            if (response.data) {
                const paymentUrl = response.data;
                window.open(paymentUrl, '_blank'); // Hoặc sử dụng window.location.href
            } else {
                alert("Không nhận được URL thanh toán. Vui lòng thử lại.");
                console.error("Error: Payment URL not found in response");
            }
            return response.data;
        })
        .catch(error => {
            alert("Đã xảy ra lỗi khi xử lý thanh toán. Vui lòng thử lại.");
            console.error("Error addPayOnlineCustomer", error);
            return null;
        });
};

export const creatPayOnline = async (barcode) => {
    return api.post(`ticket/booking/payonline/add/${barcode}`)
        .then(response => {
            if (response.data) {    
                const paymentUrl = response.data;
                window.open(paymentUrl, '_blank'); 
            } else {
                alert("Không nhận được URL thanh toán. Vui lòng thử lại.");
                console.error("Error: Payment URL not found in response");
            }
            return response.data;
        })
        .catch(error => {
            alert("Đã xảy ra lỗi khi xử lý thanh toán. Vui lòng thử lại.");
            console.error("Error addPayOnlineCustomer", error);
            return null;
        });
};




export const addDiscount = async (discountData) => {
    try {
        const formData = new FormData();
        formData.append('name', discountData.name);
        formData.append('typeDiscountid', discountData.typeDiscountid);
        formData.append('reducedValue', discountData.reducedValue);
        formData.append('discountCode', discountData.discountCode);
        formData.append('start', discountData.start);
        formData.append('end', discountData.end);
        formData.append('description', discountData.description);
        if (discountData.image) {
            formData.append('file', discountData.image);
        }

        const token = localStorage.getItem('token');
        const response = await api.post('/ticket/discount/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        });

        console.log('Upload thành công:', response.data);
        return response.data; // Trả về dữ liệu response (nếu cần sử dụng)
    } catch (error) {
        if (error.response) {
            console.error('Server trả về lỗi:', error.response.data); // Phản hồi từ server
        } else if (error.request) {
            console.error('Không nhận được phản hồi từ server:', error.request); // Không nhận được phản hồi
        } else {
            console.error('Lỗi trong khi gửi yêu cầu:', error.message); // Lỗi khác
        }
        throw error;
    }
    
};


export const updatePayOnline = async (orderId, resultCode) => {
    console.log(orderId);
    console.log(resultCode);
    return api.put(`ticket/booking/payonline/update/${orderId}/${resultCode}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error updatePayOnline", error)
            return null;
        })
}

export const updateSelectedSeat = async (id) => {
    return api.put(`/ticket/showtime/selectedseat/${id}/expired`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error seat expired", error)
            return null;
        })
}

export const updateStatusDiscount = async (id) => {
    return api.put(`/ticket/discount/${id}/updatestatus`)
    .then(response => response.data)
    .catch(error => {
        console.error("Error updateStatusDiscount: ", error);
        return null;
    })
}

export const editDiscount = async (discountData) => {
    try {
        const formData = new FormData();
        formData.append('name', discountData.name);
        formData.append('typeDiscountid', discountData.typeDiscountid);
        formData.append('reducedValue', discountData.reducedValue);
        formData.append('discountCode', discountData.discountCode);
        formData.append('start', discountData.start);
        formData.append('end', discountData.end);
        formData.append('description', discountData.description);
        formData.append('status', discountData.status);
        formData.append('id', discountData.id);
        if (discountData.image) {
            formData.append('file', discountData.image);
        }

        const token = localStorage.getItem('token');
        const response = await api.put('/ticket/discount/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        });

        console.log('Upload thành công:', response.data);
        return response.data; // Trả về dữ liệu response (nếu cần sử dụng)
    } catch (error) {
        if (error.response) {
            console.error('Server trả về lỗi:', error.response.data); // Phản hồi từ server
        } else if (error.request) {
            console.error('Không nhận được phản hồi từ server:', error.request); // Không nhận được phản hồi
        } else {
            console.error('Lỗi trong khi gửi yêu cầu:', error.message); // Lỗi khác
        }
        throw error;
    }
    
};

export const deleteDiscount = async (id) => {
    return api.delete(`/ticket/discount/${id}/delete`)
    .then(response => response.data)
    .catch(error => {
        console.error("Error deleteDiscount: ", error);
        return null;
    })
}


// export const fetchRevenueData = (filterType, { movieId, theaterId, startDate, endDate }) => {
//     let url = '';
//     let params = {};
  
//     const startDateFormatted = startDate ? moment(startDate).format('YYYY-MM-DDT00:00:00') : undefined;
//     const endDateFormatted = endDate ? moment(endDate).format('YYYY-MM-DDT23:59:59') : undefined;
  
//     if (filterType === 'movie') {
//       if (movieId) {
//         // API cho movie với movieId
//         url = '/movie/movie-revenue';
//         params = { movieId, startDate: startDateFormatted, endDate: endDateFormatted };
//       } else if (startDate && endDate) {
//         // API cho tất cả phim với ngày cụ thể
//         url = '/movie/by-movie';
//         params = {
//           startDate: startDateFormatted,
//           endDate: endDateFormatted,
//         };
//       } else {
//         // API cho tất cả phim không có ngày cụ thể
//         url = '/movie/by-movie';
//         params = {};
//       }
//     } else if (filterType === 'theater') {
//       if (theaterId) {
//         // API cho theater với theaterId
//         url = '/theater/theater-revenue';
//         params = { theaterId, startDate: startDateFormatted, endDate: endDateFormatted };
//       } else if (startDate && endDate) {
//         // API cho tất cả rạp với ngày cụ thể
//         url = '/theater/by-theater';
//         params = {
//           startDate: startDateFormatted,
//           endDate: endDateFormatted,
//         };
//       } else {
//         // API cho tất cả rạp không có ngày cụ thể
//         url = '/theater/by-theater';
//         params = {};
//       }
//     } else if (filterType === 'time') {
//       if (startDate && endDate) {
//         // API cho ticket với ngày cụ thể
//         url = '/ticket/daily-revenue';
//         params = {
//           startDate: startDateFormatted,
//           endDate: endDateFormatted,
//         };
//       } else {
//         // API cho tất cả ticket không có ngày cụ thể
//         url = '/ticket/by-month';
//         params = {};
//       }
//     } else {
//       throw new Error(`Invalid filterType: ${filterType}`);
//     }
  
//     return api.get(url, { params })
//       .then(response => response.data)
//       .catch(error => {
//         console.error(`Error fetching ${filterType} data:`, error);
//         throw error;
//       });
//   };
export const fetchRevenueData = (filterType, { movieId, theaterId, startDate, endDate }) => {
    let url = '';
    let params = {};

    const startDateFormatted = startDate ? moment(startDate).format('YYYY-MM-DDT00:00:00') : undefined;
    const endDateFormatted = endDate ? moment(endDate).format('YYYY-MM-DDT23:59:59') : undefined;

    if (filterType === 'movie') {
        if (movieId) {
            // API cho movie với movieId
            url = '/movie/movie-revenue';
            params = { movieId, startDate: startDateFormatted, endDate: endDateFormatted };
        } else if (startDate && endDate) {
            // API cho tất cả phim với ngày cụ thể
            url = '/movie/by-movie';
            params = {
                startDate: startDateFormatted,
                endDate: endDateFormatted,
            };
        } else {
            // API cho tất cả phim không có ngày cụ thể
            url = '/movie/by-movie';
            params = {};
        }
    } else if (filterType === 'theater') {
        if (theaterId) {
            // API cho theater với theaterId
            url = '/theater/theater-revenue';
            params = { theaterId, startDate: startDateFormatted, endDate: endDateFormatted };
        } else if (startDate && endDate) {
            // API cho tất cả rạp với ngày cụ thể
            url = '/theater/by-theater';
            params = {
                startDate: startDateFormatted,
                endDate: endDateFormatted,
            };
        } else {
            // API cho tất cả rạp không có ngày cụ thể
            url = '/theater/by-theater';
            params = {};
        }
    } else if (filterType === 'time') {
        if (startDate && endDate) {
            // API cho ticket với ngày cụ thể
            url = '/ticket/daily-revenue';
            params = {
                startDate: startDateFormatted,
                endDate: endDateFormatted,
            };
        } else {
            // API cho tất cả ticket không có ngày cụ thể
            url = '/ticket/by-month';
            params = {};
        }
    } else {
        throw new Error(`Invalid filterType: ${filterType}`);
    }

    return api.get(url, { params })
    .then(response => {
        const data = response.data;

        if (Array.isArray(data)) {
            const sortedData = data.sort((a, b) => b.totalRevenue - a.totalRevenue);
            return sortedData;
        } else if (data && data.details && Array.isArray(data.details)) {
            const sortedData = data.details.sort((a, b) => b.totalRevenue - a.totalRevenue);
            return sortedData;
        } else {
            console.error('Dữ liệu trả về không có mảng hoặc thuộc tính details:', data);
            return [];
        }
    })
    .catch(error => {
        console.error(`Error fetching ${filterType} data:`, error);
        throw error;
    });



};
