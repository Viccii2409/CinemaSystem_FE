import api from '../Api.js';
import axios from 'axios';

export const verify = async (token) => {
  try {
      const response = await axios.get('http://localhost:8080/api/user/public/verify', {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      return response.data;
  } catch (error) {
      console.error('Token không hợp lệ:', error);
      localStorage.removeItem('token');
  }
}

export const login = async (loginData) => {
  return api.post('/user/public/login', loginData)
  .then(response => response.data)
  .catch(error => {
    console.log("Error login: ", error);
    return null;
  })
};

export const register = async (registerData) => {
  return api.post('/user/public/register', registerData)
  .then(response => response.data)
  .catch(error => {
    console.log("Error register: ", error);
    return null;
  })
};

export const verifyaccount = async (account) => {
  return api.post('/user/public/verifyaccount', account)
  .then(response => response.data)
  .catch(error => {
    console.log("Error verifyaccount: ", error);
    return null;
  })
};

export const check = async (email) => {
  return api.post('/user/public/check', { username: email })
  .then(response => response.data)
  .catch(error => {
    console.log("Error check: ", error);
    return null;
  })
};

export const forgotPassword = async (email) => {
  return api.get(`/user/public/forgotpassword/${email}`)
  .then(response => response.data)
  .catch(error => {
    console.log("Error forgotPassword: ", error);
    return null;
  })
};

export const changePasswordCustomer = async (data) => {
  return api.put('/user/public/changepassword', data)
  .then(response => response.data)
  .catch(error => {
    console.log("Error changePasswordCustomer: ", error);
    return null;
  })
};



export const getUserById = async (id) => {
  return api.get(`/user/${id}`)
  .then(response => response.data)
  .catch(error => {
      console.error("Error getUserById: ", error);
      return null;
  })
}

export const getCustomerById = async (id) => {
  return api.get(`/user/customer/${id}`)
  .then(response => response.data)
  .catch(error => {
      console.error("Error getCustomerById: ", error);
      return null;
  })
}

export const changePassword = async (formPassData) => {
  return api.put('/user/changepassword', formPassData)
  .then(response => response.data)
  .catch(error => {
    console.log("Error handleChangePassword: ", error);
    return null;
  })
};

export const updateUser = async (formData) => {
  return api.put('/user/update', formData)
  .then(response => response.data)
  .catch(error => {
    console.log("Error updateUser: ", error);
    return null;
  })
};

export const updateImage = async (formData) => {
  try {
    // const formData = new FormData();
    // formData.append("id", formImageData.id);
    // formData.append("file", formImageData.image);
    const token = localStorage.getItem('token');
    const response = await api.put("/user/image/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${token}`
      },
    });
    console.log("Upload thành công:", response.data);
    return response.data;
  } catch (error) {
    console.error("Upload thất bại:", error);
  }
};

export const getAllRole = async () => {
  return api.get('/user/role')
  .then(response => response.data)
  .catch(error => {
      console.error("Error getAllRole: ", error);
      return null;
  })
};

export const getAllPermission = async () => {
  return api.get('/user/permission')
  .then(response => response.data)
  .catch(error => {
      console.error("Error getAllPermission: ", error);
      return null;
  })
};

export const addRole = async (formData) => {
  return api.post('/user/role/add', formData)
  .then(response => response.data)
  .catch(error => {
    console.log("Error addRole: ", error);
    return null;
  })
};

export const updateRole = async (formData) => {
  return api.put('/user/role/update', formData)
  .then(response => response.data)
  .catch(error => {
    console.log("Error updateRole: ", error);
    return null;
  })
};

export const deleteRole = async (id) => {
  return api.delete(`/user/role/${id}/delete`)
  .then(response => response.data)
  .catch(error => {
    console.log("Error deleteRole: ", error);
    return null;
  })
};

export const getAllEmployee = async () => {
  return api.get('/user/employee')
  .then(response => response.data)
  .catch(error => {
      console.error("Error getAllEmployee: ", error);
      return null;
  })
};

export const checkEmployee = async (email) => {
  console.log(email);
  return api.post('/user/employee/check', { username: email })
  .then(response => response.data)
  .catch(error => {
    console.log("Error checkEmployee: ", error);
    return null;
  })
};

export const addEmployee = async (employee) => {
  return api.post('/user/employee/add', employee)
  .then(response => response.data)
  .catch(error => {
    console.log("Error addEmployee: ", error);
    return null;
  })
};

export const updateEmployee = async (employee) => {
  return api.put('/user/employee/update', employee)
  .then(response => response.data)
  .catch(error => {
    console.log("Error updateEmployee: ", error);
    return null;
  })
};

export const getEmployeeById = async (id) => {
  return api.get(`/user/employee/${id}`)
  .then(response => response.data)
  .catch(error => {
      console.error("Error getEmployeeById: ", error);
      return null;
  })
}

export const updateStatusEmployee = async (id) => {
  return api.put(`/user/employee/${id}/updatestatus`)
  .then(response => response.data)
  .catch(error => {
      console.error("Error updateStatusEmployee: ", error);
      return null;
  })
}

export const getAllCustomer = async () => {
  return api.get('/user/customer')
  .then(response => response.data)
  .catch(error => {
      console.error("Error getAllCustomer: ", error);
      return null;
  })
};

export const updateStatusUser = async (id) => {
  return api.put(`/user/${id}/updatestatus`)
  .then(response => response.data)
  .catch(error => {
      console.error("Error updateStatusUser: ", error);
      return null;
  })
}

export const addGenreFauvorite = async (data) => {
  return api.post('/user/customer/genre/add', data)
  .then(response => response.data)
  .catch(error => {
    console.log("Error addGenreFauvorite: ", error);
    return null;
  })
};

export const getRecommendMovie = async (customerID) => {
  try {
    const response = await api.get(`/user/public/recommend/${customerID}`);
    return response.data; // Trả về dữ liệu nhận được từ API
  } catch (error) {
    console.error("Error getting recommended movies", error);
    return null; // Trả về null nếu có lỗi
  }
};

export const addFeedback = async (formData) => {
  return api
    .post("/feedback/add-feedback", formData)
    .then((response) => response.data)
    .catch((error) => {
      console.log("Error addRole: ", error);
      return null;
    });
};
