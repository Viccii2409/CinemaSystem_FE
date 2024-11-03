import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json", // chỉ định loại dữ liệu trả về
    Authorization: "Bearer your_actual_token_here", // gửi token xác thực khi gọi API
  },
});

export const getTheater = () => api.get("/theater");

export const updateStatusTheater = (id) => {
  return api.put(`/theater/${id}/updatestatus`);
};

export const getTheaterById = (id) => {
  console.log(`Gọi API với ID: ${id}`);
  return api.get(`/theater/${id}`);
};

export const getMovieNow = () => api.get("/movie/showingNow");
export const getMovieSoon = () => api.get("/movie/comingSoon");
export const getDiscount = () => api.get("/movie/discount");
export const getSlideshow = () => api.get("/movie/slideshow");
export const getMovieById = async (id) => {
  console.log(`Gọi API với ID: ${id}`); // In ra ID để kiểm tra
  const response = await api.get(`/movie/${id}`); // Gọi API
  return response.data; // Trả về dữ liệu từ phản hồi
};
// Hàm để thêm rạp mới (tải lên dữ liệu rạp bao gồm hình ảnh và thông tin)
export const addTheater = async (theaterData) => {
  try {
    const formData = new FormData();
    formData.append("name", theaterData.name);
    formData.append("phone", theaterData.phone);
    formData.append("email", theaterData.email);
    formData.append("address", theaterData.address);
    formData.append("ward", theaterData.ward);
    formData.append("district", theaterData.district);
    formData.append("city", theaterData.city);
    formData.append("description", theaterData.description);

    if (theaterData.image) {
      formData.append("file", theaterData.image);
    }

    const response = await api.post("/theater/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer <token>",
      },
    });

    console.log("Upload thành công:", response.data);
    return response.data; // Trả về dữ liệu response (nếu cần sử dụng)
  } catch (error) {
    console.error("Upload thất bại:", error);
    throw error; // Ném lỗi để component sử dụng có thể bắt lỗi và xử lý
  }
};

export const editTheater = async (theaterData) => {
  try {
    const formData = new FormData();
    formData.append("name", theaterData.name);
    formData.append("phone", theaterData.phone);
    formData.append("email", theaterData.email);
    formData.append("address", theaterData.address);
    formData.append("ward", theaterData.ward);
    formData.append("district", theaterData.district);
    formData.append("city", theaterData.city);
    formData.append("description", theaterData.description);
    formData.append("id", theaterData.id);

    if (theaterData.image) {
      formData.append("file", theaterData.image);
    }

    const response = await api.post("/theater/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer <token>",
      },
    });

    console.log("Upload thành công:", response.data);
    return response.data; // Trả về dữ liệu response (nếu cần sử dụng)
  } catch (error) {
    console.error("Upload thất bại:", error);
    throw error; // Ném lỗi để component sử dụng có thể bắt lỗi và xử lý
  }
};
