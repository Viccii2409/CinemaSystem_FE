import api from "../Api.js";

export const getMovieNow = () => api.get("/movie/showingNow");
export const getMovieSoon = () => api.get("/movie/comingSoon");
export const getDiscount = () => api.get("/movie/discount");
export const getSlideshow = () => api.get("/movie/slideshow");

export const getMovieById = (id) => {
  return api.get(`/movie/${id}`)
  .then(response => response.data)
  .catch(error => {
    console.error("Error get movie by id", error);
    return null;
  })
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
  try {
    return api.get("/movie/genre");
  } catch (error) {
    console.error("Error get genre", error);
  }
};

// export const addGenre = async (genre) => {
//   try {
//     const response = await api.post('/movie/genre/add', genre);
//     return response;
//   } catch (error) {
//     console.error("Error adding genre", error);
//     throw error; // Ném lỗi ra ngoài để có thể xử lý thêm nếu cần
//   }
// };
