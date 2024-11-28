import api from '../Api.js';

export const getAllCustomer = () => api.get("user/all-customers");

export const getCustomerById = async (id) => {
    return api.get(`/user/${id}`)
    .then(response => response.data)
    .catch(error => {
        console.error("Error getCustomerById: ", error);
        return null;
    })
}

export const getCustomerInforById = async (id) => {
    return api.get(`/user/inforaccount/${id}`)
    .then(response => response.data)
    .catch(error => {
        console.error("Error getCustomerInforById: ", error);
        return null;
    })
}