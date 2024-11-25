import api from '../Api.js';

export const getCustomerById = async (id) => {
    return api.get(`/user/${id}`)
    .then(response => response.data)
    .catch(error => {
        console.error("Error getCustomerById: ", error);
        return null;
    })
}