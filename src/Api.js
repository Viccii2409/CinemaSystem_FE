import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm Interceptor để tự động thêm token vào headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // console.log(token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//     (response) => {
//         return response; // Trả về phản hồi nếu không có lỗi
//     },
//     (error) => {
//         console.error(error);
//         if (error.response && error.response.status === 403) {
//             localStorage.removeItem("token");
//             window.location.href = "/403";
//         }
//         return Promise.reject(error);
//     }
// );

export default api;
