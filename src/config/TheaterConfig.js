import api from "../Api.js";

export const deleteRoom = (id, roomid) => {
  try {
    return api.delete(`/theater/${id}/room/${roomid}/delete`);
  } catch (error) {
    console.error("Error delete room", error);
  }
};

export const deleteTheater = (id) => {
  try {
    return api.delete(`/theater/${id}/delete`);
  } catch (error) {
    console.error("Error delete theater", error);
  }
};

export const getTheater = () => api.get("/theater");

export const getTheaterById = (id) => {
  try {
    return api.get(`/theater/${id}`);
  } catch (error) {
    console.error("Error get theater by id", error);
  }
};
export const getTheaterExcept = (id) => {
  try {
    return api.get("/theater/except/${id}");
  } catch (error) {
    console.error("Error get theater by id", error);
  }
};
// export const getTheaterRoomDto = async () => {
//     try {
//         const response = await api.get('/theater/room');
//         return response.data;
//     } catch (error) {
//         console.error("Error get theaterroomdto", error);
//         return null;  // Có thể trả về null hoặc xử lý khác nếu cần
//     }
// };

// Không cần async/await trong getTheaterById vì hàm chỉ trả về một Promise từ api.get().
// Xử lý Promise: Khi gọi getTheaterById, bạn có thể xử lý kết quả với .then() và .catch(),
// hoặc sử dụng await trong một hàm async.

// Nếu bạn muốn sử dụng await, hãy chắc chắn rằng hàm của bạn là async

export const getTheaterRoomDto = () => {
  return api
    .get("/theater/room")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error get theaterroomdto", error);
      return null; // Có thể trả về null hoặc xử lý khác nếu cần
    });
};

export const getRoomByTheater = async (id) => api.get(`/theater/${id}/room`);

export const getTypeSeat = async () => api.get("/theater/typeseat");

export const getRoomById = async (id) => {
  return api
    .get(`theater/room/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error get room by id: ", error);
      return null;
    });
};

export const getTypeRoom = async () => {
  return api
    .get("/theater/typeroom")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error get typeroom: ", error);
      return null;
    });
};

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

export const addRoom = async (room, id) => {
  // console.log(room);
  console.log(id);
  console.log(JSON.stringify(room, null, 2));
  try {
    const response = await api.post(`/theater/${id}/room/add`, room);
    return response.data;
  } catch (error) {
    console.error("Failed to add room:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm này
  }
};

export const addSeat = async (seats, id) => {
  try {
    console.log(JSON.stringify(seats, null, 2));
    const response = await api.post(`/theater/room/${id}/seat/add`, seats);
    return response.data;
  } catch (error) {
    console.error("Error add list seat: ", error);
  }
};

export const updateStatusTheater = (id) => {
  return api.put(`/theater/${id}/updatestatus`);
};

export const updateStatusRoom = (id) => {
  return api.put(`/theater/room/${id}/updatestatus`);
};

export const editRoom = (room) => {
  try {
    api.put("/theater/room/update", room); // Truyền `room` vào body của yêu cầu PUT
    return true; // Trả về `data` từ phản hồi của API
  } catch (error) {
    console.error("Edit room failed:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm nếu cần
  }
};

export const updateSeat = (id, seats) => {
  try {
    api.put(`/theater/room/${id}/seat/update`, seats);
    return true;
  } catch (error) {
    console.error("Update seats failed: ", error);
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

    const response = await api.put("/theater/update", formData, {
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
