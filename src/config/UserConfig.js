import api from "../Api.js";

export const getAllCustomer = () => api.get("user/all-customers");
export const login = async (loginData) => {
  try {
    const response = await api.post("user/login", loginData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data; // Trả về response nếu đăng nhập thành công
  } catch (error) {
    throw error; // Để catch trong component và xử lý lỗi
  }
};
