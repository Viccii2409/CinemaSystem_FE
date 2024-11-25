import api from '../Api.js';
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export const getTimeFrame = async () => {
    return api.get('/ticket/timeframe')
        .then(response => response.data)
        .catch(error => {
            console.error("Error get timeframe", error);
            return null;
        })
};

export const getDayOfWeek = async () => {
    return api.get('/ticket/dayofweek')
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
    return api.get('/ticket/discount')
    .then(response => response.data)
    .catch(error => {
        console.error("Error getAllDiscount", error);
        return null;
    })
}

export const getBasePrice = async () => {
    return api.get('/ticket/baseprice')
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
            console.error("Error addBooking", error)
            return null;
        })
}

export const addPayCashCustomer = async (payment) => {
    return api.post('ticket/customer/booking/paycash/add', payment)
        .then(response => response.data)
        .catch(error => {
            console.error("Error addBooking", error)
            return null;
        })
}

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

        const response = await api.post('/ticket/discount/add', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer <token>'
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

        const response = await api.put('/ticket/discount/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer <token>'
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


