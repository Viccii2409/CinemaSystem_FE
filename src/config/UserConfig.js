import api from "../Api.js";

export const getAllCustomer = () => api.get("user/all-customers");
