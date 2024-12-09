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

export const getCustomerById = async (id) => {
  return api
    .get(`/user/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getCustomerById: ", error);
      return null;
    });
};

export const getCustomerInforById = async (id) => {
  return api
    .get(`/user/inforaccount/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getCustomerInforById: ", error);
      return null;
    });
};

export const getRecommendMovie = async (customerID) => {
  return api.get(`/user/recommend/${customerID}`);
};
export const addFeedback = async () => {};
