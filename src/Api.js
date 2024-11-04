import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json', // chỉ định loại dữ liệu trả về
        'Authorization': 'Bearer your_actual_token_here'  // gửi token xác thực khi gọi API
    }
});

export default api;