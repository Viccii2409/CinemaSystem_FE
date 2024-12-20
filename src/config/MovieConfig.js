import api from "../Api.js";

export const getMovieNow = () => api.get("/movie/public/showingNow");
export const getMovieSoon = () => api.get("/movie/public/comingSoon");
export const getSlideshow = () => api.get("/movie/public/slideshow");

export const getMovieById = (id) => {
  return api
    .get(`/movie/public/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error get movie by id", error);
      return null;
    });
};

export const getMovieDetails = (id) => {
  return api.get(`/movie/moviedetails/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error("Error get movie by id", error);
      return null;
    })
};

export const getAllGenres = () => {
  return api
    .get(`/movie/public/genre`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getAllGenres", error);
      return null;
    });
};

export const getAllGenre = () => {
  return api
    .get(`/movie/genre`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getAllGenres", error);
      return null;
    });
};

export const searchGenres = (name) => {
  return api
    .get(`/movie/genre/search?name=${name}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getAllGenres", error);
      return null;
    });
};

export const addGenre = (genre) => {
  return api
    .post("/movie/genre/add", genre)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error addGenre", error);
      return null;
    });
};

export const updateGenre = (id, genreDetails) => {
  return api
    .put(`/movie/genre/${id}`, genreDetails)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updateGenre", error);
      return null;
    });
};

export const hideGenre = (id) => {
  return api
    .put(`/movie/genre/${id}/hide`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error hideGenre", error);
      return null;
    });
};

export const deleteGenre = (id) => {
  return api
    .delete(`/movie/genre/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleteGenre", error);
      return null;
    });
};

export const getAllMovies = () => {
  return api
    .get("/movie/all")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getAllMovies", error);
      return null;
    });
};

export const getAllMovie = () => {
  return api
    .get("/movie/allMovie")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getAllMovies", error);
      return null;
    });
};


export const searchMovies = (title) => {
  return api
    .get("/movie/search", { params: { title } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error searchMovies", error);
      return null;
    });
};

export const searchMoviesByGenre = (genreName) => {
  return api
    .get("/movie/searchByGenre", { params: { genreName } })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error searchMoviesByGenre", error);
      return null;
    });
};

export const addMovie = async (movie) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post("/movie/add", movie, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editMovie = async (movie) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.post("/movie/update", movie, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateStatusMovie = (id) => {
  return api
    .put(`/movie/update-status/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updateStatusMovie", error);
      return null;
    });
};

export const deleteMovie = (id) => {
  return api
    .delete(`/movie/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleteMovie", error);
      return null;
    });
};
export const getFeedback = (movieId) => {
  return api
    .get(`/movie/public/feedback/${movieId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error getAllFeedback", error);
      return null;
    });
};

export const getAllGenreCustomer = () => {
  return api.get('/movie/public/genre')
    .then(response => response.data)
    .catch(error => {
      console.error("Error getAllGenreCustomer", error);
      return null;
    })
};



export const getAllLanguage = () => {
  return api.get('/movie/getAllLanguage')
    .then(response => response.data)
    .catch(error => {
      console.error("Error getAllLanguage", error);
      return null;
    })
};


// Lấy danh sách tất cả các rạp và lọc các rạp có status = 1 (hoạt động)
export const fetchActiveTheaters = () => {
  return api.get('http://localhost:8080/api/theater/all')  
      .then(response => {
          // Lọc các rạp có status = 1 
          const activeTheaters = response.data.filter(theater => theater.status === true);
          return activeTheaters;  
      })
      .catch(error => {
          console.error("Lỗi khi tải danh sách rạp:", error);
          throw error;  
      })
};


// Lấy lịch chiếu từ backend
export const fetchShowtimes = (date, theaterId) => {
if (!date || !theaterId) {
console.error("Ngày và rạp cần được chọn.");
throw new Error("Ngày và rạp cần được chọn.");
}

// Đảm bảo định dạng ngày hợp lệ (yyyy-MM-dd)
const formattedDate = new Date(date).toISOString().split('T')[0];  
return api.get(`/movie/showtimes?date=${formattedDate}&theaterId=${theaterId}`)
.then(response => {
  if (response.data) {
    return response.data; 
  } else {
    throw new Error("Không có dữ liệu lịch chiếu.");
  }
})
.catch(error => {
  console.error("Lỗi khi tải lịch chiếu:", error);
  throw error;  
});
}


// Cập nhật trạng thái của lịch chiếu
export const toggleShowtimeStatus = (showtimeId) => {
  const token = localStorage.getItem("token"); 

  return api.put(
    `/movie/${showtimeId}/toggle-status`, 
    {}, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  .then(response => response.data)
  .catch(error => {
    console.error("Lỗi khi thay đổi trạng thái lịch chiếu:", error);
    throw error; 
  });
};


// Lấy token từ localStorage
const token = localStorage.getItem("token");

// Thêm lịch chiếu mới
export const addShowtime = (showtimeData) => {
  return api.post(
    `/movie/schedule`,
    showtimeData,
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }
  )
    .then(response => response.data)
    .catch(error => {
      console.error("Lỗi khi thêm lịch chiếu:", error);
      throw error;
    });
};

// Cập nhật trạng thái tự động cho lịch chiếu
export const updateShowtimeStatus = () => {
  return api.put(
    `/movie/status/update`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token trực tiếp
      },
    }
  )
    .then(response => response.data)
    .catch(error => {
      console.error("Lỗi khi cập nhật trạng thái lịch chiếu:", error);
      throw error;
    });
};

// Cập nhật thông tin lịch chiếu
export const updateShowtime = (showtimeId, showtimeData) => {
  return api.put(
    `/movie/showtime/update/${showtimeId}`,
    showtimeData,
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }
  )
    .then(response => response.data)
    .catch(error => {
      console.error("Lỗi khi cập nhật lịch chiếu:", error);
      throw error;
    });
};

// Hàm lấy thông tin chi tiết lịch chiếu theo ID
export const fetchShowtimeById = (showtimeId) => {
  if (!showtimeId) {
    console.error("ID lịch chiếu không hợp lệ");
    throw new Error("ID lịch chiếu không hợp lệ");
  }

  return api.get(
    `/movie/showtime/${showtimeId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }
  )
    .then(response => {
      console.log("Dữ liệu trả về từ API:", response); 
      if (response.data) {
        return response.data;  
      } else {
        throw new Error("Không tìm thấy lịch chiếu với ID: " + showtimeId);
      }
    })
    .catch(error => {
      console.error("Lỗi khi tải thông tin lịch chiếu:", error);
      console.error(error.response ? error.response.data : error.message);
      throw new Error(error.response ? error.response.data.message : "Lỗi không xác định");
    });
};

// Xóa lịch chiếu theo ID
export const deleteShowtime = (showtimeId) => {
  return api.delete(
    `/movie/showtime/${showtimeId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }
  )
    .then(response => response.data)
    .catch(error => {
      console.error("Lỗi khi xóa lịch chiếu:", error);
      throw error;
    });
};


